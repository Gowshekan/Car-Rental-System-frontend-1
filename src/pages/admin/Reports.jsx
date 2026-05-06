import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function Reports({ user, setUser }) {
  const monthlyData = [
    { month: 'January', revenue: 125000, bookings: 45, customers: 38 },
    { month: 'February', revenue: 152000, bookings: 52, customers: 42 },
    { month: 'March', revenue: 189000, bookings: 61, customers: 51 }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Reports & Analytics</h1>
        
        <div className="dashboard-section">
          <h2>Monthly Performance</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Bookings</th>
                  <th>New Customers</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.month}</td>
                    <td>₹{data.revenue.toLocaleString('en-IN')}</td>
                    <td>{data.bookings}</td>
                    <td>{data.customers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="reports-grid">
          <div className="report-card">
            <h3>Top Performing Vehicles</h3>
            <div className="report-list">
              <div className="report-item">
                <span>Maruti Swift</span>
                <span className="report-value">28 bookings</span>
              </div>
              <div className="report-item">
                <span>Hyundai Creta</span>
                <span className="report-value">24 bookings</span>
              </div>
              <div className="report-item">
                <span>Honda City</span>
                <span className="report-value">21 bookings</span>
              </div>
            </div>
          </div>

          <div className="report-card">
            <h3>Revenue by Category</h3>
            <div className="report-list">
              <div className="report-item">
                <span>SUV</span>
                <span className="report-value">₹1,85,000</span>
              </div>
              <div className="report-item">
                <span>Sedan</span>
                <span className="report-value">₹1,52,000</span>
              </div>
              <div className="report-item">
                <span>Hatchback</span>
                <span className="report-value">₹1,29,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
