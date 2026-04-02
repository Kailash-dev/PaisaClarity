import { useState, useCallback } from 'react'
import styles from './Toast.module.css'

export function useToast() {
  const [toast, setToast] = useState({ msg: '', show: false })

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
  }, [])

  return { toast, showToast }
}

export default function Toast({ msg, show }) {
  return (
    <div className={`${styles.toast} ${show ? styles.show : ''}`}>
      {msg}
    </div>
  )
}
