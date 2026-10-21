import { PROFILE } from '../data/content'
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Bağlanması gereken bir sisteminiz mi var?</h2>
      <div className="links">
        {PROFILE.email && <a className="btn" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>}
        {PROFILE.github && <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>}
      </div>
    </section>
  )
}