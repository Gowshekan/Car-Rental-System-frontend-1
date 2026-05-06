import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Registration successful! Please login.')
    navigate('/')
  }

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <div className="auth-box">
          <div className="auth-header">
            <div className="brand-logo">🚗</div>
            <h1>DriveNow</h1>
            <p>Create your account to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                required 
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Create a password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
            <button type="submit" className="auth-btn">Create Account</button>
          </form>
          <div className="auth-footer">
            <p>Already have an account? <Link to="/">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
