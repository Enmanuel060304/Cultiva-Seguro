import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { consultarGroq } from "./service/consultarGroq";
import { getByCity } from "./service/weatherService";
import Navbar from "./components/Navbar";
import CultivosFavoritosPage from "./pages/CultivosFavoritosPage";
import AgrobotPage from './pages/AgroBotPage';
import AboutPage from './pages/AboutPage';
// Componente para las tarjetas de métricas climáticas
const MetricCard = ({ icon, value, label, optimal, description }) => (
  <div className={`p-4 rounded-xl border ${optimal ? 'bg-white border-green-300 shadow-green-100 shadow-sm' : 'bg-white border-red-300 shadow-red-100 shadow-sm'}`}>
    <div className="flex items-center">
      <div className="text-2xl mr-3">{icon}</div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
    {description && <p className="text-xs mt-2 text-gray-400">{description}</p>}
  </div>
);

function App() {
  const [groqResponse, setGroqResponse] = useState(null);
  const [clima, setClima] = useState(null);
  const [climaError, setClimaError] = useState(null);
  const [climaLoading, setClimaLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const city = "Managua";

  // Función para determinar si las condiciones son óptimas para siembra
  const esOptimoParaSiembra = (climaData) => {
    return (
      climaData.main.temp > 15 && 
      climaData.main.temp < 30 && 
      climaData.main.humidity > 40 && 
      climaData.main.humidity < 80 &&
      climaData.wind.speed < 5 &&
      !climaData.weather[0].main.includes('Rain')
    );
  };

  useEffect(() => {
    setClimaLoading(true);
    getByCity(city)
      .then((c) => {
        setClima(c);
        setClimaError(null);
      })
      .catch((e) => setClimaError(e.message))
      .finally(() => setClimaLoading(false));
  }, []);

  const handleConsulta = async (customInput = null) => {
    setLoading(true);
    setGroqResponse("Consultando...");
    try {
      const baseMessage = `Recomendaciones para el cuidado de rosas en la ciudad de ${city}:\n`;
      const weatherContext = `Condiciones climáticas actuales: ${JSON.stringify(clima, null, 2)}\n`;
      
      const message = customInput 
        ? `${customInput}\n\n${weatherContext}`
        : baseMessage + weatherContext;

      const respuesta = await consultarGroq(message);
      setGroqResponse(respuesta);
    } catch (error) {
      setGroqResponse(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== "") {
      handleConsulta(userInput);
      setUserInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
              <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Título y ubicación */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-green-800 mb-2">
                    Cultiva Seguro 🌱
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Monitoreo inteligente para tus cultivos
                  </p>
                  <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-green-700">{city}</span>
                  </div>
                </div>

                {/* Estado de carga y errores */}
                {climaLoading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    <span className="ml-3 text-gray-600">Cargando datos climáticos...</span>
                  </div>
                )}

                {climaError && (
                  <div className="mt-3 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-8">
                    <strong>Error:</strong> {climaError}
                  </div>
                )}

                {/* Panel principal */}
                {clima && (
                  <>
                    {/* Tarjeta de estado principal */}
                    <div 
                      className={`p-6 rounded-2xl shadow-md mb-8 border-2 ${
                        esOptimoParaSiembra(clima) 
                          ? 'bg-gradient-to-r from-green-100 to-green-50 border-green-300' 
                          : 'bg-gradient-to-r from-red-100 to-red-50 border-red-300'
                      } transition-all duration-500`}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            {esOptimoParaSiembra(clima) ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Condiciones óptimas para siembra
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Condiciones no óptimas para siembra
                              </>
                            )}
                          </h2>
                          <p className="text-gray-600 mt-2">
                            {esOptimoParaSiembra(clima) 
                              ? 'El clima actual es favorable para actividades de siembra.' 
                              : 'Las condiciones climáticas no son ideales para sembrar hoy.'}
                          </p>
                          <div className="mt-3 text-sm bg-white/50 p-2 rounded-lg">
                            <span className="font-medium">Cultivo recomendado:</span> Rosas 🌹
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-6xl">
                          {esOptimoParaSiembra(clima) ? '👍' : '👎'}
                        </div>
                      </div>
                    </div>

                    {/* Información detallada */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Grid de métricas climáticas */}
                      <div className="bg-white p-5 rounded-2xl border border-green-200 shadow-sm">
                        <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                          </svg>
                          Condiciones Actuales
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <MetricCard 
                            icon={
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                              </svg>
                            }
                            value={`${Math.round(clima.main.temp)}°C`} 
                            label="Temperatura" 
                            optimal={clima.main.temp > 15 && clima.main.temp < 30}
                            description="Óptimo: 15°C - 30°C"
                          />
                          
                          <MetricCard 
                            icon={
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                              </svg>
                            }
                            value={`${clima.main.humidity}%`} 
                            label="Humedad" 
                            optimal={clima.main.humidity > 40 && clima.main.humidity < 80}
                            description="Óptimo: 40% - 80%"
                          />
                          
                          <MetricCard 
                            icon={
                              clima.weather[0].main.includes('Rain') ? 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            }
                            value={clima.weather[0].main.includes('Rain') ? 'Sí' : 'No'} 
                            label="Lluvia" 
                            optimal={!clima.weather[0].main.includes('Rain')}
                            description="Óptimo: Sin lluvia"
                          />
                          
                          <MetricCard 
                            icon={
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            }
                            value={`${clima.wind.speed} m/s`} 
                            label="Viento" 
                            optimal={clima.wind.speed < 5}
                            description="Óptimo: < 5 m/s"
                          />
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="bg-white p-5 rounded-2xl border border-green-200 shadow-sm">
                        <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Información Agrícola
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Temporada de siembra</h4>
                              <p className="text-sm text-gray-600">Época ideal: Octubre - Marzo</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Riego recomendado</h4>
                              <p className="text-sm text-gray-600">Cada 2 días en temporada seca</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Fertilización</h4>
                              <p className="text-sm text-gray-600">Cada 15 días con NPK 15-15-15</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">Protección contra plagas</h4>
                              <p className="text-sm text-gray-600">Aplicar neem cada 10 días</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          }
        />

        <Route path="/cultivos-favoritos" element={<CultivosFavoritosPage />} />
        <Route path="/agrobot" element={<AgrobotPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;