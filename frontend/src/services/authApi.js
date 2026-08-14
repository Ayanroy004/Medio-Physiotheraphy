import api from './api';

export const loginRequest = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  console.log('loginRequest response data:', data); // Debugging line
  return data;
};

export const logoutRequest = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};
