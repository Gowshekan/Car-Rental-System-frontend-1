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

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      await api.updateBooking(bookingId, 'Cancelled')
      alert('✅ Booking cancelled successfully!')
      loadBookings() // Reload bookings
    } catch (err) {
      alert('❌ Failed to cancel booking. Please try again.')
    }
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
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
          <div style={{textAlign: 'center', padding: '50px', fontSize: '18px'}}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{
            textAlign: 'center', 
            padding: '80px 20px',
            background: '#f7fafc',
            borderRadius: '15px',
            margin: '20px 0'
          }}>
            <div style={{fontSize: '60px', marginBottom: '20px'}}>🚗</div>
            <h3 style={{color: '#2d3748', marginBottom: '10px'}}>No bookings yet</h3>
            <p style={{color: '#718096'}}>Start booking cars to see your rental history here!</p>
          </div>
        ) : (
          <div className="bookings-container">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>{booking.Car?.name || 'Car'}</h3>
                    <p style={{color: '#718096', fontSize: '14px', marginTop: '5px'}}>
                      {booking.Car?.type} • {booking.pickupLocation}
                    </p>
                  </div>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="booking-details">
                  <div className="detail-item">
                    <span className="label">📅 Pick-up Date</span>
                    <span className="value">{formatDate(booking.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">📅 Return Date</span>
                    <span className="value">{formatDate(booking.endDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">💰 Total Amount</span>
                    <span className="value" style={{fontWeight: '700', color: '#ff4d30'}}>
                      ₹{booking.totalAmount}
                    </span>
                  </div>
                </div>
                <div className="booking-actions">
                  {booking.status === 'Pending' && (
                    <button 
                      className="btn-danger" 
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  {booking.status === 'Cancelled' && (
                    <span style={{color: '#718096', fontSize: '14px'}}>
                      This booking was cancelled
                    </span>
                  )}
                  {booking.status === 'Completed' && (
                    <span style={{color: '#059669', fontSize: '14px'}}>
                      ✅ Trip completed
                    </span>
                  )}
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
