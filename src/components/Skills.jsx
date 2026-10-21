import { SKILLS } from '../data/content'
export default function Skills({ skill, setSkill }) {
  return (
    <section id="skills" className="skills">
      <h2>Beş araç, tek teknoloji yığını</h2>
      <ul className="skill-list">
        {SKILLS.map((s, i) => (
          <li key={s.name}>
            <button className={skill === i ? 'sk on' : 'sk'} onMouseEnter={() => setSkill(i)} onMouseLeave={() => setSkill(null)} onFocus={() => setSkill(i)} onBlur={() => setSkill(null)}>
              <span className="sn">{s.name}</span>
              <span className="st">{s.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}