import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import '../../styles/admin.css'

function FleetManagement({ user, setUser }) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Hatchback',
    price: '',
    seats: '',
    transmission: 'Manual',
    image: '',
    plateNumber: '',
    status: 'Available'
  })

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const data = await api.getCars()
      setVehicles(data)
    } catch (err) {
      console.error('Failed to load vehicles:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingCar(null)
    setFormData({
      name: '',
      type: 'Hatchback',
      price: '',
      seats: '',
      transmission: 'Manual',
      image: '',
      plateNumber: '',
      status: 'Available'
    })
    setShowModal(true)
  }

  const handleEdit = (car) => {
    setEditingCar(car)
    setFormData({
      name: car.name,
      type: car.type,
      price: car.price,
      seats: car.seats,
      transmission: car.transmission,
      image: car.image,
      plateNumber: car.plateNumber,
      status: car.status
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return

    try {
      await api.deleteCar(id)
      alert('✅ Vehicle deleted successfully!')
      loadVehicles()
    } catch (err) {
      alert('❌ Failed to delete vehicle')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingCar) {
        await api.updateCar(editingCar.id, formData)
        alert('✅ Vehicle updated successfully!')
      } else {
        await api.addCar(formData)
        alert('✅ Vehicle added successfully!')
      }
      setShowModal(false)
      loadVehicles()
    } catch (err) {
      alert('❌ Operation failed. Please try again.')
    }
  }

  return (
    <div className="admin-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="admin-content">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <h1>Fleet Management</h1>
          <button className="add-btn" onClick={handleAddNew}>+ Add New Vehicle</button>
        </div>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading vehicles...</div>
        ) : (
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
                      <td>{vehicle.plateNumber}</td>
                      <td>₹{vehicle.price}</td>
                      <td><span className={`badge ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" onClick={() => handleEdit(vehicle)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => handleDelete(vehicle.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px'}}>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              <h2>{editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
              
              <form onSubmit={handleSubmit} style={{marginTop: '20px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div className="form-group">
                    <label>Vehicle Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Hatchback</option>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price/Day (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Seats</label>
                    <input
                      type="number"
                      value={formData.seats}
                      onChange={(e) => setFormData({...formData, seats: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Transmission</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                    >
                      <option>Manual</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Plate Number</label>
                    <input
                      type="text"
                      value={formData.plateNumber}
                      onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group" style={{marginTop: '15px'}}>
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>Available</option>
                    <option>Rented</option>
                    <option>Maintenance</option>
                  </select>
                </div>
                <button type="submit" className="btn-book" style={{marginTop: '20px', width: '100%'}}>
                  {editingCar ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FleetManagement
