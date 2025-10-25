import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import Sidebar from "./Routes/Layout/Sidebar";
import Navbar from "./Routes/Layout/Navbar";
import PaginaInicio from "./Routes/Dashboard/pagina_inicio";
import Calendar from "./Routes/Calendar/calendario_compartido";
import PanelReportes from "./Routes/Reports/panel_reportes";
import EncuestasBienestar from "./Routes/Wellness/encuestas_bienestar";
import PerfilEmpleado from "./Routes/Profile/perfil_empleado";
import GestionSolicitudes from "./Routes/Requests/gestion_solicitudes";
import AyudaSoporte from "./Routes/Support/ayuda_soporte";

function AppContent() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      {isAuthenticated && (
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      )}

      <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
        {/* Navbar con datos desde el contexto */}
        {isAuthenticated && (
          <Navbar
            user={user}
            notifications={2}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<Navigate to="/inicio" />} />

            <Route
              path="/inicio"
              element={
                <ProtectedRoute>
                  <PaginaInicio />
                </ProtectedRoute>
              }
            />

            <Route
              path="/calendario"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reportes"
              element={
                <ProtectedRoute>
                  <PanelReportes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/bienestar"
              element={
                <ProtectedRoute>
                  <EncuestasBienestar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/empleado"
              element={
                <ProtectedRoute>
                  <PerfilEmpleado />
                </ProtectedRoute>
              }
            />

            <Route
              path="/solicitudes"
              element={
                <ProtectedRoute>
                  <GestionSolicitudes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/soporte"
              element={
                <ProtectedRoute>
                  <AyudaSoporte />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
