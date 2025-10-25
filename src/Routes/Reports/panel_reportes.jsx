import React, { useState } from 'react';
import { 
  FileText,
  Download,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('resumen');
  const [filterPeriod, setFilterPeriod] = useState('mes');
  const [selectedDepartment, setSelectedDepartment] = useState('todos');

  // Datos de ejemplo
  const estadisticas = {
    totalSolicitudes: 145,
    pendientes: 12,
    aprobadas: 120,
    rechazadas: 13,
    diasVacacionesUsados: 850,
    diasPermisosUsados: 180,
    empleadosActivos: 85
  };

  const solicitudesPorDepartamento = [
    { departamento: 'Tecnología', total: 45, aprobadas: 40, rechazadas: 3, pendientes: 2 },
    { departamento: 'Operaciones', total: 38, aprobadas: 35, rechazadas: 2, pendientes: 1 },
    { departamento: 'RRHH', total: 25, aprobadas: 22, rechazadas: 2, pendientes: 1 },
    { departamento: 'Administrativo', total: 22, aprobadas: 18, rechazadas: 3, pendientes: 1 },
    { departamento: 'Comercial', total: 15, aprobadas: 5, rechazadas: 3, pendientes: 7 }
  ];

  const solicitudesPorTipo = [
    { tipo: 'Vacaciones', cantidad: 85, porcentaje: 58.6 },
    { tipo: 'Permiso', cantidad: 40, porcentaje: 27.6 },
    { tipo: 'Licencia Médica', cantidad: 15, porcentaje: 10.3 },
    { tipo: 'Licencia Familiar', cantidad: 5, porcentaje: 3.5 }
  ];

  const empleadosConMasSolicitudes = [
    { nombre: 'Carlos Ramírez', solicitudes: 8, dias: 25 },
    { nombre: 'Ana Martínez', solicitudes: 7, dias: 22 },
    { nombre: 'Juan Pérez', solicitudes: 6, dias: 18 },
    { nombre: 'María González', solicitudes: 5, dias: 15 },
    { nombre: 'Pedro López', solicitudes: 5, dias: 12 }
  ];

  const tendenciaMensual = [
    { mes: 'Ene', solicitudes: 18 },
    { mes: 'Feb', solicitudes: 15 },
    { mes: 'Mar', solicitudes: 22 },
    { mes: 'Abr', solicitudes: 20 },
    { mes: 'May', solicitudes: 25 },
    { mes: 'Jun', solicitudes: 30 },
    { mes: 'Jul', solicitudes: 35 },
    { mes: 'Ago', solicitudes: 28 },
    { mes: 'Sep', solicitudes: 24 },
    { mes: 'Oct', solicitudes: 26 }
  ];

  const reportTypes = [
    { value: 'resumen', label: 'Resumen General', icon: BarChart3 },
    { value: 'departamentos', label: 'Por Departamento', icon: Users },
    { value: 'tendencias', label: 'Tendencias', icon: TrendingUp },
    { value: 'empleados', label: 'Por Empleado', icon: FileText }
  ];

  const maxSolicitudes = Math.max(...tendenciaMensual.map(t => t.solicitudes));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reportes y Análisis</h1>
        <p className="text-gray-600">Panel de control para Recursos Humanos</p>
      </div>

      {/* Controles */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3">
            {reportTypes.map(report => {
              const Icon = report.icon;
              return (
                <button
                  key={report.value}
                  onClick={() => setSelectedReport(report.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedReport === report.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {report.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="trimestre">Este trimestre</option>
              <option value="anio">Este año</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <FileText size={28} className="opacity-80" />
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-3xl font-bold">{estadisticas.totalSolicitudes}</p>
          <p className="text-blue-100 text-sm">Solicitudes</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock size={28} className="opacity-80" />
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Pendientes</span>
          </div>
          <p className="text-3xl font-bold">{estadisticas.pendientes}</p>
          <p className="text-yellow-100 text-sm">Por revisar</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle size={28} className="opacity-80" />
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Aprobadas</span>
          </div>
          <p className="text-3xl font-bold">{estadisticas.aprobadas}</p>
          <p className="text-green-100 text-sm">{((estadisticas.aprobadas / estadisticas.totalSolicitudes) * 100).toFixed(1)}% del total</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <XCircle size={28} className="opacity-80" />
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">Rechazadas</span>
          </div>
          <p className="text-3xl font-bold">{estadisticas.rechazadas}</p>
          <p className="text-red-100 text-sm">{((estadisticas.rechazadas / estadisticas.totalSolicitudes) * 100).toFixed(1)}% del total</p>
        </div>
      </div>

      {/* Contenido según reporte seleccionado */}
      {selectedReport === 'resumen' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solicitudes por tipo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PieChart size={20} />
              Solicitudes por Tipo
            </h3>
            <div className="space-y-3">
              {solicitudesPorTipo.map(tipo => (
                <div key={tipo.tipo}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{tipo.tipo}</span>
                    <span className="text-gray-600">{tipo.cantidad} ({tipo.porcentaje}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${tipo.porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top empleados */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={20} />
              Empleados con Más Solicitudes
            </h3>
            <div className="space-y-3">
              {empleadosConMasSolicitudes.map((empleado, index) => (
                <div key={empleado.nombre} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{empleado.nombre}</p>
                      <p className="text-xs text-gray-600">{empleado.dias} días totales</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{empleado.solicitudes} solicitudes</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'departamentos' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Solicitudes por Departamento</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aprobadas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rechazadas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pendientes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tasa Aprobación</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solicitudesPorDepartamento.map(dept => {
                  const tasaAprobacion = ((dept.aprobadas / dept.total) * 100).toFixed(1);
                  return (
                    <tr key={dept.departamento} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{dept.departamento}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{dept.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {dept.aprobadas}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {dept.rechazadas}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {dept.pendientes}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 mr-2">{tasaAprobacion}%</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${tasaAprobacion}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedReport === 'tendencias' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Tendencia Mensual de Solicitudes</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {tendenciaMensual.map(dato => (
              <div key={dato.mes} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${(dato.solicitudes / maxSolicitudes) * 100}%` }}
                    title={`${dato.solicitudes} solicitudes`}
                  ></div>
                </div>
                <div className="mt-2 text-xs font-medium text-gray-600">{dato.mes}</div>
                <div className="text-xs text-gray-500">{dato.solicitudes}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedReport === 'empleados' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Reporte por Empleado</h3>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los departamentos</option>
              <option value="tecnologia">Tecnología</option>
              <option value="operaciones">Operaciones</option>
              <option value="rrhh">RRHH</option>
              <option value="administrativo">Administrativo</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Análisis detallado del uso de días de vacaciones y permisos por empleado
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-blue-700">
                Aquí podrás ver métricas individuales de empleados, exportar datos o filtrar por área.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empleado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solicitudes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Días Usados</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {empleadosConMasSolicitudes.map(emp => (
                  <tr key={emp.nombre} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{emp.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{emp.solicitudes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{emp.dias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
