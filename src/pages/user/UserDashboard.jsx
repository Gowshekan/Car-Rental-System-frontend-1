import { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import Navbar from '../../components/Navbar'
import BookingModal from '../../components/BookingModal'
import '../../styles/user.css'

function UserDashboard({ user, setUser }) {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadCars()
  }, [])

  const loadCars = async () => {
    try {
      const data = await api.getCars()
      setFeaturedCars(data.slice(0, 4))
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

  return (
    <div className="user-layout">
      <Navbar user={user} setUser={setUser} />
      
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>India's Best Car Rental</h1>
          <p>Book premium cars at affordable prices across India</p>
          <div className="search-container">
            <div className="search-box">
              <div className="search-item">
                <label>📍 City</label>
                <input type="text" placeholder="Mumbai, Delhi, Bangalore..." />
              </div>
              <div className="search-item">
                <label>📅 Pick-up Date</label>
                <input type="date" />
              </div>
              <div className="search-item">
                <label>📅 Return Date</label>
                <input type="date" />
              </div>
              <button className="search-btn">Search Cars</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="section-header">
          <h2>Featured Vehicles</h2>
          <p>Choose from our premium selection of vehicles</p>
        </div>
        
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px'}}>Loading cars...</div>
        ) : (
          <div className="car-grid">
            {featuredCars.map(car => (
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

        <div className="why-choose-section">
          <div className="section-header centered">
            <h2>Why Choose Us</h2>
            <p>India's most trusted car rental service</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Best Price Guarantee</h3>
              <p>Lowest prices across all major Indian cities</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h3>Full Insurance</h3>
              <p>Comprehensive insurance coverage included</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Instant Booking</h3>
              <p>Book in seconds with instant confirmation</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round the clock customer support in Hindi & English</p>
            </div>
          </div>
        </div>
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

export default UserDashboard
