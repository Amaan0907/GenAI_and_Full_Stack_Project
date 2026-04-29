import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import './auth.css'

const AuthPage = () => {
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login'
  const [activeTab, setActiveTab] = useState(initialTab)
  const navigate = useNavigate()
  const { loading, handleLogin, handleRegister } = useAuth()

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register form state
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')
  const [regError, setRegError] = useState('')

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email: loginEmail, password: loginPassword })
    navigate('/dashboard')
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setRegError('')
    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.')
      return
    }
    await handleRegister({ username: regUsername, email: regEmail, password: regPassword })
    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      {/* ── Background orbs ── */}
      <div className="auth-bg-orb auth-orb-1" aria-hidden="true" />
      <div className="auth-bg-orb auth-orb-2" aria-hidden="true" />

      <div className="auth-wrapper animate-fade-up">

        {/* ── Logo / Brand ── */}
        <div className="auth-brand">
          <div className="auth-brand-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#brand-grad)" />
              <path d="M8 20L14 8L20 20M11 16H17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="brand-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2c29bb" /><stop offset="1" stopColor="#4647d3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="auth-brand-name">InterviewIQ</span>
        </div>

        {/* ── Card ── */}
        <div className="auth-card">

          {/* ── Tab switcher ── */}
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button
              id="tab-login"
              role="tab"
              aria-selected={activeTab === 'login'}
              aria-controls="panel-login"
              className={`auth-tab ${activeTab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              id="tab-register"
              role="tab"
              aria-selected={activeTab === 'register'}
              aria-controls="panel-register"
              className={`auth-tab ${activeTab === 'register' ? 'auth-tab--active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Create Account
            </button>
          </div>

          {/* ══════════════ LOGIN PANEL ══════════════ */}
          {activeTab === 'login' && (
            <div id="panel-login" role="tabpanel" aria-labelledby="tab-login" className="auth-panel animate-fade-in">
              <div className="auth-panel__header">
                <h1 className="auth-panel__title">Welcome back.</h1>
                <p className="auth-panel__subtitle">Sign in to access your interview reports and prep plans.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
                <div className="auth-field">
                  <label htmlFor="login-email" className="form-label">Email address</label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="login-password" className="form-label">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    className="input-field"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  id="btn-login"
                  type="submit"
                  className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing in…' : 'Sign In →'}
                </button>
              </form>

              {/* OAuth */}
              <div className="auth-divider">
                <span className="auth-divider__text">or continue with</span>
              </div>
              <div className="auth-oauth">
                <button id="btn-google" type="button" className="auth-oauth__btn">
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button id="btn-apple" type="button" className="auth-oauth__btn">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M12.15 0c.073.933-.27 1.862-.823 2.55-.554.69-1.44 1.228-2.33 1.16-.095-.886.302-1.82.822-2.462C10.35.6 11.27.07 12.15 0zM15.6 13.14c-.41.93-.605 1.345-1.131 2.166-.735 1.12-1.77 2.516-3.054 2.528-1.14.01-1.43-.74-2.978-.73-1.547.008-1.866.744-3.012.734C4.145 17.826 3.16 16.56 2.43 15.44 .5 12.54-.21 9.16.062 5.867c.198-2.33 1.376-4.48 3.15-5.706A5.79 5.79 0 0 1 6.01-.03c1.18-.016 2.3.65 3.03.65.728 0 2.095-.808 3.53-.69.6.025 2.285.244 3.366 1.84-.087.054-2.01 1.174-1.99 3.5.02 2.78 2.44 3.704 2.47 3.716-.025.094-.383 1.31-1.266 3.074l-.55.08z"/></svg>
                  Apple
                </button>
              </div>

              <p className="auth-switch-text">
                Don't have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => setActiveTab('register')}>
                  Create one →
                </button>
              </p>
            </div>
          )}

          {/* ══════════════ REGISTER PANEL ══════════════ */}
          {activeTab === 'register' && (
            <div id="panel-register" role="tabpanel" aria-labelledby="tab-register" className="auth-panel animate-fade-in">
              <div className="auth-panel__header">
                <h1 className="auth-panel__title">Create your account.</h1>
                <p className="auth-panel__subtitle">Join thousands of candidates who prep smarter with AI.</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="auth-form" noValidate>
                <div className="auth-field">
                  <label htmlFor="reg-username" className="form-label">Username</label>
                  <input
                    id="reg-username"
                    type="text"
                    name="username"
                    className="input-field"
                    placeholder="yourname"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="reg-email" className="form-label">Email address</label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="auth-fields-row">
                  <div className="auth-field">
                    <label htmlFor="reg-password" className="form-label">Password</label>
                    <input
                      id="reg-password"
                      type="password"
                      name="password"
                      className="input-field"
                      placeholder="Min 8 chars"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="reg-confirm" className="form-label">Confirm</label>
                    <input
                      id="reg-confirm"
                      type="password"
                      name="confirm"
                      className="input-field"
                      placeholder="Repeat"
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {regError && (
                  <p className="auth-error" role="alert">{regError}</p>
                )}

                <button
                  id="btn-register"
                  type="submit"
                  className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Creating account…' : 'Create Account →'}
                </button>
              </form>

              <p className="auth-switch-text">
                Already have an account?{' '}
                <button type="button" className="auth-switch-link" onClick={() => setActiveTab('login')}>
                  Sign in →
                </button>
              </p>
            </div>
          )}

        </div>
        {/* ──────────────────────────────── */}

        {/* ── Feature badges ── */}
        <div className="auth-features" aria-label="Key features">
          <div className="auth-feature">
            <span className="auth-feature__icon" aria-hidden="true">🎯</span>
            <span className="auth-feature__label">AI Analysis</span>
          </div>
          <div className="auth-feature-sep" aria-hidden="true" />
          <div className="auth-feature">
            <span className="auth-feature__icon" aria-hidden="true">🧠</span>
            <span className="auth-feature__label">Behavioral Insights</span>
          </div>
          <div className="auth-feature-sep" aria-hidden="true" />
          <div className="auth-feature">
            <span className="auth-feature__icon" aria-hidden="true">📈</span>
            <span className="auth-feature__label">Precision Prep</span>
          </div>
        </div>

      </div>
    </main>
  )
}

export default AuthPage
