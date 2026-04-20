import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/**
 * Landing page — stub placeholder while full page is being built in Phase 3.
 * Redirects logged-in users to the report generator.
 */
const Landing = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleCTA = () => {
    if (user) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      fontFamily: 'var(--font-headline)',
      textAlign: 'center',
      padding: '48px 24px',
    }}>
      <div className="chip chip-primary">✨ InterviewIQ</div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--on-surface)', maxWidth: '600px' }}>
        Ace Your Next Interview with AI
      </h1>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.125rem', maxWidth: '480px', lineHeight: '1.6' }}>
        Upload your resume, paste the job description, and get a precision match score with a 7-day prep plan.
      </p>
      <button id="landing-cta" className="btn btn-primary btn-lg" onClick={handleCTA}>
        Get Your Report →
      </button>
    </main>
  )
}

export default Landing
