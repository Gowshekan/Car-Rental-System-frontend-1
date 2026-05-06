import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function UserProfile({ user, setUser }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    driverLicense: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await api.getProfile()
      setProfile({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        driverLicense: data.driverLicense || ''
      })
    } catch (err) {
      console.error('Failed to load profile:', err)
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        driverLicense: ''
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    
    try {
      const result = await api.updateProfile(profile)
      
      if (result.message === 'Profile updated successfully') {
        setMessage('✅ Profile updated successfully!')
        
        // Update local user state
        const updatedUser = { ...user, name: profile.name, email: profile.email }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ ' + (result.message || 'Update failed'))
      }
    } catch (err) {
      setMessage('❌ Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <div className="section-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading profile...</div>
        ) : (
          <div className="profile-container">
            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <h2>{profile.name || 'User'}</h2>
              <p className="profile-email">{profile.email}</p>
            </div>
            
            <div className="profile-form">
              <h3>Personal Information</h3>
              {message && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  background: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
                  color: message.includes('✅') ? '#166534' : '#991b1b',
                  border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}`
                }}>
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={profile.name} 
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={profile.email} 
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={profile.phone} 
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={profile.address} 
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
                <div className="form-group">
                  <label>Driver's License Number</label>
                  <input 
                    type="text" 
                    name="driverLicense"
                    value={profile.driverLicense} 
                    onChange={handleChange}
                    placeholder="Enter license number"
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
