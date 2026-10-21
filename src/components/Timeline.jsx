import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STAGES } from '../data/content'
gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const wrap = useRef(), track = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const dist = () => track.current.scrollWidth - innerWidth
      gsap.to(track.current, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: wrap.current, pin: true, scrub: 0.6, end: () => '+=' + dist(), invalidateOnRefresh: true } })
    }, wrap)
    return () => ctx.revert()
  }, [])
  return (
    <section id="timeline" className="timeline">
      <div ref={wrap} className="tl-pin">
        <h2>Şimdiye kadarki yol</h2>
        <ol ref={track} className="track">
          {STAGES.map((s, i) => (
            <li key={s.name}><span className="tn">{i + 1}</span><h3>{s.name}</h3><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  )
}