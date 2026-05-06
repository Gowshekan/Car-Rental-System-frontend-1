import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function BookingManagement({ user, setUser }) {
  const bookings = [
    { id: 1, customer: 'Rahul Sharma', car: 'Maruti Swift', startDate: '15 Jan 2024', endDate: '20 Jan 2024', status: 'Active', total: 6000 },
    { id: 2, customer: 'Priya Patel', car: 'Hyundai Creta', startDate: '14 Jan 2024', endDate: '19 Jan 2024', status: 'Completed', total: 12500 },
    { id: 3, customer: 'Amit Kumar', car: 'Honda City', startDate: '16 Jan 2024', endDate: '21 Jan 2024', status: 'Pending', total: 9000 }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Booking Management</h1>
        
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
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>{booking.startDate}</td>
                    <td>{booking.endDate}</td>
                    <td>₹{booking.total}</td>
                    <td><span className={`badge ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon">👁️</button>
                        <button className="btn-icon">✏️</button>
                      </div>
                    </td>
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

export default BookingManagement
