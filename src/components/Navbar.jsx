import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={isAdmin ? '/admin/dashboard' : '/user/dashboard'} className="nav-brand">
          <img src="/logo.svg" alt="DriveNow Logo" className="brand-logo" />
          <span>DriveNow</span>
        </Link>
        <div className="nav-links">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/fleet">Fleet</Link>
              <Link to="/admin/bookings">Bookings</Link>
              <Link to="/admin/customers">Customers</Link>
              <Link to="/admin/reports">Reports</Link>
            </>
          ) : (
            <>
              <Link to="/user/dashboard">Home</Link>
              <Link to="/user/cars">Browse Cars</Link>
              <Link to="/user/bookings">My Bookings</Link>
              <Link to="/user/profile">Profile</Link>
            </>
          )}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
