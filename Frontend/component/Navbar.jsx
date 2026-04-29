import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import './Navbar.css'

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
  }

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '??'

  return (
    <header className={`app-nav ${scrolled ? 'app-nav--scrolled glass' : ''}`} role="banner">
      <div className="app-nav__inner">

        {/* Brand */}
        <NavLink to="/" className="app-nav__brand" aria-label="InterviewIQ home">
          <div className="app-nav__logo" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#nav-app-grad)" />
              <path d="M8 20L14 8L20 20M11 16H17" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="nav-app-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2c29bb" /><stop offset="1" stopColor="#4647d3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="app-nav__name">InterviewIQ</span>
        </NavLink>

        {/* Nav links */}
        <nav className="app-nav__links" aria-label="App navigation">
          <NavLink
            to="/dashboard"
            id="nav-link-dashboard"
            className={({ isActive }) => `app-nav__link ${isActive ? 'app-nav__link--active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/"
            id="nav-link-reports"
            className={({ isActive }) => `app-nav__link ${isActive ? 'app-nav__link--active' : ''}`}
            end
          >
            New Report
          </NavLink>
          <a href="#" id="nav-link-practice" className="app-nav__link app-nav__link--disabled" aria-disabled="true">
            Practice
          </a>
          <a href="#" id="nav-link-pricing" className="app-nav__link app-nav__link--disabled" aria-disabled="true">
            Pricing
          </a>
        </nav>

        {/* Right actions */}
        <div className="app-nav__actions">
          {/* Bell */}
          <button id="nav-bell" className="app-nav__icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* User avatar + dropdown */}
          <div className="app-nav__user" role="group" aria-label="User menu">
            <button
              id="nav-avatar"
              className="app-nav__avatar"
              onClick={() => setMenuOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label={`User menu for ${user?.username ?? 'user'}`}
            >
              {initials}
            </button>

            {menuOpen && (
              <div className="app-nav__dropdown" role="menu" aria-label="User options">
                <div className="app-nav__dropdown-header">
                  <p className="app-nav__dropdown-name">{user?.username}</p>
                  <p className="app-nav__dropdown-email">{user?.email}</p>
                </div>
                <div className="app-nav__dropdown-divider" />
                <button
                  id="nav-logout"
                  role="menuitem"
                  className="app-nav__dropdown-item app-nav__dropdown-item--danger"
                  onClick={onLogout}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
