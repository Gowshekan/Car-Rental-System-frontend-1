const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  // Cars
  getCars: async () => {
    const res = await fetch(`${API_URL}/api/cars`);
    return res.json();
  },

  getCar: async (id) => {
    const res = await fetch(`${API_URL}/api/cars/${id}`);
    return res.json();
  },

  addCar: async (carData) => {
    const res = await fetch(`${API_URL}/api/cars`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(carData)
    });
    return res.json();
  },

  updateCar: async (id, carData) => {
    const res = await fetch(`${API_URL}/api/cars/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(carData)
    });
    return res.json();
  },

  deleteCar: async (id) => {
    const res = await fetch(`${API_URL}/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  // Bookings
  getBookings: async () => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  getBooking: async (id) => {
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  createBooking: async (bookingData) => {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  updateBooking: async (id, status) => {
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  deleteBooking: async (id) => {
    const res = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  // Users
  getProfile: async () => {
    const res = await fetch(`${API_URL}/api/users/profile`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  updateProfile: async (profileData) => {
    const res = await fetch(`${API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  getAllUsers: async () => {
    const res = await fetch(`${API_URL}/api/users`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  deleteUser: async (id) => {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  }
};
