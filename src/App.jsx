import { useEffect, useState } from 'react'
import { useStory } from './hooks/useStory'
import Experience from './three/Experience'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import ProjectModal from './components/ProjectModal'

export default function App() {
  const { story, active, goTo, lenis } = useStory()
  const [skill, setSkill] = useState(null), [proj, setProj] = useState(null), [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const f = () => setNarrow(innerWidth < 820); f()
    addEventListener('resize', f); return () => removeEventListener('resize', f)
  }, [])
  useEffect(() => { proj ? lenis.current?.stop() : lenis.current?.start() }, [proj, lenis])
  return (
    <>
      <Experience story={story} narrow={narrow} skill={skill} setSkill={setSkill} />
      <div className="veil" aria-hidden="true" />
      <Nav active={active} goTo={goTo} />
      <main>
        <Hero goTo={goTo} /><About /><Skills skill={skill} setSkill={setSkill} />
        <Projects open={setProj} /><Timeline /><Contact />
      </main>
      <ProjectModal p={proj} close={() => setProj(null)} />
    </>
  )
}