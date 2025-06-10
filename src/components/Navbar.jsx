import { WiDaySunny, WiCloud, WiRaindrop } from "react-icons/wi";

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-green-600 via-blue-500 to-cyan-400 bg-opacity-80 backdrop-blur-md px-8 py-4 flex items-center justify-between shadow-lg rounded-b-2xl border-b border-white/20">
      <div className="flex items-center gap-3">
        <WiDaySunny className="text-4xl text-yellow-300 drop-shadow" />
        <span className="font-extrabold text-3xl tracking-tight drop-shadow">Cultiva Seguro</span>
      </div>
      <ul className="flex gap-8 items-center">
        <li>
          <a href="#" className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition">
            <WiDaySunny className="text-2xl" />
            <span className="font-medium">Inicio</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition">
            <WiCloud className="text-2xl" />
            <span className="font-medium">Clima</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 hover:bg-white/20 px-4 py-2 rounded-lg transition">
            <WiRaindrop className="text-2xl" />
            <span className="font-medium">Recomendaciones</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;