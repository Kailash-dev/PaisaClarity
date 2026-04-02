import { useState, useRef } from 'react'
import { useTheme } from './hooks/useTheme'
import { useLang } from './hooks/useLang'
import { useToast } from './components/Toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Problem from './components/Problem'
import Calculator from './components/Calculator'
import Quiz from './components/Quiz'
import HowItWorks from './components/HowItWorks'
import Share from './components/Share'
import FinalCTA from './components/FinalCTA'
import Toast from './components/Toast'

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useLang()
  const { toast, showToast } = useToast()
  const [wlCount, setWlCount] = useState(1247)
  const emailRef = useRef(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleJoin = async (email) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setWlCount(c => c + 1)
        showToast(data.existing ? '👋 You are already on the list!' : '🎉 You are on the waitlist!')
      } else {
        showToast('Something went wrong. Please try again.')
      }
    } catch (err) {
      showToast('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToEmail = () => {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => emailRef.current?.focus(), 600)
  }

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        t={t}
        onJoinClick={scrollToEmail}
      />
      <Hero
        t={t}
        wlCount={wlCount}
        onJoin={handleJoin}
        emailRef={emailRef}
        isSubmitting={isSubmitting}
      />
      <Ticker />
      <Problem t={t} />
      <Calculator t={t} />
      <Quiz t={t} onJoinClick={scrollToEmail} />
      <HowItWorks t={t} />
      <Share t={t} showToast={showToast} />
      <FinalCTA t={t} wlCount={wlCount} onJoin={handleJoin} isSubmitting={isSubmitting} />
      <Toast msg={toast.msg} show={toast.show} />
    </>
  )
}
