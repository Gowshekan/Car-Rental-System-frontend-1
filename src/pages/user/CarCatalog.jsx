import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import BookingModal from '../../components/BookingModal'
import '../../styles/user.css'

function CarCatalog({ user, setUser }) {
  const [filter, setFilter] = useState('all')
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadCars()
  }, [])

  const loadCars = async () => {
    try {
      const data = await api.getCars()
      setCars(data)
    } catch (err) {
      console.error('Failed to load cars:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async (bookingData) => {
    await api.createBooking(bookingData)
  }

  const openBookingModal = (car) => {
    setSelectedCar(car)
    setShowModal(true)
  }

  const filteredCars = filter === 'all' ? cars : cars.filter(car => car.type.toLowerCase() === filter)

  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <div className="catalog-header">
          <h1>Browse Our Fleet</h1>
          <div className="filter-buttons">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All Cars</button>
            <button className={filter === 'hatchback' ? 'active' : ''} onClick={() => setFilter('hatchback')}>Hatchback</button>
            <button className={filter === 'sedan' ? 'active' : ''} onClick={() => setFilter('sedan')}>Sedan</button>
            <button className={filter === 'suv' ? 'active' : ''} onClick={() => setFilter('suv')}>SUV</button>
            <button className={filter === 'luxury' ? 'active' : ''} onClick={() => setFilter('luxury')}>Luxury</button>
          </div>
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '50px', fontSize: '18px'}}>Loading cars...</div>
        ) : (
          <div className="car-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <div className="car-image-wrapper">
                  <img src={car.image} alt={car.name} className="car-image" />
                  <span className="car-badge">{car.type}</span>
                </div>
                <div className="car-details">
                  <h3>{car.name}</h3>
                  <div className="car-rating">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <span className="rating-value">{car.rating}</span>
                  </div>
                  <div className="car-features">
                    <div className="feature-item">
                      <span className="icon">👥</span>
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="feature-item">
                      <span className="icon">⚙️</span>
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                  <div className="car-footer">
                    <div className="price-section">
                      <span className="price">₹{car.price}</span>
                      <span className="period">/day</span>
                    </div>
                    <button className="rent-btn" onClick={() => openBookingModal(car)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showModal && selectedCar && (
        <BookingModal
          car={selectedCar}
          onClose={() => setShowModal(false)}
          onBook={handleBooking}
        />
      )}
    </div>
  )
}

export default CarCatalog
