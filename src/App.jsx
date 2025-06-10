import { useState, useEffect } from "react";
import { consultarGroq } from "./service/consultarGroq";
import { getByCity } from "./service/weatherService";
import Navbar from "./components/Navbar";
import CultivosFavoritos from "./components/Cultivos";
import EstadoSiembra from "./components/EstadoSiembra";

function App() {
  const [groqResponse, setGroqResponse] = useState(null);
  const [clima, setClima] = useState(null);
  const [climaError, setClimaError] = useState(null);
  const [climaLoading, setClimaLoading] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const climaInfo = clima
    ? JSON.stringify(clima, null, 2)
    : "Sin datos de clima aún";

  const message = `Soy un agricultor que cultiva rosas en ${city}. 
Este es el clima de hoy: ${climaInfo}. 
Dame recomendaciones técnicas y concisas sobre cómo cuidar las rosas hoy. 
Evita emojis, no uses un tono informal ni decorativo. La respuesta debe ser directa, profesional y útil, ya que se mostrará en una tarjeta informativa en un sitio web.`;

  const handleConsulta = async () => {
    setLoading(true);
    setGroqResponse("Consultando...");
    try {
      const respuesta = await consultarGroq(message);
      setGroqResponse(respuesta);
    } catch (error) {
      setGroqResponse(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex flex-col items-center">
      <Navbar />
      <EstadoSiembra clima={clima}/>
      <CultivosFavoritos />
      <h1 className="mt-10 mb-4 text-4xl font-bold text-green-800 drop-shadow">
        Agrobot de Cultiva Seguro
      </h1>
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-green-200 mt-10">
        {climaLoading && (
          <div className="text-gray-500 mb-4">Cargando clima...</div>
        )}
        {climaError && <div className="text-red-500 mb-4">{climaError}</div>}
        {clima && (
          <div className="mb-4 text-green-800">
            <strong>Clima actual en {city}:</strong>
            <br />
            Temperatura: {clima.main.temp}°C
            <br />
            Humedad: {clima.main.humidity}%<br />
            Estado: {clima.weather[0].description}
          </div>
        )}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={handleConsulta}
            disabled={loading || climaLoading}
            className={`bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              loading || climaLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Consultando..." : "Consultar Agrobot"}
          </button>
        </div>
        {groqResponse && (
          <div className="mt-6 bg-green-50 p-5 rounded-xl border border-green-200 shadow-inner animate-fade-in">
            <strong className="block mb-2 text-green-700">
              Respuesta AgroBot:
            </strong>
            <div className="text-gray-700 whitespace-pre-line">
              {groqResponse}
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
}

export default App;
