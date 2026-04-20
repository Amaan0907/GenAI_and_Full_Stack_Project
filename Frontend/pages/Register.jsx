import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Register route now redirects to the combined auth page (Login.jsx)
 * with the register tab pre-selected via the ?tab=register query param.
 */
const Register = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login?tab=register', { replace: true })
  }, [navigate])

  return null
}

export default Register
