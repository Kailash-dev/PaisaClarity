import { useState } from 'react'
import styles from './Quiz.module.css'

const QUESTIONS = [
  { q: "It's the 25th. Salary's 5 days away. What do you do?", opts: [{ t: "Check all my apps to see what's left", p: 'checker' }, { t: 'Already know exactly what I have', p: 'planner' }, { t: 'Order food and figure it out later', p: 'yolo' }, { t: 'Panic and call family', p: 'avoider' }] },
  { q: "A friend asks 'how much do you spend on food monthly?' You say...", opts: [{ t: "'Around ₹4k I think?' (vague guess)", p: 'avoider' }, { t: "'Let me check my 3 apps' (30 min later)", p: 'checker' }, { t: "'Exactly ₹3,840 last month'", p: 'planner' }, { t: "'Too much lol'", p: 'yolo' }] },
  { q: 'End of the month. You have ₹2,000 left. Your reaction?', opts: [{ t: 'Panic. Where did it go?!', p: 'avoider' }, { t: 'Expected this. Had a plan.', p: 'planner' }, { t: 'Open 4 apps to investigate', p: 'checker' }, { t: 'YOLO, credit card time!', p: 'yolo' }] },
  { q: "What's your current 'system' for tracking spending?", opts: [{ t: 'A spreadsheet I update religiously', p: 'planner' }, { t: 'Checking bank SMS every day', p: 'checker' }, { t: 'Vibes-based estimation', p: 'yolo' }, { t: 'I close my eyes and hope', p: 'avoider' }] },
]

const RESULTS = {
  planner: { emoji: '📊', title: 'The Spreadsheet Samurai', desc: "You're disciplined but spending too much time on manual tracking. Paisa Clarity will save you hours and surface insights you'd never find yourself." },
  checker: { emoji: '🔍', title: 'The App Hopper', desc: 'You care about your money but spend 20+ minutes a week checking 4 different apps. One clear view will change your life.' },
  yolo: { emoji: '🎲', title: 'The Optimistic Spender', desc: 'You live in the moment — but your future self is sweating. Paisa Clarity will be your financial reality check without the guilt trip.' },
  avoider: { emoji: '🙈', title: 'The Financial Avoider', desc: "You know things could be better but fear what the numbers might say. We built Paisa Clarity for you — gentle, clear, no judgment." },
}

export default function Quiz({ t, onJoinClick }) {
  const [idx, setIdx] = useState(0)
  const [scores, setScores] = useState({ planner: 0, checker: 0, yolo: 0, avoider: 0 })
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)
  const [result, setResult] = useState(null)

  const next = () => {
    const newScores = selected ? { ...scores, [selected]: scores[selected] + 1 } : scores
    setScores(newScores)
    setSelected(null)
    if (idx + 1 >= QUESTIONS.length) {
      const top = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
      setResult(RESULTS[top])
      setDone(true)
    } else {
      setIdx(idx + 1)
    }
  }

  const restart = () => {
    setIdx(0); setScores({ planner: 0, checker: 0, yolo: 0, avoider: 0 })
    setSelected(null); setDone(false); setResult(null)
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>{t.quizLabel}</p>
        <h2 className={styles.title}>{t.quizTitle}</h2>
        <div className={styles.box}>
          {!done ? (
            <>
              <div className={styles.progress}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`${styles.dot} ${i === idx ? styles.active : i < idx ? styles.done : ''}`} />
                ))}
              </div>
              <p className={styles.question}>{QUESTIONS[idx].q}</p>
              <div className={styles.options}>
                {QUESTIONS[idx].opts.map((opt, i) => (
                  <button key={i}
                    className={`${styles.opt} ${selected === opt.p ? styles.selected : ''}`}
                    onClick={() => setSelected(opt.p)}>
                    {opt.t}
                  </button>
                ))}
              </div>
              {selected && (
                <button className={styles.nextBtn} onClick={next}>{t.quizNext}</button>
              )}
              <span className={styles.skip} onClick={next}>{t.quizSkip}</span>
            </>
          ) : (
            <div className={styles.result}>
              <div className={styles.resultEmoji}>{result.emoji}</div>
              <h3 className={styles.resultTitle}>{result.title}</h3>
              <p className={styles.resultDesc}>{result.desc}</p>
              <button className={styles.nextBtn} onClick={onJoinClick}>{t.quizJoin}</button>
              <span className={styles.skip} onClick={restart}>{t.quizRestart}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
