import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import './landing.css'

const Landing = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const heroRef = useRef(null)

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY
        heroRef.current.style.transform = `translateY(${y * 0.12}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCTA = () => navigate(user ? '/' : '/login')
  const handleSignIn = () => navigate('/login')

  return (
    <div className="landing-page">

      {/* ────────────── NAVBAR ────────────── */}
      <header className="landing-nav glass" role="banner">
        <div className="landing-nav__inner">
          <div className="landing-nav__brand">
            <div className="landing-nav__icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#nav-grad)" />
                <path d="M8 20L14 8L20 20M11 16H17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="nav-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2c29bb" /><stop offset="1" stopColor="#4647d3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="landing-nav__name">InterviewIQ</span>
          </div>

          <nav className="landing-nav__links" aria-label="Main navigation">
            <a href="#how-it-works" className="landing-nav__link">How It Works</a>
            <a href="#features" className="landing-nav__link">Features</a>
            <a href="#social-proof" className="landing-nav__link">Trusted By</a>
          </nav>

          <div className="landing-nav__actions">
            <button id="nav-signin" className="btn btn-ghost btn-sm" onClick={handleSignIn}>Sign in</button>
            <button id="nav-cta" className="btn btn-primary btn-sm" onClick={handleCTA}>Get Started →</button>
          </div>
        </div>
      </header>

      {/* ────────────── HERO ────────────── */}
      <section className="landing-hero" aria-labelledby="hero-heading">

        {/* Ambient orbs */}
        <div className="landing-orb landing-orb--1" aria-hidden="true" />
        <div className="landing-orb landing-orb--2" aria-hidden="true" />
        <div className="landing-orb landing-orb--3" aria-hidden="true" />

        <div className="landing-hero__inner">
          {/* Left column — copy */}
          <div className="landing-hero__copy">
            <div className="badge animate-fade-up" aria-label="New feature">
              <span className="badge__dot" aria-hidden="true" />
              NEW · GPT-4o ANALYSIS MODELS
            </div>

            <h1 id="hero-heading" className="landing-hero__headline animate-fade-up delay-1">
              Ace Your Next<br />
              <span className="landing-hero__headline--gradient">Interview</span><br />
              with AI.
            </h1>

            <p className="landing-hero__sub animate-fade-up delay-2">
              Upload your resume, paste the job description, and receive a precision match score,
              gap analysis, and a personalised 7-day prep plan — in under 60 seconds.
            </p>

            <div className="landing-hero__ctas animate-fade-up delay-3">
              <button id="hero-cta-primary" className="btn btn-primary btn-lg" onClick={handleCTA}>
                Get Your Free Report →
              </button>
              <a href="#how-it-works" className="btn btn-ghost btn-lg landing-hero__watch">
                <span className="landing-hero__play" aria-hidden="true">▶</span>
                See how it works
              </a>
            </div>

            {/* Social mini proof */}
            <div className="landing-hero__proof animate-fade-up delay-4">
              <div className="landing-hero__avatars" aria-hidden="true">
                {['#4647d3','#b4136d','#2c29bb','#fd56a6','#7c72e8'].map((c, i) => (
                  <div key={i} className="landing-hero__avatar" style={{ background: c, zIndex: 5 - i }} />
                ))}
              </div>
              <p className="landing-hero__proof-text">
                <strong>2,400+</strong> candidates prep smarter every week
              </p>
            </div>
          </div>

          {/* Right column — UI preview mockup */}
          <div className="landing-hero__visual animate-fade-up delay-2" ref={heroRef} aria-hidden="true">
            <div className="landing-mockup">
              <div className="landing-mockup__bar">
                <span /><span /><span />
              </div>
              <div className="landing-mockup__body">
                {/* Simulated match score */}
                <div className="landing-mockup__score-card">
                  <div className="landing-mockup__score-ring">
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--surface-container-highest)" strokeWidth="6" />
                      <circle cx="40" cy="40" r="32" fill="none"
                        stroke="url(#score-grad)" strokeWidth="6"
                        strokeDasharray="201" strokeDashoffset="40"
                        strokeLinecap="round"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                      />
                      <defs>
                        <linearGradient id="score-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#2c29bb" />
                          <stop offset="1" stopColor="#fd56a6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="landing-mockup__score-number">87%</span>
                  </div>
                  <div>
                    <p className="landing-mockup__score-label">Match Score</p>
                    <p className="landing-mockup__score-sub">Strong fit · 3 gaps found</p>
                  </div>
                </div>

                {/* Strength pills */}
                <div className="landing-mockup__section-label">Core Strengths</div>
                <div className="landing-mockup__pills">
                  {['React', 'Node.js', 'System Design', 'Communication'].map(s => (
                    <span key={s} className="chip chip-primary landing-mockup__pill">{s}</span>
                  ))}
                </div>

                {/* Prep plan preview */}
                <div className="landing-mockup__section-label" style={{ marginTop: '12px' }}>7-Day Prep Plan</div>
                {[
                  { day: 'Day 1', task: 'Review system design patterns', done: true },
                  { day: 'Day 2', task: 'Behavioral STAR storytelling', done: true },
                  { day: 'Day 3', task: 'LeetCode medium arrays', done: false },
                ].map(item => (
                  <div key={item.day} className="landing-mockup__prep-item">
                    <div className={`landing-mockup__check ${item.done ? 'landing-mockup__check--done' : ''}`} />
                    <div>
                      <span className="landing-mockup__prep-day">{item.day}</span>
                      <span className="landing-mockup__prep-task">{item.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating insight card */}
            <div className="landing-floating-card glass">
              <span className="landing-floating-card__icon">💡</span>
              <div>
                <p className="landing-floating-card__title">AI Insight</p>
                <p className="landing-floating-card__body">Highlight distributed systems experience — it's missing from your resume.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section id="how-it-works" className="landing-steps" aria-labelledby="steps-heading">
        <div className="container">
          <div className="landing-section-header">
            <div className="chip">The Process</div>
            <h2 id="steps-heading" className="display-md" style={{ marginTop: '16px' }}>
              Three steps to interview clarity.
            </h2>
            <p className="body-muted" style={{ maxWidth: '520px', margin: '16px auto 0' }}>
              No guesswork. No generic advice. Just data-driven prep tailored to you and the role.
            </p>
          </div>

          <div className="landing-steps__grid">
            {[
              {
                num: '01',
                icon: '📄',
                title: 'Upload Your DNA',
                desc: 'Drop your resume PDF and paste the job description. Add a quick self-assessment to help the AI understand your voice.',
                color: 'var(--primary-fixed)',
              },
              {
                num: '02',
                icon: '🧠',
                title: 'Deep AI Analysis',
                desc: 'Our GPT-4o engine maps your experience against the role\'s requirements, scoring alignment across 12 dimensions.',
                color: 'var(--secondary-fixed)',
              },
              {
                num: '03',
                icon: '📊',
                title: 'Your Final Report',
                desc: 'Receive a match score, identified gaps, tailored interview questions, and a personalised 7-day preparation plan.',
                color: 'var(--primary-fixed-dim)',
              },
            ].map((step, i) => (
              <div key={step.num} className="landing-step-card card animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="landing-step-card__num-row">
                  <span className="section-number">{step.num}</span>
                  <div className="landing-step-card__icon-wrap" style={{ background: step.color }}>
                    <span role="img" aria-label="">{step.icon}</span>
                  </div>
                </div>
                <h3 className="headline-md" style={{ marginTop: '20px' }}>{step.title}</h3>
                <p className="body-muted" style={{ marginTop: '12px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── FEATURES ────────────── */}
      <section id="features" className="landing-features" aria-labelledby="features-heading">
        <div className="container">
          <div className="landing-section-header">
            <div className="chip chip-primary">Features</div>
            <h2 id="features-heading" className="display-md" style={{ marginTop: '16px' }}>
              Built for the modern candidate.
            </h2>
          </div>

          <div className="landing-features__grid">
            {[
              { icon: '🎯', title: 'Precision Match Score', desc: 'Quantified alignment across skills, experience, and cultural fit — not vague percentage guesses.' },
              { icon: '🔍', title: 'Gap Analysis', desc: 'Pinpoints exactly what\'s missing from your profile so you know where to focus your prep energy.' },
              { icon: '🧩', title: 'Behavioral Mapping', desc: 'AI-surfaced STAR stories from your background that align with the role\'s competency framework.' },
              { icon: '📅', title: '7-Day Prep Plan', desc: 'A day-by-day roadmap of what to study, practice, and prepare before your interview date.' },
              { icon: '❓', title: 'Predicted Questions', desc: 'Technical and behavioral questions the interviewer is most likely to ask, based on the JD.' },
              { icon: '⚡', title: '60-Second Results', desc: 'From upload to full report in under a minute. No waiting, no friction, just clarity.' },
            ].map((f, i) => (
              <div key={f.title} className="landing-feature-item card-low animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="landing-feature-item__icon" aria-hidden="true">{f.icon}</div>
                <h3 className="title-lg" style={{ marginTop: '16px' }}>{f.title}</h3>
                <p className="body-muted" style={{ marginTop: '8px', fontSize: 'var(--text-body-md)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── SOCIAL PROOF ────────────── */}
      <section id="social-proof" className="landing-social" aria-labelledby="social-heading">
        <div className="container">
          <p id="social-heading" className="landing-social__label text-muted">Trusted by candidates at</p>
          <div className="landing-social__logos" aria-label="Companies our users work at">
            {['TechCorp', 'Nexus', 'Lumina', 'Vertex', 'Synapse', 'Axiom'].map((name) => (
              <div key={name} className="landing-social__logo-pill">
                {name}
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="landing-testimonial">
            <div className="landing-testimonial__quote">
              "InterviewIQ identified three gaps in my resume I had no idea about. I fixed them, landed three more interviews, and got an offer within two weeks."
            </div>
            <div className="landing-testimonial__author">
              <div className="landing-testimonial__avatar" aria-hidden="true" />
              <div>
                <p className="landing-testimonial__name">Sarah M.</p>
                <p className="landing-testimonial__role text-muted">Frontend Engineer → Senior at Nexus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FINAL CTA ────────────── */}
      <section className="landing-final-cta" aria-labelledby="final-cta-heading">
        <div className="landing-orb landing-orb--4" aria-hidden="true" />
        <div className="container landing-final-cta__inner">
          <div className="chip">Start for free</div>
          <h2 id="final-cta-heading" className="display-md" style={{ marginTop: '20px' }}>
            Your next interview<br />starts here.
          </h2>
          <p className="body-muted" style={{ marginTop: '16px', maxWidth: '440px', margin: '16px auto 0' }}>
            No credit card required. Get your first full report completely free.
          </p>
          <button id="final-cta-btn" className="btn btn-primary btn-lg" style={{ marginTop: '36px' }} onClick={handleCTA}>
            Get Your Free Report →
          </button>
        </div>
      </section>

      {/* ────────────── FOOTER ────────────── */}
      <footer className="landing-footer" role="contentinfo">
        <div className="container landing-footer__inner">
          <div className="landing-nav__brand">
            <div className="landing-nav__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="url(#foot-grad)" />
                <path d="M8 20L14 8L20 20M11 16H17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="foot-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2c29bb" /><stop offset="1" stopColor="#4647d3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="landing-nav__name" style={{ fontSize: 'var(--text-title-sm)' }}>InterviewIQ</span>
          </div>
          <p className="text-muted" style={{ fontSize: 'var(--text-body-md)' }}>
            © 2026 InterviewIQ. Built with precision.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default Landing
