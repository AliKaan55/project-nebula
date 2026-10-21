import { motion } from 'framer-motion'
const line = { hidden: { clipPath: 'inset(0 0 100% 0)', y: 40 }, show: { clipPath: 'inset(0 0 0% 0)', y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero({ goTo }) {
  return (
    <section id="hero" className="hero">
      <motion.h1 initial="hidden" animate="show" transition={{ staggerChildren: 0.18 }}>
        <motion.span variants={line}>Project</motion.span><motion.span variants={line}>Nebula</motion.span>
      </motion.h1>
      <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
        SAP ile konuşan .NET sistemleri ve bakmaya değer arayüzler. İmleci gezegenin üzerinde gezdir, sonra uçuşu başlatmak için kaydır.
      </motion.p>
      <button className="btn" onClick={() => goTo('projects')}>Projeleri gör</button>
    </section>
  )
}