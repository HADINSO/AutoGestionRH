// src/Services/api.js
import axios from "axios";

// URL base del backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Función para iniciar sesión
export const loginRequest = async (username, password) => {
  try {
    // Endpoint del backend PHP (según tu especificación)
    const response = await api.post(`/v1/auth/${username}/${password}`);
    return response; // 👈 OJO: Devuelve el objeto completo (no solo .data)
  } catch (error) {
    console.error("Error en loginRequest:", error);
    throw error;
  }
};

// 🔹 Función para establecer el token de autenticación en los headers de Axios
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// 🔹 Exportar instancia genérica de API
export default api;
