import React from "react";

function EstadoSiembra({ clima }) {
  if (!clima) {
    return (
      <div className="mb-8 p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-200 text-yellow-800 font-medium shadow-lg flex items-center gap-4">
        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m8-8h2M2 12H4m15.07 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span>
          Información climática no disponible para evaluar condiciones de siembra.
        </span>
      </div>
    );
  }

  const temp = clima.main.temp;
  const humedad = clima.main.humidity;
  const descripcion = clima.weather[0].description;

  // Lógica simple de ejemplo: apto si temp entre 18-28°C y humedad entre 50-80%
  const apto = temp >= 18 && temp <= 28 && humedad >= 50 && humedad <= 80;

  return (
    <div
      className={`mb-10 p-7 rounded-2xl border-2 shadow-xl font-semibold flex items-center gap-6 ${
        apto
          ? "bg-green-50 border-green-400 text-green-900"
          : "bg-red-50 border-red-300 text-red-800"
      }`}
    >
      <div>
        {apto ? (
          <svg className="w-14 h-14 text-yellow-400 mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
          </svg>
        ) : (
          <svg className="w-14 h-14 text-red-400 mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </div>
      <div>
        <span className="block text-xl font-bold mb-2">
          {apto ? "Condiciones óptimas para siembra" : "Condiciones no ideales para siembra"}
        </span>
        <span className="block mb-1">
          {apto
            ? "El clima actual favorece la germinación y el establecimiento de cultivos. Temperatura y humedad dentro de rangos recomendados para la mayoría de especies agrícolas."
            : `Se recomienda posponer la siembra. Las condiciones actuales (${temp}°C, ${humedad}% humedad, ${descripcion}) pueden afectar el desarrollo inicial del cultivo.`}
        </span>
        <span className="block text-sm mt-2 opacity-80">
          <strong>Temperatura:</strong> {temp}°C &nbsp;|&nbsp;
          <strong>Humedad:</strong> {humedad}% &nbsp;|&nbsp;
          <strong>Estado:</strong> {descripcion}
        </span>
      </div>
    </div>
  );
}

export default EstadoSiembra;