import React from 'react'
import "../styles/report.scss"
import { useInterview } from '../hooks/useInterview'

const Report = () => {

  const



  return (
    <main className='home'>
      <div className="interview-input-group">

        <div className="left">
          <p>Job Description</p>
          <textarea name="jobDescription" id="jobDescription" placeholder='Enter Job Description here...'>

          </textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <p>Resume <small className='highlight'>
              (Use Resume and self description for best result)
              </small>
              </p>
          <label className='file-label' htmlFor="resume">
            Upload Resume
          </label>
          <input hidden type="file" name="resume" id="resume" accept='.pdf' />

          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself in brief here...'></textarea>
          </div>
          <button className='button primary-button'>Generate Interview Report</button>
        </div>
      </div>
    </main>
  )
}

export default Report
