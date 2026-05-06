import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { email, role, name: email.split('@')[0] }
    setUser(userData)
    navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard')
  }

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <div className="auth-box">
          <div className="auth-header">
            <div className="brand-logo">🚗</div>
            <h1>DriveNow</h1>
            <p>Welcome back! Please login to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="form-field">
              <label>Login As</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Customer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
