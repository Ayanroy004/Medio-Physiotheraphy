import api from './api';

export const fetchTestimonials = async (featuredOnly = false) => {
  const { data } = await api.get('/testimonials', {
    params: featuredOnly ? { featured: 'true' } : {},
  });
  return data.data;
};
