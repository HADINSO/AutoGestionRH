import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Building2,
  Calendar,
  Edit2,
  Save,
  X,
  Lock,
  History
} from 'lucide-react';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: user?.nombre_completo || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    cargo: user?.cargo || '',
    departamento: user?.departamento || 'Tecnología'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [historial] = useState([
    { id: 1, tipo: 'Vacaciones', fecha: '2024-12-15 - 2024-12-30', dias: 15, estado: 'aprobada' },
    { id: 2, tipo: 'Permiso', fecha: '2024-10-05', dias: 1, estado: 'aprobada' },
    { id: 3, tipo: 'Licencia Médica', fecha: '2024-08-20 - 2024-08-22', dias: 3, estado: 'aprobada' }
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Lógica para guardar cambios
    console.log('Guardando cambios:', formData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Cambiando contraseña');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600 mt-2">Administra tu información personal y revisa tu historial</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda - Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tarjeta de Información Personal */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Información Personal</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Edit2 size={18} className="mr-2" />
                  Editar
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <Save size={18} className="mr-2" />
                    Guardar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    <X size={18} className="mr-2" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre Completo */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="mr-2 text-gray-500" />
                  Nombre Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.nombre_completo}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="mr-2 text-gray-500" />
                  Correo Electrónico
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.email}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="mr-2 text-gray-500" />
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.telefono || 'No registrado'}</p>
                )}
              </div>

              {/* Cargo */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={16} className="mr-2 text-gray-500" />
                  Cargo
                </label>
                <p className="text-gray-900 font-medium">{formData.cargo}</p>
              </div>

              {/* Departamento */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={16} className="mr-2 text-gray-500" />
                  Departamento
                </label>
                <p className="text-gray-900 font-medium">{formData.departamento}</p>
              </div>

              {/* Fecha de Ingreso */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  Fecha de Ingreso
                </label>
                <p className="text-gray-900 font-medium">{user?.fecha_ingreso || '2022-06-01'}</p>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Seguridad</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Lock size={20} className="text-gray-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Contraseña</p>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cambiar
              </button>
            </div>
          </div>

          {/* Historial de Solicitudes */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <History size={24} className="text-gray-700 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Historial de Solicitudes</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Días</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{item.tipo}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{item.fecha}</td>
                      <td className="py-3 px-4 text-gray-900">{item.dias}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {item.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Avatar y Estadísticas */}
        <div className="space-y-6">
          {/* Tarjeta de Avatar */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user?.nombre_completo?.charAt(0) || 'U'}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{formData.nombre_completo}</h3>
            <p className="text-gray-600 mt-1">{formData.cargo}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Miembro desde</p>
              <p className="text-lg font-semibold text-gray-900">Junio 2022</p>
            </div>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Resumen 2025</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-100">Días usados</span>
                <span className="text-2xl font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Días disponibles</span>
                <span className="text-2xl font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Total del año</span>
                <span className="text-2xl font-bold">20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cambio de Contraseña */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Cambiar Contraseña</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Actualizar Contraseña
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;