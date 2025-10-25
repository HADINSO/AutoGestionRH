import React, { useState } from 'react';
import { 
  MessageCircle,
  Send,
  Search,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Filter,
  Eye
} from 'lucide-react';

const Support = () => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    asunto: '',
    categoria: '',
    prioridad: 'media',
    mensaje: ''
  });

  const [tickets, setTickets] = useState([
    {
      id: 1,
      asunto: 'No puedo ver mis solicitudes aprobadas',
      categoria: 'Técnico',
      prioridad: 'alta',
      estado: 'abierto',
      mensaje: 'Cuando intento acceder a la sección de solicitudes aprobadas, la página no carga.',
      fecha: '2025-10-24 09:30',
      ultimaActualizacion: '2025-10-24 10:15',
      respuesta: null
    },
    {
      id: 2,
      asunto: 'Consulta sobre días de vacaciones',
      categoria: 'Consulta',
      prioridad: 'media',
      estado: 'en_proceso',
      mensaje: '¿Cómo puedo saber cuántos días de vacaciones me quedan disponibles para el próximo año?',
      fecha: '2025-10-23 14:20',
      ultimaActualizacion: '2025-10-24 08:00',
      respuesta: 'Hola, puedes ver tu saldo de días disponibles en la sección Dashboard, en el panel de "Mis Días Disponibles".'
    },
    {
      id: 3,
      asunto: 'Solicitud rechazada sin motivo',
      categoria: 'Solicitudes',
      prioridad: 'alta',
      estado: 'cerrado',
      mensaje: 'Mi solicitud de vacaciones fue rechazada pero no veo ningún comentario del supervisor.',
      fecha: '2025-10-22 11:00',
      ultimaActualizacion: '2025-10-23 09:30',
      respuesta: 'Hemos revisado tu caso. El supervisor olvidó agregar comentarios. Te hemos enviado un correo con la explicación detallada.',
      respondidoPor: 'María González'
    }
  ]);

  const categorias = [
    { value: 'tecnico', label: 'Problema Técnico' },
    { value: 'solicitudes', label: 'Solicitudes' },
    { value: 'consulta', label: 'Consulta General' },
    { value: 'cuenta', label: 'Mi Cuenta' },
    { value: 'otro', label: 'Otro' }
  ];

  const prioridades = [
    { value: 'baja', label: 'Baja', color: 'bg-green-100 text-green-800' },
    { value: 'media', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alta', label: 'Alta', color: 'bg-red-100 text-red-800' }
  ];

  const estadosTicket = [
    { value: 'abierto', label: 'Abierto', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
    { value: 'en_proceso', label: 'En Proceso', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { value: 'cerrado', label: 'Cerrado', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  ];

  const preguntasFrecuentes = [
    {
      pregunta: '¿Cómo solicito vacaciones?',
      respuesta: 'Ve a la sección "Mis Solicitudes", haz clic en "Nueva Solicitud", selecciona el tipo "Vacaciones", elige las fechas y envía tu solicitud.'
    },
    {
      pregunta: '¿Cuánto tiempo tarda la aprobación?',
      respuesta: 'Las solicitudes suelen ser revisadas en 24-48 horas hábiles. Recibirás una notificación cuando tu supervisor tome una decisión.'
    },
    {
      pregunta: '¿Puedo cancelar una solicitud pendiente?',
      respuesta: 'Sí, mientras la solicitud esté en estado "Pendiente", puedes cancelarla desde la sección "Mis Solicitudes".'
    },
    {
      pregunta: '¿Cómo actualizo mi información personal?',
      respuesta: 'Ve a "Mi Perfil" haciendo clic en tu avatar en la esquina superior derecha, luego selecciona "Editar Perfil".'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTicket = () => {
    if (!formData.asunto || !formData.categoria || !formData.mensaje) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const nuevoTicket = {
      id: tickets.length + 1,
      asunto: formData.asunto,
      categoria: categorias.find(c => c.value === formData.categoria)?.label,
      prioridad: formData.prioridad,
      estado: 'abierto',
      mensaje: formData.mensaje,
      fecha: new Date().toISOString().slice(0, 16).replace('T', ' '),
      ultimaActualizacion: new Date().toISOString().slice(0, 16).replace('T', ' '),
      respuesta: null
    };

    setTickets([nuevoTicket, ...tickets]);
    setFormData({ asunto: '', categoria: '', prioridad: 'media', mensaje: '' });
    setShowNewTicketModal(false);
  };

  const getEstadoInfo = (estado) => {
    return estadosTicket.find(e => e.value === estado) || estadosTicket[0];
  };

  const getPrioridadColor = (prioridad) => {
    return prioridades.find(p => p.value === prioridad)?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'todos' || ticket.estado === filterStatus;
    const matchesSearch = ticket.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.mensaje.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Centro de Ayuda y Soporte</h1>
        <p className="text-gray-600">Estamos aquí para ayudarte con cualquier pregunta o problema</p>
      </div>

      {/* Opciones de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 text-white">
          <MessageCircle size={32} className="mb-3 opacity-80" />
          <h3 className="font-semibold mb-2">Tickets de Soporte</h3>
          <p className="text-blue-100 text-sm mb-3">Crea un ticket y te responderemos pronto</p>
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm"
          >
            Crear Ticket
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 text-white">
          <Phone size={32} className="mb-3 opacity-80" />
          <h3 className="font-semibold mb-2">Llámanos</h3>
          <p className="text-green-100 text-sm mb-1">Lun - Vie: 8:00 AM - 6:00 PM</p>
          <p className="font-mono text-lg">+57 (1) 234-5678</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 text-white">
          <Mail size={32} className="mb-3 opacity-80" />
          <h3 className="font-semibold mb-2">Envíanos un Email</h3>
          <p className="text-purple-100 text-sm mb-1">Respuesta en 24 horas</p>
          <p className="font-mono text-sm">soporte@comfachoco.com</p>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle className="text-blue-500" size={24} />
          Preguntas Frecuentes
        </h2>
        <div className="space-y-3">
          {preguntasFrecuentes.map((faq, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-800 flex items-center justify-between">
                {faq.pregunta}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 text-gray-600 text-sm border-l-4 border-blue-500 ml-2 mt-2">
                {faq.respuesta}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Mis Tickets */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Mis Tickets</h2>
          <button
            onClick={() => setShowNewTicketModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={18} />
            Nuevo Ticket
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar tickets..."
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
            <option value="todos">Todos los estados</option>
            {estadosTicket.map(estado => (
              <option key={estado.value} value={estado.value}>{estado.label}</option>
            ))}
          </select>
        </div>

        {/* Lista de tickets */}
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
              <p>No tienes tickets {filterStatus !== 'todos' ? `en estado "${getEstadoInfo(filterStatus).label}"` : ''}</p>
            </div>
          ) : (
            filteredTickets.map(ticket => {
              const estadoInfo = getEstadoInfo(ticket.estado);
              const EstadoIcon = estadoInfo.icon;
              
              return (
                <div
                  key={ticket.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowTicketDetail(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{ticket.asunto}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{ticket.mensaje}</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 ml-2">
                      <Eye size={20} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${estadoInfo.color}`}>
                      <EstadoIcon size={14} />
                      {estadoInfo.label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(ticket.prioridad)}`}>
                      {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">{ticket.categoria}</span>
                    <span className="text-xs text-gray-400 ml-auto">{ticket.fecha}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal Nuevo Ticket */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Ticket</h2>
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe brevemente tu problema"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      {categorias.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {prioridades.map(prior => (
                        <option key={prior.value} value={prior.value}>{prior.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe tu problema con el mayor detalle posible..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowNewTicketModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitTicket}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Send size={18} />
                    Enviar Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle Ticket */}
      {showTicketDetail && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Detalle del Ticket #{selectedTicket.id}</h2>
                <button
                  onClick={() => setShowTicketDetail(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">{selectedTicket.asunto}</h3>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getEstadoInfo(selectedTicket.estado).color}`}>
                      {React.createElement(getEstadoInfo(selectedTicket.estado).icon, { size: 16 })}
                      {getEstadoInfo(selectedTicket.estado).label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPrioridadColor(selectedTicket.prioridad)}`}>
                      Prioridad {selectedTicket.prioridad}
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                      {selectedTicket.categoria}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Creado:</span>
                      <p className="font-medium text-gray-800">{selectedTicket.fecha}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Última actualización:</span>
                      <p className="font-medium text-gray-800">{selectedTicket.ultimaActualizacion}</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-700 mb-2">Tu mensaje:</h4>
                  <p className="text-gray-600">{selectedTicket.mensaje}</p>
                </div>

                {selectedTicket.respuesta && (
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <h4 className="font-semibold text-gray-800">Respuesta del equipo de soporte</h4>
                    </div>
                    <p className="text-gray-700 mb-2">{selectedTicket.respuesta}</p>
                    {selectedTicket.respondidoPor && (
                      <p className="text-sm text-gray-600">
                        - {selectedTicket.respondidoPor}
                      </p>
                    )}
                  </div>
                )}

                {!selectedTicket.respuesta && selectedTicket.estado !== 'cerrado' && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 flex items-start gap-3">
                    <Clock className="text-yellow-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Ticket en proceso</h4>
                      <p className="text-sm text-gray-600">
                        Nuestro equipo está revisando tu solicitud. Te responderemos lo antes posible.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;