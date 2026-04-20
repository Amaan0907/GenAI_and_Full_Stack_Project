import React,{useState,useRef} from 'react'
import "../styles/report.scss"
import { useInterview } from '../hooks/useInterview'
import {useNavigate} from "react-router-dom"

const Report = () => {

  const {loading,generateReport}=useInterview()

  const [jobDescription,setJobDescription]=useState("")
  const [selfDescription,setSelfDescription]=useState("")
  const resumeInputRef=useRef()

const navigate=useNavigate()
  const handleGenerateButton=async()=>{
    const resumeFile=resumeInputRef.current.files[0]
    const data=await generateReport({jobDescription,selfDescription,resumeFile})
    navigate(`/interview/${data._id}`)
  }

  return (
    <main className='home'>
      <div className="interview-input-group">

        <div className="left">
          <p>Job Description</p>
          <textarea 
          onChange={(e) => { setJobDescription(e.target.value) }}
          name="jobDescription" id="jobDescription" placeholder='Enter Job Description here...'>

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
          <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept='.pdf' />

          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea 
            onChange={(e)=>{setSelfDescription(e.target.value)}}
            name="selfDescription" id="selfDescription" placeholder='Describe yourself in brief here...'></textarea>
          </div>
          <button 
          onClick={handleGenerateButton}
          className='button primary-button'>Generate Interview Report</button>
        </div>
      </div>
    </main>
  )
}

export default Report
