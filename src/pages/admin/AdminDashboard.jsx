import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function AdminDashboard({ user, setUser }) {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeBookings: 0,
    totalCustomers: 0,
    revenue: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [cars, bookings, users] = await Promise.all([
        api.getCars(),
        api.getBookings(),
        api.getAllUsers()
      ])

      const activeBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed')
      const totalRevenue = bookings
        .filter(b => b.status === 'Completed')
        .reduce((sum, b) => sum + b.totalAmount, 0)

      setStats({
        totalVehicles: cars.length,
        activeBookings: activeBookings.length,
        totalCustomers: users.filter(u => u.role === 'user').length,
        revenue: totalRevenue
      })

      setRecentBookings(bookings.slice(0, 5))
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const statsConfig = [
    { title: 'Total Vehicles', key: 'totalVehicles', icon: '🚗', color: '#2563eb' },
    { title: 'Active Bookings', key: 'activeBookings', icon: '📋', color: '#10b981' },
    { title: 'Total Customers', key: 'totalCustomers', icon: '👥', color: '#f59e0b' },
    { title: 'Revenue', key: 'revenue', icon: '💰', color: '#8b5cf6', isRevenue: true }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Dashboard Overview</h1>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading dashboard...</div>
        ) : (
          <>
            <div className="stats-grid">
              {statsConfig.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                  <div className="stat-icon" style={{ background: `${stat.color}20` }}>{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.isRevenue ? `₹${stats[stat.key].toLocaleString('en-IN')}` : stats[stat.key]}</h3>
                    <p>{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-section">
              <h2>Recent Bookings</h2>
              {recentBookings.length === 0 ? (
                <div style={{textAlign: 'center', padding: '30px', background: '#f7fafc', borderRadius: '10px'}}>
                  <p style={{color: '#718096'}}>No bookings yet</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map(booking => (
                        <tr key={booking.id}>
                          <td>#{booking.id}</td>
                          <td>{booking.User?.name || 'N/A'}</td>
                          <td>{booking.Car?.name || 'N/A'}</td>
                          <td>{formatDate(booking.startDate)}</td>
                          <td>₹{booking.totalAmount}</td>
                          <td><span className={`badge ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
