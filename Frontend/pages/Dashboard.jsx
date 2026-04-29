import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useInterview } from '../hooks/useInterview.js'
import LoadingSpinner from '../component/LoadingSpinner.jsx'
import './dashboard.css'

/* ── Sidebar nav items ── */
const SIDEBAR_NAV = [
  { id: 'overview',   label: 'Overview',    icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
  ), path: '/dashboard' },
  { id: 'resumes',    label: 'My Resumes',  icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  ), path: '/dashboard#resumes' },
  { id: 'skills',     label: 'Skills Graph', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ), path: null, disabled: true },
  { id: 'tracker',    label: 'Job Tracker',  icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ), path: null, disabled: true },
  { id: 'settings',   label: 'Settings',    icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
  ), path: null, disabled: true },
]

/* ── Status badge ── */
const StatusBadge = ({ score }) => {
  if (score == null) return <span className="db-card__badge db-card__badge--pending">PENDING</span>
  if (score >= 70)   return <span className="db-card__badge db-card__badge--ready">READY</span>
  return               <span className="db-card__badge db-card__badge--analyzed">ANALYZED</span>
}

/* ── Score bar ── */
const ScoreBar = ({ score }) => (
  <div className="db-card__score-row">
    <span className="db-card__score-label">Match Score</span>
    <span className="db-card__score-pct" style={{ color: score >= 70 ? 'var(--success)' : score >= 50 ? '#d97706' : 'var(--error)' }}>
      {score ?? '—'}%
    </span>
    <div className="db-card__score-bar">
      <div className="db-card__score-fill" style={{
        width: `${score ?? 0}%`,
        background: score >= 70 ? 'var(--gradient-primary)' : score >= 50 ? 'linear-gradient(90deg,#d97706,#fbbf24)' : 'linear-gradient(90deg,#b3261e,#e57373)',
      }} />
    </div>
  </div>
)

/* ── Relative time ── */
const relTime = (iso) => {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60)   return `${mins}m ago`
  const hrs  = Math.floor(mins / 60)
  if (hrs  < 24)   return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
   ══════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const navigate   = useNavigate()
  const { user, handleLogout }   = useAuth()
  const { loading, reports, getReports } = useInterview()
  const [activeNav, setActiveNav] = useState('overview')

  useEffect(() => { getReports() }, [])

  const firstName = user?.username?.split(' ')[0] ?? user?.username ?? 'there'
  const initials  = user?.username ? user.username.slice(0, 2).toUpperCase() : '??'

  /* Computed stats */
  const avgScore = reports?.length
    ? Math.round(reports.reduce((s, r) => s + (r.matchScore ?? 0), 0) / reports.length)
    : null
  const latestReport = reports?.[0]
  const insightTags  = ['React', 'Node.js', 'TypeScript', 'System Design', 'Leadership']

  const onLogout = async () => { await handleLogout(); navigate('/login') }

  return (
    <div className="db-layout">

      {/* ══════ SIDEBAR ══════ */}
      <aside className="db-sidebar" aria-label="Main sidebar">

        {/* Brand */}
        <div className="db-sidebar__brand">
          <div className="db-sidebar__logo" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#db-grad)" />
              <path d="M8 20L14 8L20 20M11 16H17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="db-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2c29bb" /><stop offset="1" stopColor="#4647d3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className="db-sidebar__brand-name">InterviewIQ</p>
            <p className="db-sidebar__brand-sub">AI Prep Suite</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="db-sidebar__nav" aria-label="Sidebar navigation">
          {SIDEBAR_NAV.map(({ id, label, icon, path, disabled }) => (
            <button
              key={id}
              id={`sidebar-nav-${id}`}
              className={`db-sidebar__link ${activeNav === id ? 'db-sidebar__link--active' : ''} ${disabled ? 'db-sidebar__link--disabled' : ''}`}
              onClick={() => { if (!disabled) { setActiveNav(id); path && navigate(path) } }}
              aria-disabled={disabled}
              aria-current={activeNav === id ? 'page' : undefined}
            >
              <span className="db-sidebar__link-icon" aria-hidden="true">{icon}</span>
              {label}
              {disabled && <span className="db-sidebar__soon">Soon</span>}
            </button>
          ))}
        </nav>

        {/* Bottom: user + CTA */}
        <div className="db-sidebar__bottom">
          <div className="db-sidebar__user">
            <div className="db-sidebar__avatar">{initials}</div>
            <div className="db-sidebar__user-info">
              <p className="db-sidebar__user-name">{user?.username}</p>
              <button className="db-sidebar__logout" onClick={onLogout}>Sign out</button>
            </div>
          </div>
          <button
            id="db-analyze-btn"
            className="btn btn-primary db-sidebar__cta"
            onClick={() => navigate('/')}
          >
            + Analyze New Resume
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <main className="db-main" id="dashboard-main">

        {/* ── Top bar ── */}
        <div className="db-topbar">
          <div>
            <h1 className="db-topbar__greeting">
              Ready to build, <span className="db-topbar__name">{firstName}?</span>
            </h1>
            <p className="db-topbar__sub body-muted">Your career blueprint is evolving. Let's make it remarkable today.</p>
          </div>
          <div className="db-topbar__actions">
            <div className="db-topbar__avatars" aria-hidden="true">
              {['#4647d3','#b4136d','#7c72e8'].map((c,i) => (
                <div key={i} className="db-topbar__avatar" style={{ background: c }} />
              ))}
            </div>
            <span className="db-topbar__mentors-label">AI Mentors</span>
          </div>
        </div>

        {/* ── Analyzed Resumes ── */}
        <section id="resumes" className="db-section" aria-labelledby="resumes-heading">
          <div className="db-section__header">
            <h2 id="resumes-heading" className="db-section__title">Analyzed Resumes</h2>
            <button className="db-section__view-all btn btn-ghost btn-sm" onClick={() => navigate('/')}>
              View All →
            </button>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching your reports…" />
          ) : (
            <div className="db-resumes-grid">
              {/* Report cards */}
              {reports?.map((report) => (
                <div key={report._id} className="db-card animate-fade-up">
                  <div className="db-card__header">
                    <div className="db-card__file-icon" aria-hidden="true">📄</div>
                    <StatusBadge score={report.matchScore} />
                  </div>
                  <h3 className="db-card__title">{report.title || 'Interview Report'}</h3>
                  <p className="db-card__time text-muted">{relTime(report.createdAt)}</p>
                  <ScoreBar score={report.matchScore} />
                  <div className="db-card__actions">
                    <button
                      id={`view-report-${report._id}`}
                      className="btn btn-primary btn-sm db-card__view-btn"
                      onClick={() => navigate(`/interview/${report._id}`)}
                    >
                      View Report
                    </button>
                    <button className="db-card__icon-btn" aria-label="More options">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload new card */}
              <button
                id="db-upload-card"
                className="db-card db-card--upload"
                onClick={() => navigate('/')}
                aria-label="Upload new resume"
              >
                <div className="db-card--upload__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <p className="db-card--upload__label">Upload New Resume</p>
                <p className="db-card--upload__sub text-muted">PDF, DOC up to 10MB</p>
              </button>
            </div>
          )}
        </section>

        {/* ── Bottom row: Profile Strength + Live Insight + AI Coach ── */}
        <div className="db-bottom-row">

          {/* Profile Strength */}
          <section className="db-strength-card card" aria-labelledby="strength-heading">
            <p className="db-strength-card__label section-number">PROFILE STRENGTH</p>
            <div className="db-strength-card__score-row">
              <span className="db-strength-card__pct">{avgScore ?? '—'}%</span>
              {avgScore && reports?.length > 1 && (
                <span className="db-strength-card__delta">
                  {avgScore >= 70 ? '↑' : '↓'} Strong
                </span>
              )}
            </div>
            <div className="db-strength-bar">
              <div className="db-strength-bar__fill" style={{ width: `${avgScore ?? 0}%` }} />
            </div>
            <p className="db-strength-card__sub body-muted">
              {avgScore
                ? avgScore >= 70
                  ? 'Great fit across your analyzed roles. Keep pushing!'
                  : 'Boost your Technical Skills to improve your profile score.'
                : 'Analyze your first resume to see your profile strength.'}
            </p>
            {latestReport && (
              <div className="db-strength-tags">
                {['React', 'TypeScript', 'APIs'].map(t => (
                  <span key={t} className="chip chip-primary">{t}</span>
                ))}
              </div>
            )}
          </section>

          {/* Live Insight */}
          <section className="db-insight-card card-low" aria-labelledby="insight-heading">
            <div className="db-insight-card__live-badge">
              <span className="db-insight-card__dot" aria-hidden="true" />
              LIVE INSIGHT
            </div>
            <h3 id="insight-heading" className="db-insight-card__title">
              Companies hiring roles that match your
              <span className="db-insight-card__highlight"> architectural skills</span>
            </h3>
            <div className="db-insight-tags">
              {insightTags.map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
              <span className="chip">+3 more</span>
            </div>
          </section>

          {/* AI Interview Coach */}
          <section className="db-coach-card" aria-labelledby="coach-heading">
            <div className="db-coach-card__bg" aria-hidden="true" />
            <p className="db-coach-card__eyebrow">AI Interview Coach</p>
            <h3 id="coach-heading" className="db-coach-card__title">
              Practising your "System Design" explanations? Our AI is ready to listen and give real-time feedback.
            </h3>
            <button
              id="db-coach-btn"
              className="btn db-coach-card__btn"
              onClick={() => navigate('/')}
            >
              Start Mock Session
            </button>
          </section>

        </div>
      </main>
    </div>
  )
}

export default Dashboard
