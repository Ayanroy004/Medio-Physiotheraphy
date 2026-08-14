import api from "./api";

export const fetchTestimonials = async () => {
  const { data } = await api.get("/reviews");

  return data?.data || [];
};
