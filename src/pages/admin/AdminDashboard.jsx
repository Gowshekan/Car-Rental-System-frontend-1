import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function AdminDashboard({ user, setUser }) {
  const stats = [
    { title: 'Total Vehicles', value: '52', icon: '🚗', color: '#2563eb' },
    { title: 'Active Bookings', value: '28', icon: '📋', color: '#10b981' },
    { title: 'Total Customers', value: '245', icon: '👥', color: '#f59e0b' },
    { title: 'Revenue', value: '₹4,52,300', icon: '💰', color: '#8b5cf6' }
  ]

  const recentBookings = [
    { id: 1, customer: 'Rahul Sharma', car: 'Maruti Swift', date: '15 Jan 2024', status: 'Active' },
    { id: 2, customer: 'Priya Patel', car: 'Hyundai Creta', date: '14 Jan 2024', status: 'Completed' },
    { id: 3, customer: 'Amit Kumar', car: 'Honda City', date: '13 Jan 2024', status: 'Active' }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Dashboard Overview</h1>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
              <div className="stat-icon" style={{ background: `${stat.color}20` }}>{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <h2>Recent Bookings</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>{booking.date}</td>
                    <td><span className={`badge ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
