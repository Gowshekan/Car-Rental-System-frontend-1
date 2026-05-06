import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function UserDashboard({ user, setUser }) {
  const featuredCars = [
    { id: 1, name: 'Maruti Swift', type: 'Hatchback', price: 1200, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', rating: 4.8, seats: 5, transmission: 'Manual' },
    { id: 2, name: 'Hyundai Creta', type: 'SUV', price: 2500, image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', rating: 4.9, seats: 5, transmission: 'Auto' },
    { id: 3, name: 'Honda City', type: 'Sedan', price: 1800, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', rating: 4.7, seats: 5, transmission: 'Auto' },
    { id: 4, name: 'Mahindra Thar', type: 'SUV', price: 3000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', rating: 4.9, seats: 4, transmission: 'Manual' }
  ]

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
                  <button className="rent-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </div>
  )
}

export default UserDashboard
