import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL
});

export const useAuthorizedApi = () => {
  const { token } = useAuth();

  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

