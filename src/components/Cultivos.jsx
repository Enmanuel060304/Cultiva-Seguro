import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Servicio simulado para consultas a IA (en un proyecto real, conectarías a una API real)
const consultarIA = async (cultivo, ciudad) => {
  // Simulamos un retraso de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Respuestas predefinidas para diferentes cultivos
  const respuestas = {
    "Maíz": `**Recomendaciones para el cultivo de Maíz en ${ciudad}**\n\n` +
            `🌽 **Condiciones actuales:**\n` +
            `- Temperatura óptima: 25-30°C (actual: 28°C)\n` +
            `- Humedad requerida: 50-70% (actual: 60%)\n\n` +
            `✅ **Recomendaciones:**\n` +
            `1. Realizar riego cada 3 días durante la mañana\n` +
            `2. Aplicar fertilizante nitrogenado en la etapa de crecimiento\n` +
            `3. Monitorear presencia de gusano cogollero\n` +
            `4. Preparar suelo con buen drenaje\n\n` +
            `📅 **Próximos pasos:**\n` +
            `- La próxima semana es ideal para la siembra\n` +
            `- Considerar rotación de cultivos después de la cosecha`,
            
    "Frijol": `**Recomendaciones para el cultivo de Frijol en ${ciudad}**\n\n` +
              `🫘 **Condiciones actuales:**\n` +
              `- Temperatura óptima: 20-25°C (actual: 24°C)\n` +
              `- Humedad requerida: 40-60% (actual: 55%)\n\n` +
              `✅ **Recomendaciones:**\n` +
              `1. Riego moderado cada 4 días\n` +
              `2. Controlar malezas durante las primeras semanas\n` +
              `3. Aplicar fungicida preventivo para roya\n` +
              `4. Sembrar en surcos con 50cm de separación\n\n` +
              `⚠️ **Alertas:**\n` +
              `- Posible lluvia intensa en 3 días, proteger cultivos`,
              
    "Tomate": `**Recomendaciones para el cultivo de Tomate en ${ciudad}**\n\n` +
              `🍅 **Condiciones actuales:**\n` +
              `- Temperatura óptima: 18-25°C (actual: 26°C)\n` +
              `- Humedad requerida: 60-80% (actual: 65%)\n\n` +
              `✅ **Recomendaciones:**\n` +
              `1. Incrementar riego a diario durante floración\n` +
              `2. Tutorar plantas para mejor desarrollo\n` +
              `3. Controlar plagas con insecticida orgánico\n` +
              `4. Podar brotes laterales para mejorar producción\n\n` +
              `📅 **Calendario:**\n` +
              `- Cosechar en 70-90 días\n` +
              `- Rotar cultivo después de cosecha`,
              
    "Arroz": `**Recomendaciones para el cultivo de Arroz en ${ciudad}**\n\n` +
             `🍚 **Condiciones actuales:**\n` +
             `- Temperatura óptima: 25-35°C (actual: 30°C)\n` +
             `- Humedad requerida: Alta (actual: 70%)\n\n` +
             `✅ **Recomendaciones:**\n` +
             `1. Mantener nivel de agua constante\n` +
             `2. Controlar malezas con herbicida selectivo\n` +
             `3. Aplicar fertilizante fosforado\n` +
             `4. Monitorear presencia de pulgones\n\n` +
             `⚠️ **Alertas:**\n` +
             `- Temperatura podría aumentar, aumentar riego`,
             
    "Papa": `**Recomendaciones para el cultivo de Papa en ${ciudad}**\n\n` +
            `🥔 **Condiciones actuales:**\n` +
            `- Temperatura óptima: 15-20°C (actual: 22°C)\n` +
            `- Humedad requerida: 70-80% (actual: 75%)\n\n` +
            `✅ **Recomendaciones:**\n` +
            `1. Aporcar plantas para proteger tubérculos\n` +
            `2. Controlar humedad para prevenir tizón tardío\n` +
            `3. Rotar cultivos para evitar enfermedades\n` +
            `4. Fertilizar con potasio para mejor desarrollo\n\n` +
            `📅 **Próximos pasos:**\n` +
            `- Cosechar en 90-120 días\n` +
            `- Almacenar en lugar fresco y seco`
  };
  
  return respuestas[cultivo] || `No hay recomendaciones específicas para ${cultivo} en este momento.`;
};

export default function CultivosFavoritos({ expandedView = false, city = "Managua" }) {
  const [cultivos, setCultivos] = useState([
    {
      id: 1,
      nombre: "Maíz",
      estado: "Favorable",
      estadoColor: "bg-green-100 text-green-800",
      descripcion: "Cereal ampliamente cultivado en muchas regiones. Requiere temperaturas cálidas y suelos bien drenados.",
      temporada: "120-180 días",
      favorito: true,
      icono: "🌽",
      dificultad: "Media",
      clima: "Tropical y subtropical",
      requerimientos: "Suelo fértil, riego moderado"
    },
    {
      id: 2,
      nombre: "Frijol",
      estado: "Favorable",
      estadoColor: "bg-green-100 text-green-800",
      descripcion: "Leguminosa rica en proteínas. Se adapta a diversos climas y suelos.",
      temporada: "90-120 días",
      favorito: true,
      icono: "🫘",
      dificultad: "Baja",
      clima: "Templado",
      requerimientos: "Suelo bien drenado, exposición solar"
    },
    {
      id: 3,
      nombre: "Tomate",
      estado: "Precaución",
      estadoColor: "bg-yellow-100 text-yellow-800",
      descripcion: "Fruta roja utilizada en diversas cocinas. Sensible a cambios de temperatura.",
      temporada: "70-90 días",
      favorito: false,
      icono: "🍅",
      dificultad: "Alta",
      clima: "Cálido",
      requerimientos: "Suelo rico en nutrientes, riego constante"
    },
    {
      id: 4,
      nombre: "Arroz",
      estado: "Favorable",
      estadoColor: "bg-green-100 text-green-800",
      descripcion: "Cereal básico en muchas dietas. Requiere grandes cantidades de agua.",
      temporada: "150-210 días",
      favorito: false,
      icono: "🍚",
      dificultad: "Media",
      clima: "Tropical",
      requerimientos: "Suelo arcilloso, alta humedad"
    },
    {
      id: 5,
      nombre: "Papa",
      estado: "Precaución",
      estadoColor: "bg-yellow-100 text-yellow-800",
      descripcion: "Tubérculo altamente nutritivo. Sensible a plagas si no se controla.",
      temporada: "90-120 días",
      favorito: false,
      icono: "🥔",
      dificultad: "Media",
      clima: "Templado",
      requerimientos: "Suelo suelto, buen drenaje"
    },
    {
      id: 6,
      nombre: "Zanahoria",
      estado: "Favorable",
      estadoColor: "bg-green-100 text-green-800",
      descripcion: "Raíz comestible rica en vitamina A. Crece bien en suelos arenosos.",
      temporada: "70-100 días",
      favorito: false,
      icono: "🥕",
      dificultad: "Baja",
      clima: "Templado",
      requerimientos: "Suelo profundo, sin piedras"
    },
    {
      id: 7,
      nombre: "Lechuga",
      estado: "Favorable",
      estadoColor: "bg-green-100 text-green-800",
      descripcion: "Verdura de hoja para ensaladas. Requiere temperaturas frescas.",
      temporada: "50-70 días",
      favorito: false,
      icono: "🥬",
      dificultad: "Baja",
      clima: "Fresco",
      requerimientos: "Riego constante, sombra parcial"
    },
    {
      id: 8,
      nombre: "Fresa",
      estado: "Precaución",
      estadoColor: "bg-yellow-100 text-yellow-800",
      descripcion: "Fruta pequeña y dulce. Requiere cuidados especiales contra plagas.",
      temporada: "90-120 días",
      favorito: false,
      icono: "🍓",
      dificultad: "Alta",
      clima: "Templado",
      requerimientos: "Suelo ácido, buen drenaje"
    }
  ]);

  // Estados para la consulta a IA
  const [cultivoConsultando, setCultivoConsultando] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState(null);
  const [cargandoRecomendaciones, setCargandoRecomendaciones] = useState(false);
  const [errorRecomendaciones, setErrorRecomendaciones] = useState(null);

  const toggleFavorito = (id) => {
    setCultivos(cultivos.map(c => 
      c.id === id ? { ...c, favorito: !c.favorito } : c
    ));
  };

  const manejarConsultaCultivo = async (cultivo) => {
    setCultivoConsultando(cultivo);
    setCargandoRecomendaciones(true);
    setErrorRecomendaciones(null);
    setRecomendaciones(null);
    
    try {
      const resultado = await consultarIA(cultivo.nombre, city);
      setRecomendaciones(resultado);
    } catch (error) {
      setErrorRecomendaciones("Error al consultar las recomendaciones. Intente nuevamente.");
      console.error("Error en consulta IA:", error);
    } finally {
      setCargandoRecomendaciones(false);
    }
  };

  const cultivosFavoritos = cultivos.filter(c => c.favorito);
  const cultivosDisponibles = cultivos.filter(c => !c.favorito);

  return (
    <div className={`bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border border-green-100 ${expandedView ? 'p-8' : 'p-6'}`}>
      {expandedView ? (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Mis Cultivos Favoritos
          </h2>
          <p className="text-gray-600 mt-2">Gestiona tus cultivos preferidos y descubre nuevas opciones</p>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Mis Cultivos Favoritos
            </h2>
            {cultivosFavoritos.length > 0 && (
              <Link 
                to="/cultivos-favoritos" 
                className="text-sm font-medium text-green-600 hover:text-green-800 flex items-center gap-1 transition-colors"
              >
                Ver todos
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Cultivos disponibles - solo en vista expandida */}
      {expandedView && (
        <div className="mb-10 bg-white rounded-xl p-5 shadow-sm border border-green-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Cultivos disponibles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cultivosDisponibles.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleFavorito(c.id)}
                className="group bg-gradient-to-br from-white to-green-50 hover:from-green-50 hover:to-green-100 border border-green-200 rounded-xl p-4 flex flex-col items-center transition-all hover:shadow-md hover:border-green-300"
              >
                <span className="text-3xl mb-2 transition-transform group-hover:scale-110">{c.icono}</span>
                <span className="font-semibold text-gray-800 group-hover:text-green-700">{c.nombre}</span>
                <span className={`text-xs px-2 py-1 rounded-full mt-2 ${c.estadoColor}`}>
                  {c.estado}
                </span>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {c.temporada}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cultivos favoritos */}
      <div>
        {!expandedView && (
          <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Tus cultivos favoritos:
          </h3>
        )}
        
        {cultivosFavoritos.length > 0 ? (
          <div className={`grid ${expandedView ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1 gap-4'}`}>
            {cultivosFavoritos.map((c) => (
              <div key={c.id} className="bg-gradient-to-br from-white to-green-50 rounded-xl border border-green-200 p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <span className="text-3xl">{c.icono}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xl text-green-800">{c.nombre}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${c.estadoColor}`}>
                          {c.estado}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{c.descripcion}</p>
                      
                      {expandedView && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="flex items-center text-sm text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span><span className="font-medium">Temporada:</span> {c.temporada}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span><span className="font-medium">Dificultad:</span> {c.dificultad}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                            </svg>
                            <span><span className="font-medium">Clima:</span> {c.clima}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <span><span className="font-medium">Requerimientos:</span> {c.requerimientos}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => toggleFavorito(c.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                      title="Quitar de favoritos"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Botón de consulta a IA */}
                    {expandedView && (
                      <button
                        onClick={() => manejarConsultaCultivo(c)}
                        disabled={cargandoRecomendaciones && cultivoConsultando?.id === c.id}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          cultivoConsultando?.id === c.id && recomendaciones 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                        title="Obtener recomendaciones basadas en el clima actual"
                      >
                        {cargandoRecomendaciones && cultivoConsultando?.id === c.id ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Consultando...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Consultar IA
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Resultados de la consulta a IA */}
                {expandedView && cultivoConsultando?.id === c.id && (
                  <div className="mt-4 border-t border-green-200 pt-4">
                    {errorRecomendaciones ? (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-sm text-red-700">
                        {errorRecomendaciones}
                      </div>
                    ) : recomendaciones ? (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h5 className="font-bold text-blue-800">Recomendaciones de Agrobot para {c.nombre}</h5>
                        </div>
                        <div className="text-gray-700 whitespace-pre-line text-sm">
                          {recomendaciones}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
                
                {!expandedView && (
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Temporada: {c.temporada}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl border-2 border-dashed border-green-200 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h4 className="mt-4 text-xl font-semibold text-gray-700">No tienes cultivos favoritos</h4>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              {expandedView 
                ? "Selecciona algunos cultivos de la lista superior para agregarlos a tus favoritos" 
                : "Agrega cultivos a tus favoritos para un acceso rápido"}
            </p>
            
            {expandedView ? (
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar cultivos sugeridos
              </button>
            ) : (
              <Link 
                to="/cultivos-favoritos" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Explorar cultivos
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Enlace para volver al dashboard en vista expandida */}
      {expandedView && (
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al dashboard
          </Link>
        </div>
      )}
    </div>
  );
}