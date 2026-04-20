import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import Navbar from '../component/Navbar.jsx'
import LoadingSpinner from '../component/LoadingSpinner.jsx'
import './interview.css'

/* ── helpers ── */
const severityColor = { low: '#1a7f5a', medium: '#d97706', high: '#b3261e' }
const severityBg    = { low: '#d1fae5', medium: '#fef3c7', high: '#f9dedc' }

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
      {/* Track */}
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--surface-container-highest)" strokeWidth="10" />
      {/* Progress */}
      <circle
        cx="90" cy="90" r={r}
        fill="none"
        stroke="url(#score-gradient)"
        strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <defs>
        <linearGradient id="score-gradient" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2c29bb" />
          <stop offset="1" stopColor="#fd56a6" />
        </linearGradient>
      </defs>
      <text x="90" y="85" textAnchor="middle" fill="var(--on-surface)"
        style={{ fontFamily: 'var(--font-headline)', fontSize: '2rem', fontWeight: 800 }}>
        {score}%
      </text>
      <text x="90" y="108" textAnchor="middle" fill="var(--on-surface-muted)"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500 }}>
        Match Score
      </text>
    </svg>
  )
}

const AccordionItem = ({ question, answer, intention, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion-item ${open ? 'accordion-item--open' : ''}`}>
      <button
        id={`accordion-btn-${index}`}
        className="accordion-item__trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="accordion-item__q">{question}</span>
        <span className="accordion-item__chevron" aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="accordion-item__body animate-fade-in">
          {intention && (
            <p className="accordion-item__intention">
              <strong>Why they ask:</strong> {intention}
            </p>
          )}
          <p className="accordion-item__answer">{answer}</p>
        </div>
      )}
    </div>
  )
}

const NAV_SECTIONS = [
  { id: 'match-score',   label: 'Match Score',      icon: '🎯' },
  { id: 'strengths',     label: 'Core Strengths',   icon: '💪' },
  { id: 'gaps',          label: 'Skill Gaps',        icon: '🔍' },
  { id: 'technical',     label: 'Technical Qs',      icon: '⚙️' },
  { id: 'behavioral',    label: 'Behavioral Qs',     icon: '🧠' },
  { id: 'prep-plan',     label: '7-Day Prep Plan',   icon: '📅' },
]

const Interview = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const { loading, report, getReportById } = useInterview()
  const [activeSection, setActiveSection] = useState('match-score')
  const sectionRefs = useRef({})

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [report])

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <LoadingSpinner fullPage message="Loading your report…" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="page">
        <Navbar />
        <div className="interview-empty">
          <div className="interview-empty__icon" aria-hidden="true">📋</div>
          <h1 className="headline-lg">Report not found</h1>
          <p className="body-muted">This report may have been deleted or doesn't exist.</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }} onClick={() => navigate('/')}>
            ← Back to Generator
          </button>
        </div>
      </div>
    )
  }

  const scoreLabel = report.matchScore >= 75 ? 'Strong fit' : report.matchScore >= 50 ? 'Moderate fit' : 'Needs work'
  const scoreColor = report.matchScore >= 75 ? '#1a7f5a' : report.matchScore >= 50 ? '#d97706' : '#b3261e'

  return (
    <div className="interview-page page">
      <Navbar />

      <div className="interview-layout container">

        {/* ══════════ STICKY SIDEBAR ══════════ */}
        <aside className="interview-sidebar" aria-label="Report navigation">
          <div className="interview-sidebar__inner glass">
            <p className="interview-sidebar__label text-muted">SECTIONS</p>
            <nav aria-label="Report sections">
              {NAV_SECTIONS.map(({ id, label, icon }) => (
                <button
                  key={id}
                  id={`sidebar-${id}`}
                  className={`interview-sidebar__link ${activeSection === id ? 'interview-sidebar__link--active' : ''}`}
                  onClick={() => scrollTo(id)}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  <span className="interview-sidebar__link-icon" aria-hidden="true">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>

            <div className="interview-sidebar__divider" />

            <button className="btn btn-ghost btn-sm interview-sidebar__back" onClick={() => navigate('/')}>
              ← New Report
            </button>
          </div>
        </aside>

        {/* ══════════ MAIN CONTENT ══════════ */}
        <main className="interview-content" id="interview-main">

          {/* Report title */}
          <div className="interview-title-row animate-fade-up">
            <div>
              <div className="chip chip-primary">{report.title || 'Interview Report'}</div>
              <h1 className="interview-main-title">Your Analysis Report.</h1>
              <p className="body-muted">
                Generated {report.createdAt ? new Date(report.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'recently'}
              </p>
            </div>
            <div className="interview-score-pill" style={{ background: scoreColor + '18', color: scoreColor }}>
              {scoreLabel}
            </div>
          </div>

          {/* ── SECTION 1: Match Score ── */}
          <section
            id="match-score"
            ref={el => sectionRefs.current['match-score'] = el}
            className="interview-section animate-fade-up delay-1"
            aria-labelledby="section-match-score"
          >
            <h2 id="section-match-score" className="interview-section__title">
              <span className="section-number">01</span> Match Score
            </h2>
            <div className="card interview-score-card">
              <CircleProgress score={report.matchScore ?? 0} />
              <div className="interview-score-card__text">
                <p className="headline-md">
                  <span style={{ color: scoreColor }}>{report.matchScore}%</span> match
                </p>
                <p className="body-muted" style={{ marginTop: 'var(--space-2)' }}>
                  {scoreLabel} · {report.skillGaps?.length ?? 0} skill gaps identified ·{' '}
                  {report.technicalQuestions?.length ?? 0} technical questions predicted
                </p>
                <div className="interview-score-bar" aria-hidden="true">
                  <div
                    className="interview-score-bar__fill"
                    style={{ width: `${report.matchScore}%`, background: `linear-gradient(90deg, #2c29bb, #fd56a6)` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 2: Core Strengths (skill chips from non-gap skills) ── */}
          <section
            id="strengths"
            ref={el => sectionRefs.current['strengths'] = el}
            className="interview-section animate-fade-up delay-2"
            aria-labelledby="section-strengths"
          >
            <h2 id="section-strengths" className="interview-section__title">
              <span className="section-number">02</span> Core Strengths
            </h2>
            <div className="interview-strengths-grid">
              {report.skillGaps?.filter(g => g.severity === 'low').length > 0
                ? report.skillGaps.filter(g => g.severity === 'low').map((gap, i) => (
                    <div key={i} className="card-low interview-strength-card">
                      <span className="interview-strength-card__dot" style={{ background: '#1a7f5a' }} />
                      <div>
                        <p className="interview-strength-card__skill">{gap.skill}</p>
                        <p className="interview-strength-card__badge" style={{ color: '#1a7f5a' }}>Strong</p>
                      </div>
                    </div>
                  ))
                : (
                  <div className="card-low interview-strength-card">
                    <p className="body-muted">Your profile shows a strong general alignment with the role.</p>
                  </div>
                )
              }
            </div>
          </section>

          {/* ── SECTION 3: Skill Gaps ── */}
          <section
            id="gaps"
            ref={el => sectionRefs.current['gaps'] = el}
            className="interview-section animate-fade-up"
            aria-labelledby="section-gaps"
          >
            <h2 id="section-gaps" className="interview-section__title">
              <span className="section-number">03</span> Skill Gaps
            </h2>
            {report.skillGaps?.length > 0 ? (
              <div className="interview-gaps-list">
                {report.skillGaps.map((gap, i) => (
                  <div key={i} className="interview-gap-item card-low">
                    <div className="interview-gap-item__left">
                      <span
                        className="interview-gap-item__severity-dot"
                        style={{ background: severityColor[gap.severity] }}
                        aria-label={`${gap.severity} severity`}
                      />
                      <span className="interview-gap-item__skill">{gap.skill}</span>
                    </div>
                    <span
                      className="interview-gap-item__badge chip"
                      style={{ background: severityBg[gap.severity], color: severityColor[gap.severity] }}
                    >
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-low"><p className="body-muted">No significant skill gaps identified.</p></div>
            )}
          </section>

          {/* ── SECTION 4: Technical Questions ── */}
          <section
            id="technical"
            ref={el => sectionRefs.current['technical'] = el}
            className="interview-section animate-fade-up"
            aria-labelledby="section-technical"
          >
            <h2 id="section-technical" className="interview-section__title">
              <span className="section-number">04</span> Technical Questions
            </h2>
            <p className="body-muted interview-section__desc">
              Predicted questions the interviewer is likely to ask based on your JD and profile.
            </p>
            {report.technicalQuestions?.length > 0 ? (
              <div className="interview-accordion">
                {report.technicalQuestions.map((q, i) => (
                  <AccordionItem key={i} index={`tech-${i}`} {...q} />
                ))}
              </div>
            ) : (
              <div className="card-low"><p className="body-muted">No technical questions generated.</p></div>
            )}
          </section>

          {/* ── SECTION 5: Behavioral Questions ── */}
          <section
            id="behavioral"
            ref={el => sectionRefs.current['behavioral'] = el}
            className="interview-section animate-fade-up"
            aria-labelledby="section-behavioral"
          >
            <h2 id="section-behavioral" className="interview-section__title">
              <span className="section-number">05</span> Behavioral Questions
            </h2>
            <p className="body-muted interview-section__desc">
              STAR-format questions focused on your competencies and cultural fit.
            </p>
            {report.behavioralQuestions?.length > 0 ? (
              <div className="interview-accordion">
                {report.behavioralQuestions.map((q, i) => (
                  <AccordionItem key={i} index={`beh-${i}`} {...q} />
                ))}
              </div>
            ) : (
              <div className="card-low"><p className="body-muted">No behavioral questions generated.</p></div>
            )}
          </section>

          {/* ── SECTION 6: 7-Day Prep Plan ── */}
          <section
            id="prep-plan"
            ref={el => sectionRefs.current['prep-plan'] = el}
            className="interview-section animate-fade-up"
            aria-labelledby="section-prep"
          >
            <h2 id="section-prep" className="interview-section__title">
              <span className="section-number">06</span> 7-Day Prep Plan
            </h2>
            {report.preparationPlan?.length > 0 ? (
              <div className="interview-prep-list">
                {report.preparationPlan.map((dayPlan) => (
                  <div key={dayPlan.day} className="interview-prep-day card">
                    <div className="interview-prep-day__header">
                      <div className="interview-prep-day__badge">Day {dayPlan.day}</div>
                      <h3 className="interview-prep-day__focus">{dayPlan.focus}</h3>
                    </div>
                    <ul className="interview-prep-day__tasks">
                      {dayPlan.tasks?.map((task, i) => (
                        <li key={i} className="interview-prep-day__task">
                          <span className="interview-prep-day__check" aria-hidden="true" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-low"><p className="body-muted">No preparation plan generated.</p></div>
            )}
          </section>

        </main>
      </div>
    </div>
  )
}

export default Interview
