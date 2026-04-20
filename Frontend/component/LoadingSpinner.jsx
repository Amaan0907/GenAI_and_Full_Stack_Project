import React from 'react'
import './LoadingSpinner.css'

/**
 * Premium branded loading spinner.
 * @param {string} message - Optional loading message
 * @param {boolean} fullPage - Whether to take full viewport height
 */
const LoadingSpinner = ({ message = 'Loading…', fullPage = false }) => {
  return (
    <div className={`spinner-wrapper ${fullPage ? 'spinner-wrapper--fullpage' : ''}`} role="status" aria-live="polite">
      <div className="spinner-ring" aria-hidden="true">
        <svg viewBox="0 0 60 60" width="60" height="60">
          <circle
            cx="30" cy="30" r="24"
            fill="none"
            stroke="var(--surface-container-highest)"
            strokeWidth="5"
          />
          <circle
            cx="30" cy="30" r="24"
            fill="none"
            stroke="url(#spinner-grad)"
            strokeWidth="5"
            strokeDasharray="150"
            strokeDashoffset="100"
            strokeLinecap="round"
            className="spinner-arc"
            style={{ transformOrigin: 'center' }}
          />
          <defs>
            <linearGradient id="spinner-grad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2c29bb" />
              <stop offset="1" stopColor="#fd56a6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="spinner-label">{message}</p>
    </div>
  )
}

export default LoadingSpinner
