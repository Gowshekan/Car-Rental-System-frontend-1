import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function FleetManagement({ user, setUser }) {
  const vehicles = [
    { id: 1, name: 'Maruti Swift', type: 'Hatchback', status: 'Available', price: 1200, plate: 'MH-01-AB-1234' },
    { id: 2, name: 'Hyundai Creta', type: 'SUV', status: 'Rented', price: 2500, plate: 'DL-02-CD-5678' },
    { id: 3, name: 'Honda City', type: 'Sedan', status: 'Available', price: 1800, plate: 'KA-03-EF-9012' },
    { id: 4, name: 'Mahindra Thar', type: 'SUV', status: 'Maintenance', price: 3000, plate: 'MH-04-GH-3456' }
  ]

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <h1>Fleet Management</h1>
        <button className="add-btn">+ Add New Vehicle</button>
        
        <div className="dashboard-section">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Plate Number</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => (
                  <tr key={vehicle.id}>
                    <td>#{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.plate}</td>
                    <td>₹{vehicle.price}</td>
                    <td><span className={`badge ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon">✏️</button>
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

export default FleetManagement
