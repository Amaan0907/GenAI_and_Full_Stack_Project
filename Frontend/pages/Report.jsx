import React from 'react'

const Report = () => {
  return (
    <main classname='home'>
        <div className="left">
          <textarea name="jobDescription" id="jobDescription" placeholder='Enter Job Description here...'>

          </textarea>
        </div>
        <div className="right">
          <div className="input-group">
          <label htmlFor="resume">
            Upload Resume
          </label>
          <input type="file" name="resume" id="resume" accept='.pdf' />

          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself in brief here...'></textarea>
          </div>
        </div>
    </main>
  )
}

export default Report
