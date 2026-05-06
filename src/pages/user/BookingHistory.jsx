import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function BookingHistory({ user, setUser }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const data = await api.getBookings()
      setBookings(data)
    } catch (err) {
      console.error('Failed to load bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <div className="section-header">
          <h1>My Bookings</h1>
          <p>View and manage your car rental bookings</p>
        </div>
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px'}}>No bookings yet. Start booking cars!</div>
        ) : (
          <div className="bookings-container">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.Car?.name || 'Car'}</h3>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span>
                </div>
                <div className="booking-details">
                  <div className="detail-item">
                    <span className="label">Pick-up Date</span>
                    <span className="value">{formatDate(booking.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Return Date</span>
                    <span className="value">{formatDate(booking.endDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total Amount</span>
                    <span className="value">₹{booking.totalAmount}</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <button className="btn-secondary">View Details</button>
                  {booking.status === 'Pending' && <button className="btn-danger">Cancel Booking</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistory
