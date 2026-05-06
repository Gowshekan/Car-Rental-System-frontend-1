import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import CarCatalog from './pages/user/CarCatalog'
import BookingHistory from './pages/user/BookingHistory'
import AdminDashboard from './pages/admin/AdminDashboard'
import FleetManagement from './pages/admin/FleetManagement'
import BookingManagement from './pages/admin/BookingManagement'
import CustomerManagement from './pages/admin/CustomerManagement'
import Reports from './pages/admin/Reports'

function App() {
  const [user, setUser] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={user?.role === 'user' ? <UserDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/user/profile" element={user?.role === 'user' ? <UserProfile user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/user/cars" element={user?.role === 'user' ? <CarCatalog user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/user/bookings" element={user?.role === 'user' ? <BookingHistory user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin/dashboard" element={user?.role === 'admin' ? <AdminDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin/fleet" element={user?.role === 'admin' ? <FleetManagement user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin/bookings" element={user?.role === 'admin' ? <BookingManagement user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin/customers" element={user?.role === 'admin' ? <CustomerManagement user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/admin/reports" element={user?.role === 'admin' ? <Reports user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
