import api from './api';

export const createAppointment = async (payload) => {
  const { data } = await api.post('/appointments', payload);
  return data.data;
};

export const fetchAvailability = async (date) => {
  const { data } = await api.get('/appointments/availability', { params: { date } });
  return data;
};

export const fetchAppointments = async (params = {}) => {
  const { data } = await api.get('/appointments', { params });
  return data; // includes pagination meta
};

export const fetchMetrics = async () => {
  const { data } = await api.get('/appointments/metrics');
  return data.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const { data } = await api.patch(`/appointments/${id}/status`, { status });
  return data.data;
};
