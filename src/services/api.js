import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5006/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// Notes APIs
export const notesAPI = {
  processAudio: (formData, onUploadProgress) => 
    api.post('/notes/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    }),
  getNotes: (params) => api.get('/notes', { params }),
  getNote: (id) => api.get(`/notes/${id}`),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
  searchNotes: (query, category) => api.get('/notes/search/query', { params: { q: query, category } }),
};

// Tasks APIs
export const tasksAPI = {
  getTasks: (params) => api.get('/tasks', { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getUpcomingTasks: () => api.get('/tasks/calendar/upcoming'),
  getProgressStats: () => api.get('/tasks/stats/progress'),
};

// Chat APIs
export const chatAPI = {
  sendMessage: (message) => api.post('/chat/message', { message }),
  getChatHistory: () => api.get('/chat/history'),
  clearHistory: () => api.delete('/chat/history'),
};

export default api;

