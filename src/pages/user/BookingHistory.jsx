import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function BookingHistory({ user, setUser }) {
  const bookings = [
    { id: 1, car: 'Maruti Swift', startDate: '15 Jan 2024', endDate: '20 Jan 2024', status: 'Completed', total: 6000 },
    { id: 2, car: 'Hyundai Creta', startDate: '10 Feb 2024', endDate: '15 Feb 2024', status: 'Active', total: 12500 },
    { id: 3, car: 'Honda City', startDate: '01 Mar 2024', endDate: '05 Mar 2024', status: 'Upcoming', total: 9000 }
  ]

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <div className="section-header">
          <h1>My Bookings</h1>
          <p>View and manage your car rental bookings</p>
        </div>
        <div className="bookings-container">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.car}</h3>
                <span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span>
              </div>
              <div className="booking-details">
                <div className="detail-item">
                  <span className="label">Pick-up Date</span>
                  <span className="value">{booking.startDate}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Return Date</span>
                  <span className="value">{booking.endDate}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Amount</span>
                  <span className="value">₹{booking.total}</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-secondary">View Details</button>
                {booking.status === 'Upcoming' && <button className="btn-danger">Cancel Booking</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingHistory
