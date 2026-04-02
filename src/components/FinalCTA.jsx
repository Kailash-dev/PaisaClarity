import { useState } from 'react'
import styles from './FinalCTA.module.css'

export default function FinalCTA({ t, wlCount, onJoin }) {
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
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.title}>
            {t.finalTitle[0]}<br />
            <span className={styles.accent}>{t.finalAccent}</span>
          </h2>
          <p className={styles.sub}>{t.finalSub.replace('1,247', wlCount.toLocaleString('en-IN'))}</p>
          <div className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              placeholder={t.heroInput}
              className={styles.input}
            />
            <button onClick={handleJoin} className={styles.btn}>{t.finalBtn}</button>
          </div>
          {success && <p className={styles.success}>{t.successMsg}</p>}
          <p className={styles.meta}>{t.finalMeta}</p>
        </div>
      </section>
      <footer className={styles.footer}>
        © 2025 Paisa Clarity · Built with ❤️ in India ·{' '}
        <a href="mailto:hello@paisaclarity.in">hello@paisaclarity.in</a>
      </footer>
    </>
  )
}
