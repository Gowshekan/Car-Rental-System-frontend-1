import { useNavigate, Link } from 'react-router-dom'
import '../../styles/navbar.css'

function UserNavbar({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="user-brand">
        <img src="/logo.svg" alt="Car Rental Logo" className="brand-logo" />
        <h1>Car Rental</h1>
      </div>
      <div className="nav-links">
        <Link to="/user/dashboard">Home</Link>
        <Link to="/user/cars">Browse Cars</Link>
        <Link to="/user/bookings">My Bookings</Link>
        <Link to="/user/profile">Profile</Link>
      </div>
      <div className="nav-actions">
        <span>Hi, {user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default UserNavbar
