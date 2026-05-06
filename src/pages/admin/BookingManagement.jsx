import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function BookingManagement({ user, setUser }) {
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

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.updateBooking(bookingId, newStatus)
      alert(`✅ Booking status updated to ${newStatus}`)
      loadBookings()
    } catch (err) {
      alert('❌ Failed to update booking status')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Booking Management</h1>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px', background: '#f7fafc', borderRadius: '15px'}}>
            <h3>No bookings yet</h3>
            <p style={{color: '#718096'}}>Bookings will appear here once customers start renting cars</p>
          </div>
        ) : (
          <div className="dashboard-section">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Location</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.User?.name || 'N/A'}</td>
                      <td>{booking.Car?.name || 'N/A'}</td>
                      <td>{formatDate(booking.startDate)}</td>
                      <td>{formatDate(booking.endDate)}</td>
                      <td>{booking.pickupLocation}</td>
                      <td>₹{booking.totalAmount}</td>
                      <td>
                        <select 
                          className={`badge ${booking.status.toLowerCase()}`}
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon"
                            title="View Details"
                            onClick={() => alert(`Booking Details:\n\nCustomer: ${booking.User?.name}\nEmail: ${booking.User?.email}\nCar: ${booking.Car?.name}\nAmount: ₹${booking.totalAmount}`)}
                          >
                            👁️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingManagement
