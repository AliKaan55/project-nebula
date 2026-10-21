import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ProjectModal({ p, close }) {
  const btn = useRef()
  useEffect(() => {
    if (!p) return
    btn.current?.focus()
    const k = e => e.key === 'Escape' && close()
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [p, close])
  return (
    <AnimatePresence>
      {p && (
        <motion.div className="scrim" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="glass modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={e => e.stopPropagation()}
            initial={{ scale: 0.92, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
            <button ref={btn} className="x" onClick={close} aria-label="Önizlemeyi kapat">Kapat</button>
            <p className="hk">{p.kind}</p>
            <h3>{p.name}</h3>
            <p>{p.text}</p>
            {p.live ? <iframe className="live" src={p.live} title={`${p.name} canlı önizleme`} loading="lazy" /> : (
              <ol className="flow">{p.flow.map(s => <li key={s}>{s}</li>)}</ol>
            )}
            <div className="acts">
              {p.live && <a className="btn" href={p.live} target="_blank" rel="noreferrer">Canlı siteyi aç</a>}
              {p.github && <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">GitHub’da görüntüle</a>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}