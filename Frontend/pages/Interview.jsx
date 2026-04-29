import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import LoadingSpinner from '../component/LoadingSpinner.jsx'
import './interview.css'

/* ── Helpers ── */
const CircleProgress = ({ score }) => {
  const [animated, setAnimated] = useState(0)
  const r = 72
  const circ = 2 * Math.PI * r

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  const offset = circ - (animated / 100) * circ

  return (
    <svg viewBox="0 0 180 180" width="180" height="180" aria-label={`Match score: ${score}%`}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--surface-container-highest)" strokeWidth="10" />
      <circle
        cx="90" cy="90" r={r}
        fill="none"
        stroke="#6b21a8" /* Deeper purple to match design */
        strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <text x="90" y="85" textAnchor="middle" fill="var(--on-surface)"
        style={{ fontFamily: 'var(--font-headline)', fontSize: '2.5rem', fontWeight: 800 }}>
        {score}%
      </text>
      <text x="90" y="110" textAnchor="middle" fill="var(--on-surface-muted)"
        style={{ fontFamily: 'var(--font-headline)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
        MATCH SCORE
      </text>
    </svg>
  )
}

const AccordionList = ({ title, items, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  
  if (!items || items.length === 0) return null

  return (
    <div className={`qa-accordion ${open ? 'qa-accordion--open' : ''}`}>
      <button className="qa-accordion__header" onClick={() => setOpen(!open)}>
        <span className="qa-accordion__icon" aria-hidden="true">⚡</span>
        <span className="qa-accordion__title">{title}</span>
        <span className="qa-accordion__chevron" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
      </button>
      
      {open && (
        <div className="qa-accordion__body animate-fade-in">
          {items.map((item, idx) => (
            <div key={idx} className="qa-item">
              <p className="qa-item__q">{item.question}</p>
              {item.intention && (
                <p className="qa-item__i"><em>Why:</em> {item.intention}</p>
              )}
              <p className="qa-item__a">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   INTERVIEW REPORT PAGE
   ══════════════════════════════════════════════════════════════ */
const Interview = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const { loading, report, getReportById } = useInterview()

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  if (loading) {
    return <LoadingSpinner fullPage message="Loading Detailed Analysis…" />
  }

  if (!report) {
    return (
      <div className="interview-empty">
        <h1 className="headline-lg">Report not found</h1>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    )
  }

  const scoreLabel = report.matchScore >= 75 ? 'STRONG FIT' : report.matchScore >= 50 ? 'MODERATE FIT' : 'NEEDS WORK'
  
  const strengths = report.strengths || []
  const gaps = report.skillGaps || []

  return (
    <div className="report-layout">
      
      {/* ══════ SIDEBAR ══════ */}
      <aside className="report-sidebar">
        <div className="report-sidebar__brand">
          <div className="report-sidebar__logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="#6b21a8" />
              <path d="M7 17L12 7L17 17M10 14H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="report-sidebar__brand-name">InterviewIQ</div>
            <div className="report-sidebar__brand-sub">AI PREP SUITE</div>
          </div>
        </div>

        <nav className="report-sidebar__nav">
          <button className="report-sidebar__link" onClick={() => navigate('/dashboard')}>
            <span aria-hidden="true">⊞</span> Dashboard
          </button>
          <button className="report-sidebar__link report-sidebar__link--disabled">
            <span aria-hidden="true">🎙️</span> Mock Interviews
          </button>
          <button className="report-sidebar__link report-sidebar__link--disabled">
            <span aria-hidden="true">🗺️</span> Career Roadmap
          </button>
          <button className="report-sidebar__link report-sidebar__link--active">
            <span aria-hidden="true">⏱️</span> History
          </button>
        </nav>

        <div className="report-sidebar__bottom">
          <button className="btn btn-primary report-sidebar__cta" onClick={() => navigate('/')}>
            New Simulation
          </button>
          <button className="report-sidebar__meta-link">
            <span aria-hidden="true">⚙️</span> Settings
          </button>
          <button className="report-sidebar__meta-link">
            <span aria-hidden="true">❓</span> Support
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <main className="report-main animate-fade-up">
        
        {/* Header */}
        <header className="report-header">
          <div>
            <div className="report-chip">{report.verdict?.toUpperCase() || 'DETAILED ANALYSIS'}</div>
            <h1 className="report-title">{report.title || 'Technical Assessment'}</h1>
          </div>
          <div className="report-actions">
            <button className="icon-btn" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </button>
            <button className="icon-btn" aria-label="Download">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </header>

        {/* Top Split: Score & Strengths */}
        <div className="report-top-split">
          
          {/* Match Score */}
          <section className="score-panel card">
            <CircleProgress score={report.matchScore ?? 0} />
            <div className={`score-badge score-badge--${report.matchScore >= 75 ? 'strong' : report.matchScore >= 50 ? 'moderate' : 'weak'}`}>
              <span className="score-badge__icon" aria-hidden="true">✓</span> {report.verdict || scoreLabel}
            </div>
            <p className="score-desc">
              {report.overview || (report.matchScore >= 75 
                ? "You exceed technical requirements and align perfectly with team culture."
                : "You meet some requirements but have noticeable gaps to bridge.")}
            </p>
          </section>

          {/* Core Strengths */}
          <section className="strengths-panel">
            <div className="strengths-banner">
              <h2>Core Strengths</h2>
              <p>Key highlights from your profile that match the role requirements.</p>
              <div className="strengths-banner__bg-accent" />
            </div>
            
            <div className="strengths-cards">
              {strengths.length > 0 ? strengths.slice(0, 2).map((s, i) => (
                <div key={i} className="strength-card">
                  <div className="strength-card__header">
                    <span className="strength-card__icon" style={{color: i===0 ? '#8b5cf6' : '#059669'}}>
                      {i===0 ? '💡' : '👥'}
                    </span>
                    <h3>{s.skill}</h3>
                  </div>
                  <p>{s.evidence}</p>
                </div>
              )) : (
                <div className="strength-card"><p>No clear strengths identified.</p></div>
              )}
            </div>
          </section>

        </div>

        {/* Middle Split: Gaps & Q&A */}
        <div className="report-mid-split">
          
          {/* Skill Gaps */}
          <section className="gaps-panel">
            <div className="section-head">
              <span className="section-head__icon" style={{color: '#dc2626'}}>⚠️</span>
              <h2>Skill Gaps & Focus Areas</h2>
            </div>
            
            <div className="gaps-list">
              {gaps.length > 0 ? gaps.map((gap, i) => (
                <div key={i} className="gap-card">
                  <div className="gap-card__icon">
                    {gap.severity === 'high' ? '📈' : '💻'}
                  </div>
                  <div className="gap-card__content">
                    <h3>{gap.skill}</h3>
                    <p className="gap-card__quote">
                      "You showed partial experience with {gap.skill.toLowerCase()}, but lacked specific depth."
                    </p>
                  </div>
                  <div className={`gap-card__badge gap-card__badge--${gap.severity}`}>
                    {gap.severity === 'high' ? 'CRITICAL' : 'MINOR'}
                  </div>
                </div>
              )) : (
                <div className="gap-card"><p>No major gaps found!</p></div>
              )}
            </div>
          </section>

          {/* Q&A Deep Dive */}
          <section className="qa-panel">
            <div className="section-head">
              <span className="section-head__icon" style={{color: '#6b21a8'}}>🗂️</span>
              <h2>Q&A Deep Dive</h2>
            </div>
            
            <div className="qa-list">
              <AccordionList 
                title="Technical Performance" 
                items={report.technicalQuestions} 
                defaultOpen={true} 
              />
              <AccordionList 
                title="Behavioral Signals" 
                items={report.behavioralQuestions} 
              />
            </div>
          </section>

        </div>

        {/* Bottom: Roadmap */}
        <section className="roadmap-panel">
          <div className="roadmap-header">
            <h2>Personalized 7-Day Roadmap</h2>
            <p>Focused plan to bridge your gaps before the final loop.</p>
            <div className="roadmap-icon">📅</div>
          </div>
          
          <div className="roadmap-timeline">
            {report.preparationPlan?.map((plan, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-item__dot" />
                {i !== report.preparationPlan.length - 1 && <div className="timeline-item__line" />}
                <div className="timeline-item__content card">
                  <div className="timeline-item__header">
                    <h3>Day {plan.day}: {plan.focus}</h3>
                    <span className="timeline-item__hours">{Math.floor(Math.random()*3)+2} HOURS</span>
                  </div>
                  <ul className="timeline-item__tasks">
                    {plan.tasks.map((task, idx) => (
                      <li key={idx}>• {task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer inside main */}
        <footer className="report-footer">
          <div className="report-footer__left">
            <strong>InterviewIQ</strong>
            <span>© 2024 INTERVIEWIQ. ATMOSPHERIC PRECISION DESIGN.</span>
          </div>
          <div className="report-footer__right">
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF SERVICE</a>
            <a href="#">AI ETHICS</a>
            <a href="#">CONTACT</a>
          </div>
        </footer>

      </main>

    </div>
  )
}

export default Interview
