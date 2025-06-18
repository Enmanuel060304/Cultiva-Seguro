// pages/AgrobotPage.jsx
import React, { useState, useEffect } from 'react';
import { consultarGroq } from '../service/consultarGroq';
import { getByCity } from '../service/weatherService';

const AgrobotPage = () => {
  const [groqResponse, setGroqResponse] = useState(null);
  const [clima, setClima] = useState(null);
  const [climaError, setClimaError] = useState(null);
  const [climaLoading, setClimaLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const city = "Managua";

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
      const baseMessage = `Recomendaciones agrícolas para ${city}:\n`;
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Agrobot 🌱</h1>
          <p className="text-gray-600 mt-2">Asistente inteligente para tus consultas agrícolas</p>
          
          <div className="mt-4 inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-green-700">{city}</span>
          </div>
        </div>

        {/* Sección de Agrobot con input */}
        <div className="bg-white rounded-2xl border border-green-200 p-6 mb-8 shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-green-600 text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800">Chat con Agrobot</h3>
          </div>
          
          <form onSubmit={handleUserSubmit} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Pregunta algo sobre cultivos, clima o técnicas agrícolas..."
                className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !userInput.trim()}
                className={`bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-r-lg font-medium transition-colors ${
                  loading || !userInput.trim() ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Ej: "¿Cómo preparar el suelo para sembrar rosas?" o "¿Qué cultivos son ideales para esta época?"
            </p>
          </form>

          {/* Botón de recomendaciones generales */}
          <div className="text-center mb-6">
            <button
              onClick={() => handleConsulta()}
              disabled={loading}
              className={`
                bg-gradient-to-r from-green-600 to-green-800 
                hover:from-green-700 hover:to-green-900
                text-white px-8 py-4 rounded-xl font-bold
                shadow-lg transform transition duration-300
                hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-green-400
                w-full max-w-md
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generando recomendaciones...
                </div>
              ) : (
                "Obtener recomendaciones generales"
              )}
            </button>
          </div>

          {/* Respuesta del Agrobot */}
          {groqResponse && (
            <div className="mt-6 bg-green-50 p-6 rounded-2xl border border-green-200">
              <div className="bg-white p-5 rounded-lg border border-green-100 shadow-sm">
                <div className="text-gray-700 whitespace-pre-line">
                  {groqResponse}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(groqResponse)
                    }
                    className="flex items-center text-green-600 hover:text-green-800 text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copiar recomendaciones
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AgrobotPage;