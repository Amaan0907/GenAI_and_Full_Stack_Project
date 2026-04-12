import React from 'react'
import "../pages/Form.scss"
import { Navigate,Link, useNavigate } from 'react-router-dom'

const Login = () => {



  const handleSubmit=(e)=>{
    e.preventDefault()
  }



  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onClick={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="emial" placeholder='Enter email' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='Enter Password' />
          </div>
          <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
