import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const PaginaInicio = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats] = useState({
    diasDisponibles: 12,
    solicitudesPendientes: 2,
    permisosAprobados: 5,
    proximasVacaciones: '15 días'
  });

  const [recentRequests] = useState([
    {
      id: 1,
      tipo: 'Vacaciones',
      fecha: '2025-11-10 - 2025-11-15',
      estado: 'pendiente',
      dias: 5
    },
    {
      id: 2,
      tipo: 'Permiso',
      fecha: '2025-10-28',
      estado: 'aprobada',
      dias: 1
    }
  ]);

  const getStatusColor = (estado) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      aprobada: 'bg-green-100 text-green-800',
      rechazada: 'bg-red-100 text-red-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (estado) => {
    const texts = {
      pendiente: 'Pendiente',
      aprobada: 'Aprobada',
      rechazada: 'Rechazada'
    };
    return texts[estado] || estado;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Encabezado de Bienvenida */}
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          ¡Hola, {user?.nombre_completo?.split(' ')[0] || 'Usuario'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Gestiona tus vacaciones y permisos de forma fácil y transparente.
        </p>
      </header>

      {/* Tarjetas de Estadísticas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            icon: <Calendar size={32} />,
            color: 'from-green-500 to-green-600',
            label: 'Días disponibles',
            value: stats.diasDisponibles
          },
          {
            icon: <Clock size={32} />,
            color: 'from-yellow-500 to-orange-500',
            label: 'Solicitudes pendientes',
            value: stats.solicitudesPendientes
          },
          {
            icon: <CheckCircle size={32} />,
            color: 'from-blue-500 to-blue-600',
            label: 'Permisos aprobados',
            value: stats.permisosAprobados
          },
          {
            icon: <TrendingUp size={32} />,
            color: 'from-purple-500 to-purple-600',
            label: 'Próximas vacaciones',
            value: stats.proximasVacaciones
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-lg p-6 text-white transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between mb-4">
              {item.icon}
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm font-semibold">
                2025
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{item.value}</h3>
            <p className="text-white/80 text-sm">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Acciones Rápidas y Solicitudes Recientes */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Acciones rápidas */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Acciones rápidas
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/solicitudes')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium">Nueva Solicitud</span>
              <Plus size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/calendario')}
              className="w-full border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium">Ver Calendario</span>
              <Calendar size={20} className="text-gray-400 group-hover:text-blue-500" />
            </button>

            <button
              onClick={() => navigate('/solicitudes')}
              className="w-full border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium">Mis Solicitudes</span>
              <FileText size={20} className="text-gray-400 group-hover:text-green-500" />
            </button>
          </div>
        </div>

        {/* Solicitudes recientes */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Solicitudes recientes</h2>
            <button
              onClick={() => navigate('/solicitudes')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              Ver todas
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div
                key={req.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FileText size={20} className="text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-800">{req.tipo}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.estado)}`}
                  >
                    {getStatusText(req.estado)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{req.fecha}</span>
                  <span className="font-medium">{req.dias} día(s)</span>
                </div>
              </div>
            ))}

            {recentRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No tienes solicitudes recientes</p>
                <button
                  onClick={() => navigate('/solicitudes')}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Crear una solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mensaje institucional */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-md p-6 border border-green-100">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Calendar size={24} className="text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tu bienestar es nuestra prioridad
            </h3>
            <p className="text-gray-600 leading-relaxed">
              En Comfachocó entendemos la importancia del equilibrio entre la vida laboral y personal.
              Este portal está diseñado para que gestiones tus tiempos de descanso de forma simple y transparente.
              Recuerda que tomarte tiempo para ti es fundamental para tu bienestar y productividad.
            </p>
            <button
              onClick={() => navigate('/bienestar')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              Conoce más sobre bienestar
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginaInicio;
