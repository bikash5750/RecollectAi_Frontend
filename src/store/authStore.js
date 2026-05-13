import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData, token) => {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', JSON.stringify(userData));
    set({
      user: userData,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateUser: (userData) => {
    localStorage.setItem('auth-user', JSON.stringify(userData));
    set({ user: userData });
  },

  // Initialize from localStorage
  init: () => {
    const token = localStorage.getItem('auth-token');
    const userStr = localStorage.getItem('auth-user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token, isAuthenticated: true });
      } catch (e) {
        console.error('Failed to parse stored user data');
      }
    }
  },
}));

