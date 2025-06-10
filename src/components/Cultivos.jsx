 export default function CultivosFavoritos() {
const cultivos = [
    {
      nombre: "Maíz",
      estado: "Favorable",
      estadoColor: "text-green-600",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTyrsDusQFw5p6tyUw1JfmVCNUFRf779DZwm7Pz684-K4ihXBtBx-P2baRhwwn_23J2y7KBVI1Q3UoMLJIV80ZZ-Q", // Maíz
    },
    {
      nombre: "Frijol",
      estado: "Favorable",
      estadoColor: "text-green-600",
      img: "https://walmartni.vtexassets.com/arquivos/ids/373130/Frijol-Sabemas-Granel-Rojo-1Lb-2-99.jpg?v=638458870360170000", // Frijol
    },
    {
      nombre: "Tomate",
      estado: "Precaución",
      estadoColor: "text-yellow-600",
      img: "https://sicarfarms.com/wp-content/uploads/2021/01/Tomate-Roma.png", // Tomate
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-14">
      <h2 className="text-2xl font-bold mb-6 text-green-900">Mis Cultivos Favoritos</h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-4">
        {cultivos.map((c, i) => (
          <div
            key={i}
            className="bg-white min-w-[320px] rounded-2xl shadow p-6 flex flex-col justify-between gap-6 border border-green-50"
          >
            <div>
              <div className="text-lg font-bold text-green-900">{c.nombre}</div>
              <div className={`mb-3 ${c.estadoColor} font-medium text-sm`}>{c.estado}</div>
              <button className="bg-green-50 hover:bg-green-100 text-green-900 font-semibold px-4 py-2 rounded-lg shadow-sm border border-green-100 transition-all flex items-center gap-2">
                Ver más <span aria-hidden>→</span>
              </button>
            </div>
            <img
              src={c.img}
              alt={c.nombre}
              className="w-48 h-28 object-cover rounded-xl border border-green-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}