import api from "./api";

/*
|--------------------------------------------------------------------------
| Get all services
|--------------------------------------------------------------------------
*/
export const fetchServices = async (params = {}) => {
  const { data } = await api.get("/services", {
    params,
  });

  return data.data;
};

/*
|--------------------------------------------------------------------------
| Get single service by ID or slug
|--------------------------------------------------------------------------
*/
export const fetchServiceByIdOrSlug = async (idOrSlug) => {
  const { data } = await api.get(`/services/${idOrSlug}`);

  return data.data;
};

/*
|--------------------------------------------------------------------------
| Create service
|--------------------------------------------------------------------------
*/
export const createService = async (payload) => {
  const { data } = await api.post("/services", payload);

  return data.data;
};

/*
|--------------------------------------------------------------------------
| Update service
|--------------------------------------------------------------------------
*/
export const updateService = async (id, payload) => {
  const { data } = await api.put(`/services/${id}`, payload);

  return data.data;
};

/*
|--------------------------------------------------------------------------
| Delete service
|--------------------------------------------------------------------------
*/
export const deleteService = async (id) => {
  const { data } = await api.delete(`/services/${id}`);

  return data;
};