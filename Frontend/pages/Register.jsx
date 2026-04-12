import React from 'react'
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {

    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div>
          <main>
              <div className="form-container">
                  <h1>Register</h1>
                  <form onClick={handleSubmit}>
                      <div className="input-group">
                          <label htmlFor="username">Username</label>
                          <input type="username" name="username" id="username" placeholder='Enter username' />
                      </div>
                      <div className="input-group">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" id="email" placeholder='Enter email' />
                      </div>
                      <div className="input-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" name="password" id="password" placeholder='Enter Password' />
                      </div>
                      <button className='button primary-button'>Login</button>
                  </form>
                  <p>Already have an account? <Link to={"/login"}>Login</Link></p>
              </div>
          </main>
    </div>
  )
}

export default Register
