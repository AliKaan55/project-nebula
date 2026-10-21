import { motion } from 'framer-motion'
import { SECTIONS } from '../hooks/useStory'

export default function Nav({ active, goTo }) {
  return (
    <nav className="rail" aria-label="Bölümler">
      {SECTIONS.map(([id, label], i) => (
        <button key={id} onClick={() => goTo(id)} aria-current={i === active ? 'true' : undefined} className={i === active ? 'on' : ''}>
          {i === active && <motion.span layoutId="pip" className="pip" />}
          <span className="lbl">{label}</span>
        </button>
      ))}
    </nav>
  )
}