import axios from 'axios';

// Base URL for your backend
const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const fetchContacts = () => API.get('/contacts');
export const addContact = (data) => API.post('/contacts', data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

export default API;
