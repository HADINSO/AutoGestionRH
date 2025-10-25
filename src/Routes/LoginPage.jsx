import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { logo } from "../assets/Img";

// --- Íconos SVG --- //
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SpinnerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default function LoginPage() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Redirigir si el usuario ya está autenticado
  useEffect(() => {
    document.title = "AutoGestiónRH - Iniciar Sesión";
    if (isAuthenticated) navigate("/inicio");
    inputRef.current?.focus();
  }, [isAuthenticated, navigate]);

  // 🔹 Validación del formulario
  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Campo requerido.";
    if (!form.password) e.password = "Campo requerido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // 🔹 Manejar cambios de inputs
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerError("");
  };

  // 🔹 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const res = await login(form.username, form.password);
    setLoading(false);

    if (res.ok) {
      navigate("/inicio");
    } else {
      setServerError(res.message || "Error al iniciar sesión.");
      // Limpia error después de 5s
      setTimeout(() => setServerError(""), 5000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white p-6 font-sans">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/20 p-10 transition-all duration-300 hover:shadow-green-200/50">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-green-600 flex items-center justify-center shadow-md">
              <img
                src={logo}
                alt="Logo Comfachocó"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-green-700">
            AutoGestión<span className="text-yellow-500">RH</span>
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Por favor, ingresa tus datos para continuar
          </p>
        </div>


        {/* --- Error del servidor --- */}
        {serverError && (
          <div
            className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-6 animate-fadeIn"
            role="alert"
          >
            {serverError}
          </div>
        )}

        {/* --- Formulario --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo usuario */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Usuario o Correo
            </label>
            <div
              className={`flex items-center border rounded-xl px-3 py-2 transition-all ${errors.username
                ? "border-red-400 ring-1 ring-red-300"
                : "border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                }`}
            >
              <UserIcon className="text-gray-400 mr-3" />
              <input
                ref={inputRef}
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="ej. juan.perez@empresa.com"
                className="w-full text-sm bg-transparent outline-none"
                aria-invalid={!!errors.username}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <div
              className={`flex items-center border rounded-xl px-3 py-2 transition-all ${errors.password
                ? "border-red-400 ring-1 ring-red-300"
                : "border-gray-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200"
                }`}
            >
              <LockIcon className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full text-sm bg-transparent outline-none"
                aria-invalid={!!errors.password}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 mt-4 font-bold rounded-xl text-white transition-all ${loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg hover:shadow-green-300/30"
              }`}
          >
            {loading ? (
              <>
                <SpinnerIcon /> Validando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          {/* Recuperar contraseña */}
          <div className="text-center">
            <button
              onClick={(e) => e.preventDefault()}
              className="text-xs text-gray-500 hover:text-green-600 mt-2 transition-all"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        {/* --- Footer --- */}
        <hr className="my-8 border-gray-200" />
        <div className="text-center text-gray-400 text-xs">
          © 2025 Comfachocó · Desarrollado por{" "}
          <span className="text-green-600 font-medium">Equipo Coders</span>
        </div>
      </div>
    </div>
  );
}
