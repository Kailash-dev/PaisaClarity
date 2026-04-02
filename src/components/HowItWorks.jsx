import styles from './HowItWorks.module.css'

const STEPS = [
  {
    num: '01',
    titleEn: 'Connect your accounts',
    descEn: "Securely link your bank via RBI's Account Aggregator framework. We never store your passwords — ever.",
  },
  {
    num: '02',
    titleEn: 'We do the magic',
    descEn: 'Our engine reads every UPI transaction, names the merchant, categorises it, and finds spending patterns automatically.',
  },
  {
    num: '03',
    titleEn: 'Get your weekly clarity',
    descEn: "'You spent ₹8,000 on food this month — 40% more than last month.' Plain language. Every week. No jargon.",
  },
]

export default function HowItWorks({ t }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>{t.howLabel}</p>
        <h2 className={styles.title}>{t.howTitle}</h2>
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.num}>{step.num}</div>
              <div className={styles.connector} />
              <h3>{step.titleEn}</h3>
              <p>{step.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
