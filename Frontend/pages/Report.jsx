import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterview } from '../hooks/useInterview'
import Navbar from '../component/Navbar.jsx'
import LoadingSpinner from '../component/LoadingSpinner.jsx'
import './report.css'

const Report = () => {
  const { loading, generateReport } = useInterview()
  const navigate = useNavigate()

  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const resumeInputRef = useRef()

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
    }
  }

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return
    const file = resumeFile || resumeInputRef.current?.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile: file })
    if (data?._id) navigate(`/interview/${data._id}`)
  }

  const isReady = jobDescription.trim().length > 20

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <LoadingSpinner fullPage message="Generating your AI report… this may take 30–60 seconds" />
      </div>
    )
  }

  return (
    <div className="report-page page">
      <Navbar />

      {/* ── Ambient orbs ── */}
      <div className="report-orb report-orb--1" aria-hidden="true" />
      <div className="report-orb report-orb--2" aria-hidden="true" />

      <main className="report-main container">

        {/* ── Page header ── */}
        <div className="report-header animate-fade-up">
          <div className="chip chip-primary">Analysis Blueprint</div>
          <h1 className="report-header__title">
            The Kinetic<br />
            <span className="report-header__title--gradient">Analysis Blueprint.</span>
          </h1>
          <p className="report-header__sub">
            Provide the job description, your resume, and a brief self-assessment.
            Our AI maps your profile to the role across 12 dimensions.
          </p>
        </div>

        {/* ── Two-column form ── */}
        <div className="report-grid">

          {/* ── LEFT — Job description ── */}
          <div className="report-col report-col--left animate-fade-up delay-1">
            <div className="report-section-label">
              <span className="section-number">01</span>
              <span className="report-section-label__text">Job Description</span>
            </div>
            <h2 className="report-col__heading">Paste the role you're targeting.</h2>
            <p className="report-col__hint body-muted">
              Include the full job description — requirements, responsibilities, and any nice-to-haves.
            </p>
            <textarea
              id="jobDescription"
              name="jobDescription"
              className="textarea-field report-jd-textarea"
              placeholder="Senior Frontend Engineer at Acme Corp…&#10;&#10;Requirements:&#10;• 4+ years of React experience&#10;• TypeScript proficiency&#10;• …"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              aria-label="Job description"
              aria-required="true"
            />
            <div className="report-jd-counter">
              <span className={jobDescription.length < 100 ? 'text-muted' : 'text-primary'}>
                {jobDescription.length} chars {jobDescription.length < 100 ? '— add more for better results' : '✓'}
              </span>
            </div>
          </div>

          {/* ── RIGHT — Resume + self description ── */}
          <div className="report-col report-col--right animate-fade-up delay-2">

            {/* Resume upload */}
            <div className="report-section-label">
              <span className="section-number">02</span>
              <span className="report-section-label__text">Resume</span>
            </div>
            <h2 className="report-col__heading">Upload your resume.</h2>
            <p className="report-col__hint body-muted">PDF format · Used for precision match scoring</p>

            <div
              id="resume-dropzone"
              className={`report-dropzone ${dragOver ? 'report-dropzone--active' : ''} ${resumeFile ? 'report-dropzone--done' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Upload resume PDF"
              onClick={() => resumeInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && resumeInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                handleFileChange(e.dataTransfer.files[0])
              }}
            >
              <input
                ref={resumeInputRef}
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                hidden
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              {resumeFile ? (
                <>
                  <div className="report-dropzone__icon report-dropzone__icon--done" aria-hidden="true">✓</div>
                  <p className="report-dropzone__filename">{resumeFile.name}</p>
                  <p className="report-dropzone__change text-muted">Click to replace</p>
                </>
              ) : (
                <>
                  <div className="report-dropzone__icon" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="report-dropzone__label">Drop your PDF here or <span className="text-primary">browse</span></p>
                  <p className="report-dropzone__sublabel text-muted">Supports PDF up to 10 MB</p>
                </>
              )}
            </div>

            {/* Self description */}
            <div className="report-section-label" style={{ marginTop: 'var(--space-8)' }}>
              <span className="section-number">03</span>
              <span className="report-section-label__text">Self Assessment</span>
            </div>
            <h2 className="report-col__heading">Describe yourself briefly.</h2>
            <p className="report-col__hint body-muted">
              What's your biggest strength? What kind of role do you thrive in?
            </p>
            <textarea
              id="selfDescription"
              name="selfDescription"
              className="textarea-field"
              style={{ minHeight: '120px' }}
              placeholder="I'm a senior frontend engineer with 5 years specialising in React and design systems. I thrive in fast-moving product teams and love mentoring juniors…"
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              aria-label="Self description"
            />

            {/* Generate CTA */}
            <button
              id="btn-generate"
              className={`btn btn-primary btn-lg report-generate-btn ${!isReady ? 'report-generate-btn--disabled' : ''}`}
              onClick={handleGenerate}
              disabled={!isReady}
              aria-disabled={!isReady}
            >
              {loading ? 'Generating…' : 'Generate Report 🚀'}
            </button>
            {!isReady && (
              <p className="report-generate-hint text-muted" role="status">
                Add at least 20 characters to the job description to continue.
              </p>
            )}
          </div>
        </div>

        {/* ── Bottom feature cards ── */}
        <div className="report-feature-cards animate-fade-up delay-3">
          {[
            { icon: '🔍', title: 'Gap Analysis', desc: 'Identifies missing skills and experience gaps between you and the role.' },
            { icon: '🧩', title: 'Behavioral Mapping', desc: 'Surfaces STAR-ready stories from your background that fit the position.' },
            { icon: '📅', title: 'Prep Strategy', desc: 'A 7-day personalised study plan built around your specific gaps.' },
          ].map((card) => (
            <div key={card.title} className="report-feature-card card-low">
              <span className="report-feature-card__icon" aria-hidden="true">{card.icon}</span>
              <h3 className="report-feature-card__title">{card.title}</h3>
              <p className="report-feature-card__desc body-muted">{card.desc}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

export default Report
