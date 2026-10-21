import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { PROJECTS } from '../data/content'

function Holo({ p, i, open }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-11, 11]), { stiffness: 200, damping: 20 })
  const move = e => { const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left) / b.width - 0.5); y.set((e.clientY - b.top) / b.height - 0.5) }
  return (
    <motion.button className={`holo h${i}`} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} onClick={() => open(p)}
      initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: 0.9, delay: i * 0.08 }}>
      <span className="hk">{p.kind}</span>
      <span className="hn">{p.name}</span>
      <span className="ht">{p.text}</span>
      <span className="hgo">Önizlemeyi aç</span>
    </motion.button>
  )
}

export default function Projects({ open }) {
  return (
    <section id="projects" className="projects">
      <h2>Projeler</h2>
      <div className="holo-field">{PROJECTS.map((p, i) => <Holo key={p.name} p={p} i={i} open={open} />)}</div>
    </section>
  )
}