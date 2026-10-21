import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)

export const SECTIONS = [['hero', 'Varış'], ['about', 'Köken'], ['skills', 'Yetenekler'], ['projects', 'Projeler'], ['timeline', 'Yol'], ['contact', 'İletişim']]

// story: float 0..5 = camera position along the flight path, driven by scroll.
export function useStory() {
  const story = useRef(0), lenis = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      lenis.current = new Lenis({ lerp: 0.09 })
      lenis.current.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(t => lenis.current.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
    }
    const p = SECTIONS.map(() => 0)
    const triggers = SECTIONS.map(([id], i) => ScrollTrigger.create({
      trigger: '#' + id, start: 'top bottom', end: 'bottom top',
      onUpdate: s => {
        p[i] = s.progress
        story.current = Math.min(Math.max(p.reduce((a, b) => a + b, 0) - 0.5, 0), 5)
        setActive(Math.round(story.current))
      },
    }))
    ScrollTrigger.refresh()
    return () => { triggers.forEach(t => t.kill()); lenis.current?.destroy() }
  }, [])
  const goTo = id => lenis.current ? lenis.current.scrollTo('#' + id) : document.getElementById(id)?.scrollIntoView()
  return { story, active, goTo, lenis }
}