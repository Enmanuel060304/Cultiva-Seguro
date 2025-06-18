import React from 'react';

const EstadoSiembra = ({ clima }) => {
  // Datos de ejemplo
  const cultivo = {
    nombre: "Rosas",
    variedad: "Tea Hybrid",
    etapa: "Floración",
    diasTranscurridos: 45,
    diasTotal: 60,
    salud: "Excelente",
    riesgo: "Bajo",
    tareasPendientes: [
      { id: 1, nombre: "Poda de mantenimiento", dias: 2 },
      { id: 2, nombre: "Aplicación de fertilizante", dias: 5 },
      { id: 3, nombre: "Control de plagas", dias: 3 }
    ],
    condicionesIdeales: {
      tempMin: 18,
      tempMax: 25,
      humedadMin: 60,
      humedadMax: 70,
      luzMin: 6,
      vientoMax: 15
    }
  };

  // Calcular porcentaje de progreso
  const progreso = Math.round((cultivo.diasTranscurridos / cultivo.diasTotal) * 100);

  // Determinar si las condiciones actuales son ideales
  const esTempIdeal = clima && clima.main.temp >= cultivo.condicionesIdeales.tempMin && 
                     clima.main.temp <= cultivo.condicionesIdeales.tempMax;
  
  const esHumedadIdeal = clima && clima.main.humidity >= cultivo.condicionesIdeales.humedadMin && 
                         clima.main.humidity <= cultivo.condicionesIdeales.humedadMax;
  
  const esVientoIdeal = clima && clima.wind.speed <= cultivo.condicionesIdeales.vientoMax;
  
  // Determinar si las condiciones generales son óptimas
  const condicionesOptimas = esTempIdeal && esHumedadIdeal && esVientoIdeal;

  // Determinar color de salud
  const getSaludColor = () => {
    switch(cultivo.salud) {
      case 'Excelente': return 'bg-green-500';
      case 'Buena': return 'bg-green-300';
      case 'Regular': return 'bg-yellow-500';
      case 'Mala': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Determinar color de riesgo
  const getRiesgoColor = () => {
    switch(cultivo.riesgo) {
      case 'Bajo': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Alto': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Consejos basados en las condiciones climáticas
  const getConsejos = () => {
    if (!clima) return [];
    
    const consejos = [];
    
    if (!esTempIdeal) {
      if (clima.main.temp < cultivo.condicionesIdeales.tempMin) {
        consejos.push("Considera cubrir tus plantas por la noche para protegerlas del frío");
      } else {
        consejos.push("Proporciona sombra durante las horas más calurosas del día");
      }
    }
    
    if (!esHumedadIdeal) {
      if (clima.main.humidity < cultivo.condicionesIdeales.humedadMin) {
        consejos.push("Aumenta la frecuencia de riego para mantener la humedad adecuada");
      } else {
        consejos.push("Mejora la ventilación para reducir la humedad excesiva");
      }
    }
    
    if (!esVientoIdeal) {
      consejos.push("Protege tus plantas de los vientos fuertes con barreras naturales");
    }
    
    if (consejos.length === 0) {
      consejos.push("Las condiciones son óptimas para el crecimiento. Continúa con el cuidado habitual");
    }
    
    return consejos;
  };

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-800">Estado de Siembra</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {cultivo.nombre} - {cultivo.variedad}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-green-700">Progreso de la etapa</span>
          <span className="text-sm font-medium text-green-700">{progreso}%</span>
        </div>
        <div className="w-full bg-green-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full" 
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Día {cultivo.diasTranscurridos}</span>
          <span>Día {cultivo.diasTotal}</span>
        </div>
      </div>

      {/* Estado de salud y riesgo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg border border-green-200">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Salud del cultivo</h4>
          <div className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getSaludColor()}`}></span>
            <span className="font-medium">{cultivo.salud}</span>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-green-200">
          <h4 className="text-sm font-medium text-gray-500 mb-1">Nivel de riesgo</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiesgoColor()}`}>
            {cultivo.riesgo}
          </span>
        </div>
      </div>

      {/* Indicador de condiciones óptimas */}
      <div className={`rounded-xl p-4 border ${condicionesOptimas ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${condicionesOptimas ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Condiciones para la siembra</h3>
            <p className={condicionesOptimas ? 'text-green-600' : 'text-yellow-600'}>
              {condicionesOptimas 
                ? 'Óptimas para el crecimiento' 
                : 'No óptimas - Requieren atención'}
            </p>
          </div>
        </div>
      </div>

      {/* Condiciones climáticas detalladas */}
      {clima && (
        <div className="bg-white rounded-lg border border-green-200 p-4">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Condiciones climáticas actuales
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 rounded-lg border ${esTempIdeal ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Temperatura</h4>
                  <div className="flex items-baseline">
                    <span className={`text-xl font-bold ${esTempIdeal ? 'text-green-600' : 'text-yellow-600'}`}>
                      {Math.round(clima.main.temp)}°C
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${esTempIdeal ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {esTempIdeal ? 'Óptima' : 'Fuera de rango'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ideal: {cultivo.condicionesIdeales.tempMin}°-{cultivo.condicionesIdeales.tempMax}°C
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${esHumedadIdeal ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Humedad</h4>
                  <div className="flex items-baseline">
                    <span className={`text-xl font-bold ${esHumedadIdeal ? 'text-green-600' : 'text-yellow-600'}`}>
                      {clima.main.humidity}%
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${esHumedadIdeal ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {esHumedadIdeal ? 'Óptima' : 'Fuera de rango'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ideal: {cultivo.condicionesIdeales.humedadMin}%-{cultivo.condicionesIdeales.humedadMax}%
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${esVientoIdeal ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Velocidad del viento</h4>
                  <div className="flex items-baseline">
                    <span className={`text-xl font-bold ${esVientoIdeal ? 'text-green-600' : 'text-yellow-600'}`}>
                      {clima.wind.speed} m/s
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${esVientoIdeal ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {esVientoIdeal ? 'Aceptable' : 'Alta'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Máxima recomendada: {cultivo.condicionesIdeales.vientoMax} m/s
              </p>
            </div>
            
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Condiciones generales</h4>
                  <div className="flex items-baseline">
                    <span className={`text-xl font-bold ${condicionesOptimas ? 'text-green-600' : 'text-yellow-600'}`}>
                      {clima.weather[0].description}
                    </span>
                  </div>
                </div>
                <img 
                  src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
                  alt={clima.weather[0].description}
                  className="h-8 w-8"
                />
              </div>
            </div>
          </div>
          
          {/* Consejos de cultivo */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Recomendaciones para hoy
            </h4>
            <ul className="space-y-2">
              {getConsejos().map((consejo, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{consejo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Próximas tareas */}
      <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
        <h3 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Próximas tareas
        </h3>
        <ul className="space-y-2">
          {cultivo.tareasPendientes.map(tarea => (
            <li key={tarea.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-indigo-100">
              <div className="flex items-center">
                <div className="bg-indigo-100 text-indigo-800 p-1 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">{tarea.nombre}</span>
              </div>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                en {tarea.dias} {tarea.dias === 1 ? 'día' : 'días'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resumen de condiciones ideales */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Condiciones ideales para {cultivo.nombre}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Temperatura: {cultivo.condicionesIdeales.tempMin}°-{cultivo.condicionesIdeales.tempMax}°C
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            Humedad: {cultivo.condicionesIdeales.humedadMin}%-{cultivo.condicionesIdeales.humedadMax}%
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Luz solar: {cultivo.condicionesIdeales.luzMin}+ horas
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
            </svg>
            Viento máximo: {cultivo.condicionesIdeales.vientoMax} m/s
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadoSiembra;