import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function UserProfile({ user, setUser }) {
  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <div className="section-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-avatar">👤</div>
            <h2>{user?.name || 'User'}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
          
          <div className="profile-form">
            <h3>Personal Information</h3>
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue={user?.name} placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue={user?.email} placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Enter your address" />
              </div>
              <div className="form-group">
                <label>Driver's License Number</label>
                <input type="text" placeholder="Enter license number" />
              </div>
              <button type="submit" className="btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
