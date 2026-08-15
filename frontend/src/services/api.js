import axios from "axios";

console.log("Production API URL:", import.meta.env.VITE_API_URL);
const api = axios.create({
  // baseURL: "https://medio-physiotheraphy.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach JWT (fallback for environments without cookie support)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vitality_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize error messages so components can just read err.message
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);

export default api;
