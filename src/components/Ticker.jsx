import styles from './Ticker.module.css'

const ITEMS = [
  { text: 'UPI transactions in India', highlight: '₹20.64 Lakh Crore/month' },
  { text: 'Active UPI users', highlight: '300M+' },
  { text: 'Avg. Indian uses', highlight: '3.2 payment apps simultaneously' },
  { text: 'Unified spending view', highlight: 'Zero — until now' },
  { text: 'RBI Account Aggregator', highlight: 'Your data, your control' },
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.bullet}>✦</span>
            {item.text} <span className={styles.highlight}>{item.highlight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
