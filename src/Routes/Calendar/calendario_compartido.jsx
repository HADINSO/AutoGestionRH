import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Users,
  Filter,
  Download
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('todos');
  const [view, setView] = useState('month'); // 'month' or 'week'

  // Datos de ejemplo de ausencias
  const ausencias = [
    {
      id: 1,
      empleado: 'María González',
      tipo: 'Vacaciones',
      fechaInicio: '2025-10-28',
      fechaFin: '2025-11-01',
      color: 'bg-green-500',
      departamento: 'RRHH'
    },
    {
      id: 2,
      empleado: 'Carlos Ramírez',
      tipo: 'Permiso',
      fechaInicio: '2025-10-25',
      fechaFin: '2025-10-25',
      color: 'bg-blue-500',
      departamento: 'Operaciones'
    },
    {
      id: 3,
      empleado: 'Ana Martínez',
      tipo: 'Licencia Médica',
      fechaInicio: '2025-10-30',
      fechaFin: '2025-11-05',
      color: 'bg-orange-500',
      departamento: 'Tecnología'
    }
  ];

  const departamentos = ['todos', 'RRHH', 'Tecnología', 'Operaciones', 'Administrativo', 'Comercial'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getAusenciasForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return ausencias.filter(ausencia => {
      if (selectedDepartment !== 'todos' && ausencia.departamento !== selectedDepartment) {
        return false;
      }
      return dateStr >= ausencia.fechaInicio && dateStr <= ausencia.fechaFin;
    });
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendario del Equipo</h1>
        <p className="text-gray-600">Visualiza las ausencias programadas de tu equipo</p>
      </div>

      {/* Controles del calendario */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <h2 className="text-xl font-bold text-gray-800 min-w-[200px] text-center">
              {monthNames[month]} {year}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            
            <button
              onClick={today}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Hoy
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departamentos.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'todos' ? 'Todos los departamentos' : dept}
                  </option>
                ))}
              </select>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {dayNames.map(day => (
            <div key={day} className="p-4 text-center font-semibold text-gray-700 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const ausenciasDelDia = day ? getAusenciasForDay(day) : [];
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-b border-r border-gray-200 ${
                  !day ? 'bg-gray-50' : ''
                } ${isToday(day) ? 'bg-blue-50' : ''}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-semibold mb-2 ${
                      isToday(day) ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {ausenciasDelDia.map(ausencia => (
                        <div
                          key={ausencia.id}
                          className={`${ausencia.color} text-white text-xs p-1 rounded truncate`}
                          title={`${ausencia.empleado} - ${ausencia.tipo}`}
                        >
                          {ausencia.empleado.split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Tipos de Ausencia</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Vacaciones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Permiso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-700">Licencia Médica</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Licencia Familiar</span>
          </div>
        </div>
      </div>

      {/* Lista de próximas ausencias */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} />
          Próximas Ausencias
        </h3>
        <div className="space-y-3">
          {ausencias
            .filter(a => selectedDepartment === 'todos' || a.departamento === selectedDepartment)
            .map(ausencia => (
              <div key={ausencia.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${ausencia.color} rounded-full`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{ausencia.empleado}</p>
                    <p className="text-sm text-gray-600">{ausencia.departamento}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{ausencia.tipo}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ausencia.fechaInicio).toLocaleDateString('es-ES')} - {new Date(ausencia.fechaFin).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;