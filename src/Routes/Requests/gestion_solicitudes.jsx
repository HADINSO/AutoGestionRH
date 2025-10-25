import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  X,
  AlertCircle,
  Eye
} from 'lucide-react';

const Requests = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    tipo: 'vacaciones',
    fechaInicio: '',
    fechaFin: '',
    motivo: ''
  });

  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      tipo: 'Vacaciones',
      tipoValue: 'vacaciones',
      fechaInicio: '2025-11-10',
      fechaFin: '2025-11-15',
      dias: 5,
      motivo: 'Viaje familiar programado',
      estado: 'pendiente',
      fechaSolicitud: '2025-10-20',
      color: 'bg-green-500'
    },
    {
      id: 2,
      tipo: 'Permiso',
      tipoValue: 'permiso',
      fechaInicio: '2025-10-28',
      fechaFin: '2025-10-28',
      dias: 1,
      motivo: 'Trámite personal urgente',
      estado: 'aprobada',
      fechaSolicitud: '2025-10-15',
      aprobadoPor: 'Carlos Ramírez',
      fechaAprobacion: '2025-10-16',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      tipo: 'Licencia Médica',
      tipoValue: 'licencia_medica',
      fechaInicio: '2025-10-05',
      fechaFin: '2025-10-07',
      dias: 3,
      motivo: 'Cita médica especializada',
      estado: 'rechazada',
      fechaSolicitud: '2025-09-30',
      aprobadoPor: 'Carlos Ramírez',
      fechaAprobacion: '2025-10-02',
      comentarios: 'Debe presentar certificado médico previo a la solicitud',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      tipo: 'Licencia Familiar',
      tipoValue: 'licencia_familiar',
      fechaInicio: '2025-09-15',
      fechaFin: '2025-09-17',
      dias: 3,
      motivo: 'Asuntos familiares urgentes',
      estado: 'aprobada',
      fechaSolicitud: '2025-09-10',
      aprobadoPor: 'María González',
      fechaAprobacion: '2025-09-11',
      color: 'bg-purple-500'
    }
  ]);

  // Saldos disponibles
  const saldos = {
    vacaciones: { total: 15, usados: 8, pendientes: 5, disponibles: 2 },
    permiso: { total: 24, usados: 12, pendientes: 1, disponibles: 11 },
    licencia_medica: { total: 10, usados: 3, pendientes: 0, disponibles: 7 },
    licencia_familiar: { total: 5, usados: 3, pendientes: 0, disponibles: 2 }
  };

  const tiposSolicitud = [
    { value: 'vacaciones', label: 'Vacaciones', color: 'bg-green-500', descripcion: 'Vacaciones anuales remuneradas' },
    { value: 'permiso', label: 'Permiso', color: 'bg-blue-500', descripcion: 'Permiso personal de corta duración' },
    { value: 'licencia_medica', label: 'Licencia Médica', color: 'bg-orange-500', descripcion: 'Licencia por motivos de salud' },
    { value: 'licencia_familiar', label: 'Licencia Familiar', color: 'bg-purple-500', descripcion: 'Licencia por asuntos familiares' }
  ];

  const getStatusInfo = (estado) => {
    const statusMap = {
      pendiente: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        label: 'Pendiente',
        description: 'En revisión por tu supervisor'
      },
      aprobada: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        label: 'Aprobada',
        description: 'Solicitud aprobada'
      },
      rechazada: {
        color: 'bg-red-100 text-red-800',
        icon: XCircle,
        label: 'Rechazada',
        description: 'Solicitud rechazada'
      },
      cancelada: {
        color: 'bg-gray-100 text-gray-800',
        icon: XCircle,
        label: 'Cancelada',
        description: 'Cancelada por el usuario'
      }
    };
    return statusMap[estado] || statusMap.pendiente;
  };

  const calcularDias = (inicio, fin) => {
    if (!inicio || !fin) return 0;
    const fecha1 = new Date(inicio);
    const fecha2 = new Date(fin);
    const diffTime = Math.abs(fecha2 - fecha1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.tipo || !formData.fechaInicio || !formData.fechaFin || !formData.motivo) {
      alert('Por favor completa todos los campos');
      return;
    }

    const dias = calcularDias(formData.fechaInicio, formData.fechaFin);
    const saldoDisponible = saldos[formData.tipo].disponibles;

    if (dias > saldoDisponible) {
      alert(`No tienes suficientes días disponibles. Disponibles: ${saldoDisponible}, Solicitados: ${dias}`);
      return;
    }

    const tipoInfo = tiposSolicitud.find(t => t.value === formData.tipo);
    
    if (editMode && selectedRequest) {
      // Actualizar solicitud existente
      setSolicitudes(solicitudes.map(sol => 
        sol.id === selectedRequest.id 
          ? {
              ...sol,
              tipo: tipoInfo.label,
              tipoValue: formData.tipo,
              fechaInicio: formData.fechaInicio,
              fechaFin: formData.fechaFin,
              dias: dias,
              motivo: formData.motivo,
              color: tipoInfo.color
            }
          : sol
      ));
    } else {
      // Nueva solicitud
      const nuevaSolicitud = {
        id: solicitudes.length + 1,
        tipo: tipoInfo.label,
        tipoValue: formData.tipo,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        dias: dias,
        motivo: formData.motivo,
        estado: 'pendiente',
        fechaSolicitud: new Date().toISOString().split('T')[0],
        color: tipoInfo.color
      };

      setSolicitudes([nuevaSolicitud, ...solicitudes]);
    }

    // Reset form
    setFormData({
      tipo: 'vacaciones',
      fechaInicio: '',
      fechaFin: '',
      motivo: ''
    });
    setShowModal(false);
    setEditMode(false);
    setSelectedRequest(null);
  };

  const handleEdit = (solicitud) => {
    if (solicitud.estado !== 'pendiente') {
      alert('Solo puedes editar solicitudes pendientes');
      return;
    }

    setSelectedRequest(solicitud);
    setFormData({
      tipo: solicitud.tipoValue,
      fechaInicio: solicitud.fechaInicio,
      fechaFin: solicitud.fechaFin,
      motivo: solicitud.motivo
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const solicitud = solicitudes.find(s => s.id === id);
    if (solicitud.estado !== 'pendiente') {
      alert('Solo puedes cancelar solicitudes pendientes');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
      setSolicitudes(solicitudes.map(sol => 
        sol.id === id ? { ...sol, estado: 'cancelada' } : sol
      ));
    }
  };

  const handleViewDetail = (solicitud) => {
    setSelectedRequest(solicitud);
    setShowDetailModal(true);
  };

  const filteredSolicitudes = solicitudes.filter(sol => {
    const matchesStatus = filterStatus === 'todas' || sol.estado === filterStatus;
    const matchesSearch = sol.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sol.motivo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const diasSolicitados = formData.fechaInicio && formData.fechaFin 
    ? calcularDias(formData.fechaInicio, formData.fechaFin) 
    : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Solicitudes</h1>
        <p className="text-gray-600">Gestiona tus solicitudes de vacaciones, permisos y licencias</p>
      </div>

      {/* Resumen de días disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {tiposSolicitud.map(tipo => {
          const saldo = saldos[tipo.value];
          return (
            <div key={tipo.value} className="bg-white rounded-lg shadow-md p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`${tipo.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <FileText className="text-white" size={20} />
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {saldo.disponibles} disponibles
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{tipo.label}</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Total: {saldo.total} días</p>
                <p>Usados: {saldo.usados} días</p>
                <p>Pendientes: {saldo.pendientes} días</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todas">Todas</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobada">Aprobadas</option>
              <option value="rechazada">Rechazadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>

          <button
            onClick={() => {
              setEditMode(false);
              setSelectedRequest(null);
              setFormData({ tipo: 'vacaciones', fechaInicio: '', fechaFin: '', motivo: '' });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <Plus size={20} />
            Nueva Solicitud
          </button>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSolicitudes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No tienes solicitudes {filterStatus !== 'todas' && `en estado "${getStatusInfo(filterStatus).label}"`}</p>
          </div>
        ) : (
          filteredSolicitudes.map(solicitud => {
            const statusInfo = getStatusInfo(solicitud.estado);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={solicitud.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${solicitud.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                        <FileText className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{solicitud.tipo}</h3>
                        <p className="text-sm text-gray-600">Solicitud #{solicitud.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{solicitud.fechaInicio} al {solicitud.fechaFin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{solicitud.dias} {solicitud.dias === 1 ? 'día' : 'días'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText size={16} />
                        <span>Creada el {solicitud.fechaSolicitud}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-medium">Motivo:</span> {solicitud.motivo}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon size={14} />
                        {statusInfo.label}
                      </span>
                      {solicitud.aprobadoPor && (
                        <span className="text-xs text-gray-600">
                          por {solicitud.aprobadoPor}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleViewDetail(solicitud)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalle"
                    >
                      <Eye size={20} />
                    </button>
                    {solicitud.estado === 'pendiente' && (
                      <>
                        <button
                          onClick={() => handleEdit(solicitud)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(solicitud.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancelar"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Nueva/Editar Solicitud */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editMode ? 'Editar Solicitud' : 'Nueva Solicitud'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setSelectedRequest(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Solicitud *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {tiposSolicitud.map(tipo => (
                      <button
                        key={tipo.value}
                        onClick={() => setFormData({ ...formData, tipo: tipo.value })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.tipo === tipo.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`${tipo.color} w-8 h-8 rounded flex items-center justify-center`}>
                            <FileText className="text-white" size={16} />
                          </div>
                          <span className="font-semibold text-gray-800">{tipo.label}</span>
                        </div>
                        <p className="text-xs text-gray-600">{tipo.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Disponibles: {saldos[tipo.value].disponibles} días
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={formData.fechaInicio}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin *
                    </label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={formData.fechaFin}
                      onChange={handleInputChange}
                      min={formData.fechaInicio || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {diasSolicitados > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-600" size={20} />
                        <span className="text-sm font-medium text-blue-800">
                          Días solicitados: {diasSolicitados}
                        </span>
                      </div>
                      <span className="text-sm text-blue-700">
                        Disponibles: {saldos[formData.tipo].disponibles}
                      </span>
                    </div>
                    {diasSolicitados > saldos[formData.tipo].disponibles && (
                      <div className="mt-2 flex items-start gap-2">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-sm text-red-600">
                          No tienes suficientes días disponibles
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo de la Solicitud *
                  </label>
                  <textarea
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    placeholder="Describe brevemente el motivo de tu solicitud..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Nota:</span> Tu solicitud será enviada a tu supervisor 
                    para su revisión. Recibirás una notificación cuando sea procesada.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setSelectedRequest(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  {editMode ? 'Guardar Cambios' : 'Enviar Solicitud'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`${selectedRequest.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <FileText className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedRequest.tipo}</h2>
                    <p className="text-sm text-gray-600">Solicitud #{selectedRequest.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Estado</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedRequest.estado).color}`}>
                      {React.createElement(getStatusInfo(selectedRequest.estado).icon, { size: 16 })}
                      {getStatusInfo(selectedRequest.estado).label}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Días solicitados</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedRequest.dias} días</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Fechas</p>
                  <div className="flex items-center gap-2 text-gray-800">
                    <Calendar size={18} />
                    <span className="font-medium">
                      {selectedRequest.fechaInicio} al {selectedRequest.fechaFin}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Motivo</p>
                  <p className="text-gray-800">{selectedRequest.motivo}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Fecha de solicitud</p>
                    <p className="text-gray-800">{selectedRequest.fechaSolicitud}</p>
                  </div>

                  {selectedRequest.fechaAprobacion && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Fecha de respuesta</p>
                      <p className="text-gray-800">{selectedRequest.fechaAprobacion}</p>
                    </div>
                  )}
                </div>

                {selectedRequest.aprobadoPor && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">
                      {selectedRequest.estado === 'aprobada' ? 'Aprobado por' : 'Revisado por'}
                    </p>
                    <p className="text-gray-800 font-medium">{selectedRequest.aprobadoPor}</p>
                  </div>
                )}

                {selectedRequest.comentarios && (
                  <div className={`rounded-lg p-4 border-l-4 ${
                    selectedRequest.estado === 'aprobada' 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}>
                    <p className="text-sm font-medium text-gray-700 mb-2">Comentarios del supervisor</p>
                    <p className="text-gray-800">{selectedRequest.comentarios}</p>
                  </div>
                )}

                {selectedRequest.estado === 'pendiente' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Clock className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 mb-1">
                          Solicitud en revisión
                        </p>
                        <p className="text-sm text-yellow-700">
                          Tu supervisor revisará esta solicitud pronto. Te notificaremos cuando haya una decisión.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                {selectedRequest.estado === 'pendiente' && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleEdit(selectedRequest);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit size={18} />
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        handleDelete(selectedRequest.id);
                      }}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;