// import api from './api';

// export const authService = {
//   register: async (userData) => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   },

//   login: async (credentials) => {
//     const response = await api.post('/auth/login', credentials);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },

//   getCurrentUser: () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem('token');
//   }
// };