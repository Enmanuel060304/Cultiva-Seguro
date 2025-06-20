// pages/AgrobotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { consultarGroq } from '../service/consultarGroq';
import { getByCity } from '../service/weatherService';

const AgrobotPage = () => {
  const [messages, setMessages] = useState([]);
  const [clima, setClima] = useState(null);
  const [climaError, setClimaError] = useState(null);
  const [climaLoading, setClimaLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const city = "Managua";
  
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleConsulta = async (customInput = null) => {
    setLoading(true);
    
    const userMessage = {
      text: customInput || "Dame recomendaciones agrícolas generales",
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const tempBotMessage = {
      text: "Consultando...",
      sender: 'agrobot',
      isTemp: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, tempBotMessage]);

    try {
      const baseMessage = `Recomendaciones agrícolas para ${city}:\n`;
      const weatherContext = `Condiciones climáticas actuales: ${JSON.stringify(clima, null, 2)}\n`;
      
      const message = customInput 
        ? `${customInput}\n\n${weatherContext}`
        : baseMessage + weatherContext;

      const respuesta = await consultarGroq(message);
      
      setMessages(prev => prev.map(msg => 
        msg.isTemp ? { 
          text: respuesta, 
          sender: 'agrobot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.isTemp ? { 
          text: `Error: ${error.message}`, 
          sender: 'agrobot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } : msg
      ));
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
    <div className="h-screen w-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Encabezado */}
        <div className="bg-green-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h1 className="text-2xl font-bold">Agrobot 🌱</h1>
            </div>
            <div className="flex items-center bg-green-700 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{city}</span>
            </div>
          </div>
        </div>

        {/* Área de chat - Ocupa todo el espacio disponible */}
        <div className="flex-1 overflow-hidden max-w-7xl w-full mx-auto">
          <div className="h-full flex flex-col">
            {/* Historial de mensajes con scroll */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-600">Bienvenido a Agrobot</h3>
                  <p className="mt-2 max-w-md">Realiza tu primera consulta sobre agricultura, cultivos o condiciones climáticas.</p>
                  <div className="mt-6 w-full max-w-lg mx-auto bg-green-50 p-6 rounded-xl border border-green-200">
                    <p className="font-medium text-green-800 mb-2">Ejemplos:</p>
                    <ul className="text-left list-disc pl-5 space-y-1 text-gray-600">
                      <li>¿Cómo preparar el suelo para sembrar maíz?</li>
                      <li>¿Qué plagas afectan comúnmente a los cultivos de café?</li>
                      <li>Recomendaciones para el riego en época seca</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-3xl rounded-2xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-green-600 text-white rounded-br-none' 
                            : 'bg-green-50 text-gray-700 border border-green-200 rounded-bl-none'
                        }`}
                      >
                        <div className="font-medium text-xs opacity-80 mb-1">
                          {message.sender === 'user' ? 'Tú' : 'Agrobot'} • {message.timestamp}
                        </div>
                        {message.isTemp ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin h-4 w-4 mr-2 text-current"
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
                            {message.text}
                          </div>
                        ) : (
                          <div className="whitespace-pre-line">{message.text}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Área de entrada */}
            <div className="border-t border-gray-200 bg-white p-4">
              <form onSubmit={handleUserSubmit} className="max-w-7xl mx-auto">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Escribe tu consulta agrícola..."
                    className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !userInput.trim()}
                    className={`bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors text-lg ${
                      loading || !userInput.trim() ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
              
              <div className="max-w-7xl mx-auto mt-4">
                <button
                  onClick={() => handleConsulta()}
                  disabled={loading}
                  className={`
                    bg-gradient-to-r from-green-500 to-green-700 
                    hover:from-green-600 hover:to-green-800
                    text-white px-8 py-4 rounded-xl font-bold
                    shadow-lg transition duration-300
                    hover:shadow-xl w-full
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgrobotPage;