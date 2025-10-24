import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setAuthToken, loginRequest } from "../Services/api";

const AuthContext = createContext();

const LOCAL_TOKEN_KEY = "autogestionrh_token";
const LOCAL_USER_KEY = "autogestionrh_user";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const validateToken = (token) => {
    if (!token) return false;
    try {
      const payload = jwtDecode(token);
      // exp en segundos desde epoch
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    // On mount, check localStorage
    const token = localStorage.getItem(LOCAL_TOKEN_KEY);
    const userStr = localStorage.getItem(LOCAL_USER_KEY);
    if (token && validateToken(token)) {
      setAuthToken(token);
      setIsAuthenticated(true);
      try {
        setUser(userStr ? JSON.parse(userStr) : null);
      } catch {
        setUser(null);
      }
    } else {
      // limpiar si inválido
      localStorage.removeItem(LOCAL_TOKEN_KEY);
      localStorage.removeItem(LOCAL_USER_KEY);
      setAuthToken(null);
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (usernameOrEmail, password) => {
    // retorna { ok: boolean, message?: string }
    try {
      const res = await loginRequest(usernameOrEmail, password);
      // Asumimos que la respuesta incluye { token: "...", user: {...} }
      if (res?.data?.token) {
        const token = res.data.token;
        const userData = res.data.user || res.data.usuario || null;

        // almacenar
        localStorage.setItem(LOCAL_TOKEN_KEY, token);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userData));

        // set auth header
        setAuthToken(token);

        setIsAuthenticated(true);
        setUser(userData);
        return { ok: true };
      } else {
        return { ok: false, message: "Usuario o contraseña no validos." };
      }
    } catch (error) {
      // Manejo de errores: backend puede devolver 401 con mensaje
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Usuario o contraseña incorrectos.";
      return { ok: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    localStorage.removeItem(LOCAL_USER_KEY);
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
