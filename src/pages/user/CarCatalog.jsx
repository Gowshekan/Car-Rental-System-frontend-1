import { useState } from 'react'
import Navbar from '../../components/Navbar'
import '../../styles/user.css'

function CarCatalog({ user, setUser }) {
  const [filter, setFilter] = useState('all')
  
  const cars = [
    { id: 1, name: 'Maruti Swift', type: 'Hatchback', price: 1200, seats: 5, transmission: 'Manual', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', rating: 4.8 },
    { id: 2, name: 'Hyundai i20', type: 'Hatchback', price: 1400, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', rating: 4.7 },
    { id: 3, name: 'Honda City', type: 'Sedan', price: 1800, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', rating: 4.7 },
    { id: 4, name: 'Hyundai Verna', type: 'Sedan', price: 2000, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', rating: 4.8 },
    { id: 5, name: 'Hyundai Creta', type: 'SUV', price: 2500, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', rating: 4.9 },
    { id: 6, name: 'Mahindra Thar', type: 'SUV', price: 3000, seats: 4, transmission: 'Manual', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', rating: 4.9 },
    { id: 7, name: 'Kia Seltos', type: 'SUV', price: 2800, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', rating: 4.8 },
    { id: 8, name: 'Toyota Fortuner', type: 'Luxury', price: 4500, seats: 7, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', rating: 5.0 },
    { id: 9, name: 'Mercedes E-Class', type: 'Luxury', price: 8000, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', rating: 5.0 }
  ]

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
                  <button className="rent-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarCatalog
