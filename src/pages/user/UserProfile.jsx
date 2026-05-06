import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function UserProfile({ user, setUser }) {
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await api.getProfile()
      setProfile(data)
    } catch (err) {
      console.error('Failed to load profile:', err)
      setProfile(user || {})
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Profile update feature coming soon!')
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
              <h2>{profile.name || user?.name || 'User'}</h2>
              <p className="profile-email">{profile.email || user?.email}</p>
            </div>
            
            <div className="profile-form">
              <h3>Personal Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={profile.name} placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue={profile.email} placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue={profile.phone} placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" defaultValue={profile.address} placeholder="Enter your address" />
                </div>
                <div className="form-group">
                  <label>Driver's License Number</label>
                  <input type="text" defaultValue={profile.driverLicense} placeholder="Enter license number" />
                </div>
                <button type="submit" className="btn-primary">Update Profile</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
