import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
const Register = () => {

    
    
    const navigate=useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading,handleRegister}=useAuth()

    const handleSubmit =async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
       
    }

    if(loading){
        return <main><h1>Loading....</h1></main>
    }

  return (
    <div>
          <main>
              <div className="form-container">
                  <h1>Register</h1>
                  <form >
                      <div className="input-group">
                          <label htmlFor="username">Username</label>
                          <input 
                          onChange={(e)=>setUsername(e.target.value)}
                          type="username" name="username" id="username" placeholder='Enter username' />
                      </div>
                      <div className="input-group">
                          <label htmlFor="email">Email</label>
                          <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Enter email' />
                      </div>
                      <div className="input-group">
                          <label htmlFor="password">Password</label>
                          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Enter Password' />
                      </div>
                      <button onClick={handleSubmit} className='button primary-button'>Login</button>
                  </form>
                  <p>Already have an account? <Link to={"/login"}>Login</Link></p>
              </div>
          </main>
    </div>
  )
}

export default Register
