import React, { useState } from 'react';
import { X } from "lucide-react";
import { 
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  Smile,
  Meh,
  Frown,
  CheckCircle,
  Activity,
  Award,
  Send,
  AlertCircle
} from 'lucide-react';

const Wellness = () => {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [selectedSatisfaction, setSelectedSatisfaction] = useState(null);
  const [comment, setComment] = useState('');
  const [submittedToday, setSubmittedToday] = useState(false);

  // Datos de ejemplo
  const misSatisfaccionPromedio = 4.2;
  const encuestasCompletadas = 24;
  const racha = 7;

  const historialEncuestas = [
    { id: 1, fecha: '2025-10-24', nivel: 5, comentario: 'Excelente ambiente de trabajo' },
    { id: 2, fecha: '2025-10-23', nivel: 4, comentario: 'Buen día productivo' },
    { id: 3, fecha: '2025-10-22', nivel: 3, comentario: 'Día regular, mucha carga' },
    { id: 4, fecha: '2025-10-21', nivel: 5, comentario: 'Día muy positivo' },
    { id: 5, fecha: '2025-10-20', nivel: 4, comentario: 'Trabajo en equipo efectivo' }
  ];

  const promedioEmpresa = 4.1;
  const participacionMes = 78;

  const satisfactionLevels = [
    { value: 1, label: 'Muy insatisfecho', icon: Frown, color: 'text-red-500', bgColor: 'bg-red-100' },
    { value: 2, label: 'Insatisfecho', icon: Frown, color: 'text-orange-500', bgColor: 'bg-orange-100' },
    { value: 3, label: 'Neutral', icon: Meh, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { value: 4, label: 'Satisfecho', icon: Smile, color: 'text-green-500', bgColor: 'bg-green-100' },
    { value: 5, label: 'Muy satisfecho', icon: Smile, color: 'text-green-600', bgColor: 'bg-green-100' }
  ];

  const handleSubmitSurvey = () => {
    if (!selectedSatisfaction) {
      alert('Por favor selecciona un nivel de satisfacción');
      return;
    }

    // Aquí iría la lógica para enviar al backend
    console.log('Encuesta enviada:', {
      nivel: selectedSatisfaction,
      comentario: comment,
      fecha: new Date().toISOString()
    });

    setSubmittedToday(true);
    setShowSurveyModal(false);
    setSelectedSatisfaction(null);
    setComment('');
  };

  const getSatisfactionIcon = (nivel) => {
    const level = satisfactionLevels.find(l => l.value === nivel);
    if (!level) return Meh;
    return level.icon;
  };

  const getSatisfactionColor = (nivel) => {
    const level = satisfactionLevels.find(l => l.value === nivel);
    return level ? level.color : 'text-gray-500';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienestar Laboral</h1>
        <p className="text-gray-600">Comparte cómo te sientes y contribuye a mejorar nuestro ambiente de trabajo</p>
      </div>

      {/* Tarjeta de encuesta diaria */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">¿Cómo te sientes hoy?</h2>
            <p className="text-blue-100">
              {submittedToday 
                ? '¡Gracias por compartir tu feedback de hoy!' 
                : 'Toma un momento para compartir tu nivel de satisfacción'}
            </p>
          </div>
          {!submittedToday ? (
            <button
              onClick={() => setShowSurveyModal(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Heart size={20} />
              Responder Encuesta
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <CheckCircle size={20} />
              <span>Completada hoy</span>
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas personales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-blue-500" size={24} />
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Promedio</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{misSatisfaccionPromedio}</p>
          <p className="text-sm text-gray-600">Tu satisfacción</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-green-500" size={24} />
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{encuestasCompletadas}</p>
          <p className="text-sm text-gray-600">Encuestas completadas</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-2">
            <Award className="text-purple-500" size={24} />
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Racha</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{racha}</p>
          <p className="text-sm text-gray-600">Días consecutivos</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-orange-500" size={24} />
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Empresa</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{promedioEmpresa}</p>
          <p className="text-sm text-gray-600">Promedio general</p>
        </div>
      </div>

      {/* Historial de encuestas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mi Historial</h3>
        <div className="space-y-3">
          {historialEncuestas.map(encuesta => {
            const Icon = getSatisfactionIcon(encuesta.nivel);
            const colorClass = getSatisfactionColor(encuesta.nivel);
            
            return (
              <div key={encuesta.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full ${satisfactionLevels.find(l => l.value === encuesta.nivel)?.bgColor}`}>
                  <Icon className={colorClass} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">
                      {satisfactionLevels.find(l => l.value === encuesta.nivel)?.label}
                    </span>
                    <span className="text-sm text-gray-500">{encuesta.fecha}</span>
                  </div>
                  {encuesta.comentario && (
                    <p className="text-sm text-gray-600">{encuesta.comentario}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < encuesta.nivel ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Heart className="text-green-600" size={20} />
            ¿Por qué es importante?
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            Tu feedback nos ayuda a:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• Identificar áreas de mejora en el ambiente laboral</li>
            <li>• Tomar decisiones informadas sobre bienestar</li>
            <li>• Crear un mejor lugar de trabajo para todos</li>
            <li>• Reconocer y mantener lo que funciona bien</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <MessageCircle className="text-blue-600" size={20} />
            Privacidad y Confidencialidad
          </h3>
          <p className="text-sm text-gray-700">
            Tus respuestas son completamente confidenciales. Solo se comparten estadísticas 
            agregadas y anónimas con el equipo de RRHH para mejorar el bienestar general de 
            la empresa. Nunca se compartirán respuestas individuales sin tu consentimiento.
          </p>
        </div>
      </div>

      {/* Modal de encuesta */}
      {showSurveyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Encuesta de Bienestar</h2>
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ¿Cómo te sientes hoy en tu trabajo?
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {satisfactionLevels.map(level => {
                    const Icon = level.icon;
                    return (
                      <button
                        key={level.value}
                        onClick={() => setSelectedSatisfaction(level.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSatisfaction === level.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon
                          className={`mx-auto mb-2 ${level.color}`}
                          size={32}
                        />
                        <p className="text-xs font-medium text-gray-700 text-center">
                          {level.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentarios (opcional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comparte cualquier comentario que pueda ayudarnos a mejorar..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-blue-800">
                    Tu respuesta es confidencial y nos ayuda a mejorar el ambiente laboral para todos.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitSurvey}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar Encuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;