import { useState } from 'react'
import styles from './Calculator.module.css'

export default function Calculator({ t }) {
  const [income, setIncome] = useState(50000)
  const [apps, setApps] = useState(3)
  const [checks, setChecks] = useState(4)

  const leakPct = Math.min(0.08 + (apps - 1) * 0.04 + (checks - 1) * 0.012, 0.35)
  const leak = Math.round((income * leakPct) / 500) * 500
  const yearly = leak * 12

  const pct = (val, min, max) => ((val - min) / (max - min)) * 100

  const sliderStyle = (val, min, max) => ({
    background: `linear-gradient(to right, var(--green) 0%, var(--green) ${pct(val, min, max)}%, var(--border) ${pct(val, min, max)}%, var(--border) 100%)`
  })

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>{t.calcLabel}</p>
        <h2 className={styles.title}>{t.calcTitle}</h2>
        <div className={styles.box}>
          <div className={styles.sliderWrap}>
            <label>
              <span>{t.calcIncome}</span>
              <strong>₹{income.toLocaleString('en-IN')}</strong>
            </label>
            <input type="range" min="10000" max="200000" step="5000" value={income}
              onChange={e => setIncome(+e.target.value)} style={sliderStyle(income, 10000, 200000)} />
          </div>
          <div className={styles.sliderWrap}>
            <label>
              <span>{t.calcApps}</span>
              <strong>{apps} app{apps > 1 ? 's' : ''}</strong>
            </label>
            <input type="range" min="1" max="6" step="1" value={apps}
              onChange={e => setApps(+e.target.value)} style={sliderStyle(apps, 1, 6)} />
          </div>
          <div className={styles.sliderWrap}>
            <label>
              <span>{t.calcChecks}</span>
              <strong>{checks} time{checks > 1 ? 's' : ''}</strong>
            </label>
            <input type="range" min="1" max="15" step="1" value={checks}
              onChange={e => setChecks(+e.target.value)} style={sliderStyle(checks, 1, 15)} />
          </div>
          <div className={styles.result}>
            <div className={styles.resultNum}>₹{leak.toLocaleString('en-IN')}</div>
            <div className={styles.resultLabel}>{t.calcResultLabel}</div>
          </div>
          <div className={styles.warning}>
            ⚠️ That's ₹{yearly.toLocaleString('en-IN')}/year disappearing with no explanation.
          </div>
        </div>
      </div>
    </section>
  )
}
