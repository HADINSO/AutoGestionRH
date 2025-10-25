import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart3,
  User,
  HeartHandshake,
  HelpCircle,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logo } from "../../assets/Img";


const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: LayoutDashboard, path: '/inicio' },
    { id: 'solicitudes', label: 'Mis Solicitudes', icon: FileText, path: '/solicitudes' },
    { id: 'calendario', label: 'Calendario', icon: Calendar, path: '/calendario' },
    { id: 'reportes', label: 'Informes', icon: BarChart3, path: '/reportes' },
    { id: 'bienestar', label: 'Bienestar', icon: HeartHandshake, path: '/bienestar' },
    { id: 'empleado', label: 'Mi perfil', icon: User, path: '/empleado' },
    { id: 'soporte', label: 'Ayuda', icon: HelpCircle, path: '/soporte' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // cerrar en móvil
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay en móvil */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } lg:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        // Usamos transform translate-x para ocultar/mostrar en todas las pantallas.
        // En desktop lo ponemos relative para que forme parte del flujo y el main se empuje.
        className={`
          fixed lg:relative z-40 w-64 h-full bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}

      >
        {/* Botón cerrar (solo visible en pantallas pequeñas) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 lg:hidden z-10"
          aria-label="Cerrar menú"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <nav className="p-4 pt-6 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-left
                  ${isActive ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mx-4 my-4 border-t border-gray-200"></div>

        <div className="px-4 pb-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">💡 ¿Necesitas ayuda?</h4>
            <p className="text-xs text-gray-600 mb-3">Visita nuestra sección de soporte para resolver tus dudas</p>
            <button
              onClick={() => handleNavigation('/soporte')}
              className="w-full bg-white text-blue-600 text-xs font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Ir a Soporte
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-center mb-2">

            <img src={logo} alt="Logo Comfachocó" width={90} />

          </div>
          <p className="text-xs text-gray-600 text-center font-medium">Comfachocó</p>
          <p className="text-xs text-gray-500 text-center mt-1">© 2025 Portal de Gestión</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
