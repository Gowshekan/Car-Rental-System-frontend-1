import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function CustomerManagement({ user, setUser }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      const data = await api.getAllUsers()
      setCustomers(data.filter(u => u.role === 'user'))
    } catch (err) {
      console.error('Failed to load customers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return

    try {
      await api.deleteUser(id)
      alert('✅ Customer deleted successfully!')
      loadCustomers()
    } catch (err) {
      alert('❌ Failed to delete customer')
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
        <h1>Customer Management</h1>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading customers...</div>
        ) : customers.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px', background: '#f7fafc', borderRadius: '15px'}}>
            <h3>No customers yet</h3>
            <p style={{color: '#718096'}}>Customers will appear here once they register</p>
          </div>
        ) : (
          <div className="dashboard-section">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
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
                      <td>{customer.phone || 'N/A'}</td>
                      <td>{formatDate(customer.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon"
                            onClick={() => alert(`Customer Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone || 'N/A'}\nAddress: ${customer.address || 'N/A'}\nLicense: ${customer.driverLicense || 'N/A'}`)}
                          >
                            👁️
                          </button>
                          <button 
                            className="btn-icon delete" 
                            onClick={() => handleDelete(customer.id)}
                          >
                            🗑️
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

export default CustomerManagement
