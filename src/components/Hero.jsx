import { useState, useRef } from 'react'
import styles from './Hero.module.css'

const AVATARS = [
  { letter: 'K', color: '#FF6B35' },
  { letter: 'R', color: '#00C37B' },
  { letter: 'A', color: '#6366F1' },
  { letter: 'P', color: '#F59E0B' },
]

export default function Hero({ t, wlCount, onJoin, emailRef, isSubmitting }) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const handleJoin = () => {
    if (!email || !email.includes('@')) return
    onJoin(email)
    setEmail('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.dot} />
        {t.heroBadge}
      </div>

      <h1 className={styles.h1}>
        {t.heroTitle[0]}<br />
        {t.heroTitle[1]}{t.heroAccent && <> <span className={styles.accent}>{t.heroAccent}</span></>}
      </h1>

      <p className={styles.sub}>{t.heroSub}</p>

      <div className={styles.form}>
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          placeholder={t.heroInput}
          className={styles.input}
        />
        <button onClick={handleJoin} className={styles.btn} disabled={isSubmitting}>{isSubmitting ? 'Joining...' : t.heroBtn}</button>
      </div>

      {success && <p className={styles.success}>{t.successMsg}</p>}

      <div className={styles.social}>
        <div className={styles.avatars}>
          {AVATARS.map(a => (
            <div key={a.letter} className={styles.avatar} style={{ background: a.color }}>{a.letter}</div>
          ))}
        </div>
        <span><strong>{wlCount.toLocaleString('en-IN')}</strong> {t.waitlistPeople}</span>
      </div>
    </section>
  )
}
