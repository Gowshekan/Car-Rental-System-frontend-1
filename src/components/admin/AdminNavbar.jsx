import { useNavigate, Link } from 'react-router-dom'
import '../../styles/navbar.css'

function AdminNavbar({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="admin-brand">
        <img src="/logo.svg" alt="Car Rental Logo" className="brand-logo" />
        <h1>Admin Panel</h1>
      </div>
      <div className="nav-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/fleet">Fleet</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/customers">Customers</Link>
        <Link to="/admin/reports">Reports</Link>
      </div>
      <div className="nav-actions">
        <span>Admin: {user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default AdminNavbar
