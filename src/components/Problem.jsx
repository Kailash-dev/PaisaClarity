import styles from './Problem.module.css'

const CARDS = [
  { icon: '📱', titleKey: '4 apps, 0 clarity', descKey: 'GPay, PhonePe, Paytm, CRED — none of them talk to each other.', highlight: false },
  { icon: '🤷', titleKey: "'UPI Debit ₹840'... who?", descKey: 'Random transaction IDs. Zero merchant context. Was it Zomato? Blinkit? Who knows.', highlight: false },
  { icon: '😰', titleKey: 'Salary in, mystery out', descKey: '₹45,000 on the 1st. ₹11,000 on the 20th. ₹34,000 just... gone.', highlight: true },
  { icon: '🌍', titleKey: 'Solved everywhere else', descKey: 'US has Mint. UK has Monzo. India does more UPI than all of Europe. We deserve clarity too.', highlight: false },
]

export default function Problem({ t }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>{t.problemLabel}</p>
        <h2 className={styles.title}>
          {t.problemTitle.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
        </h2>
        <p className={styles.sub}>{t.problemSub}</p>
        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <div key={i} className={`${styles.card} ${card.highlight ? styles.dark : ''}`}>
              <div className={styles.icon}>{card.icon}</div>
              <h3>{card.titleKey}</h3>
              <p>{card.descKey}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
