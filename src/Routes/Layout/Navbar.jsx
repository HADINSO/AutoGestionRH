import React, { useState, useRef, useEffect, useContext } from "react"; // 👈 se agregó useContext
import { Bell, User, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { logo } from "../../assets/Img";

const Navbar = ({ user, notifications = 0, onToggleSidebar, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => logout();

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate("/empleado");
  };

  const notificationsList = [
    {
      id: 1,
      titulo: "Solicitud aprobada",
      descripcion: "Tu solicitud de vacaciones ha sido aprobada",
      tiempo: "Hace 2 horas",
      leida: false,
    },
    {
      id: 2,
      titulo: "Nuevo mensaje",
      descripcion: "Tienes un mensaje de Recursos Humanos",
      tiempo: "Hace 5 horas",
      leida: false,
    },
    {
      id: 3,
      titulo: "Recordatorio",
      descripcion: "Completa tu encuesta de bienestar",
      tiempo: "Hace 1 día",
      leida: true,
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y toggle */}
          <div className="flex items-center">
            {/* 
            <button
              onClick={onToggleSidebar}
              className="mr-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
 */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/inicio")}
            >

                <img src={logo} alt="Logo Comfachocó" width={50}/>

              <span className="ml-3 text-xl font-semibold text-gray-800 hidden sm:block">
                Comfachocó Portal
              </span>
            </div>
          </div>

          {/* Usuario y Notificaciones */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notificaciones */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
                aria-label="Notificaciones"
              >
                <Bell size={24} className="text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {notifications > 9 ? "9+" : notifications}
                  </span>
                )}
              </button>

              {/* Dropdown de notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      Notificaciones
                    </h3>
                    {notifications > 0 && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        {notifications} nuevas
                      </span>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                    {notificationsList.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notif.leida ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notif.titulo}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {notif.descripcion}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notif.tiempo}
                            </p>
                          </div>
                          {!notif.leida && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menú usuario */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Menú de usuario"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.nombre_completo?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {user?.nombre_completo?.split(" ")[0] || "Usuario"}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-800">
                      {user?.nombre_completo || "Usuario"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {user?.rol || "Sin cargo"}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                    )}
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                    >
                      <User size={16} className="mr-3 text-gray-500" />
                      Mi Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
