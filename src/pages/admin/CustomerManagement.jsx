import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function CustomerManagement({ user, setUser }) {
  const customers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '+91 98765-43210', bookings: 5, joined: '15 Jun 2023' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@gmail.com', phone: '+91 98765-43211', bookings: 3, joined: '20 Aug 2023' },
    { id: 3, name: 'Amit Kumar', email: 'amit.kumar@gmail.com', phone: '+91 98765-43212', bookings: 7, joined: '10 May 2023' }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Customer Management</h1>
        
        <div className="dashboard-section">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Bookings</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>#{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.bookings}</td>
                    <td>{customer.joined}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon">👁️</button>
                        <button className="btn-icon delete">🗑️</button>
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

export default CustomerManagement
