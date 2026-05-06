import { useState } from 'react'
import '../styles/modal.css'

function BookingModal({ car, onClose, onBook }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  const totalAmount = calculateDays() * car.price

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (calculateDays() <= 0) {
      setError('End date must be after start date')
      return
    }

    setLoading(true)
    try {
      await onBook({
        carId: car.id,
        startDate,
        endDate,
        pickupLocation,
        totalAmount
      })
      onClose()
      alert('Booking successful! Check your booking history.')
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Book {car.name}</h2>
          <p className="car-type">{car.type} • {car.transmission} • {car.seats} Seats</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              placeholder="Enter city (Mumbai, Delhi, Bangalore...)"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="booking-summary">
            <div className="summary-row">
              <span>Price per day:</span>
              <span>₹{car.price}</span>
            </div>
            <div className="summary-row">
              <span>Number of days:</span>
              <span>{calculateDays()}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button type="submit" className="btn-book" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingModal
