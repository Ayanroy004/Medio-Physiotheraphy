import api from './api';

export const fetchServices = async (params = {}) => {
  const { data } = await api.get('/services', { params });
  return data.data;
};

export const fetchServiceByIdOrSlug = async (idOrSlug) => {
  const { data } = await api.get(`/services/${idOrSlug}`);
  return data.data;
};

export const createService = async (payload) => {
  const { data } = await api.post('/services', payload);
  return data.data;
};

export const updateService = async (id, payload) => {
  const { data } = await api.put(`/services/${id}`, payload);
  return data.data;
};

export const deleteService = async (id) => {
  const { data } = await api.delete(`/services/${id}`);
  return data;
};
