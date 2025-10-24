import React, { useState, useEffect, useContext } from "react";

// --- Íconos Inline SVG (Solución al error de compilación por dependencia externa) ---
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const LockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const SpinnerIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);

// --- MOCKS para hacer el componente ejecutable en un solo archivo ---
const useNavigate = () => (path) => {
  console.log(`Navegando a: ${path}`);
};

const AuthContext = React.createContext({
  isAuthenticated: false,
  // Simula un login exitoso después de 1 segundo
  login: async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (username === "test@rh.com" && password === "1234") {
      return { ok: true, message: "Éxito" };
    } else {
      return { ok: false, message: "Usuario o contraseña incorrectos." };
    }
  },
});

// 3. Componente principal
export default function LoginPage() {
  // Uso de useContext con el mock
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AutoGestiónRH - Login";
    // Nota: La navegación se simulará en la consola ya que el router no está presente.
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Ingresa tu usuario o correo.";
    if (!form.password) e.password = "Ingresa tu contraseña.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Limpia el error de campo al escribir (Mejora UX)
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    
    // Simulación del intento de login
    const res = await login(form.username.trim(), form.password);
    
    setLoading(false);
    
    if (res.ok) {
      navigate("/dashboard");
    } else {
      // Muestra error del servidor
      setServerError(res.message || "Ocurrió un error inesperado al iniciar sesión.");
    }
  };

  return (
    // Contenedor principal: Fondo más limpio y altura total
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
      
      {/* Tarjeta de Login: Mejorada con sombra más profunda y bordes curvos */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 transform transition-all hover:shadow-3xl">
        
        {/* Encabezado con branding mejorado */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-700 tracking-tight">
            AutoGestiónRH <span className="text-yellow-500">💼</span>
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Bienvenido de vuelta, ingresa para continuar</p>
        </div>

        {/* Mensaje de Error del Servidor (UX: siempre visible y destacado) */}
        {serverError && (
          <div 
            className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-6 border-l-4 border-red-400"
            role="alert"
          >
            <p className="font-medium">{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Usuario */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Usuario o Correo
            </label>
            {/* Input con Icono y Focus State Mejorado */}
            <div 
              className={`flex items-center bg-white border rounded-xl shadow-sm transition-all duration-300 ${
                errors.username ? 'border-red-400' : 'border-gray-200 focus-within:ring-3 focus-within:ring-green-400 focus-within:border-green-500'
              }`}
            >
              <span className="px-4 text-gray-400 text-lg">
                <UserIcon className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="ej. juan.perez@empresa.com"
                className="w-full py-3 pr-4 text-sm focus:outline-none bg-transparent"
                aria-invalid={!!errors.username}
                aria-describedby="username-error"
              />
            </div>
            {errors.username && (
              <p id="username-error" className="text-red-500 text-xs mt-1 font-medium">{errors.username}</p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña
            </label>
             {/* Input con Icono y Focus State Mejorado */}
            <div 
              className={`flex items-center bg-white border rounded-xl shadow-sm transition-all duration-300 ${
                errors.password ? 'border-red-400' : 'border-gray-200 focus-within:ring-3 focus-within:ring-green-400 focus-within:border-green-500'
              }`}
            >
              <span className="px-4 text-gray-400 text-lg">
                <LockIcon className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                className="w-full py-3 pr-4 text-sm focus:outline-none bg-transparent"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Botón de Iniciar Sesión (CTA Mejorado) */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white text-lg font-bold rounded-xl shadow-lg transition duration-300 flex items-center justify-center space-x-2 
              ${loading
                ? "bg-green-400 cursor-not-allowed shadow-none"
                : "bg-green-600 hover:bg-green-700 hover:shadow-xl active:bg-green-800"
              }`}
          >
            {loading ? (
              <>
                <SpinnerIcon className="w-5 h-5" />
                <span>Validando...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>

          {/* Enlace de recuperación */}
          <div className="text-center pt-1">
            <button
              onClick={(ev) => ev.preventDefault()}
              className="text-gray-500 text-xs hover:text-green-600 transition duration-200 font-medium"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        {/* Footer */}
        <hr className="my-6 border-gray-100" />

        <div className="text-center space-y-1">
          <p className="text-gray-400 text-xs">
            © 2025 Comfachocó - Chocó
          </p>
          <div className="text-center text-[10px] text-gray-400 font-light">
            Equipo - Coders: Karina, Duvan, Valery, Gustavo
          </div>
        </div>
      </div>
    </div>
  );
}
