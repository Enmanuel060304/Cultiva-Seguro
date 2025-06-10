# Cultiva Seguro

Cultiva Seguro es una aplicación web que ayuda a agricultores a tomar mejores decisiones sobre el cultivo, brindando información climática actual y recomendaciones técnicas personalizadas para el cuidado de sus cultivos.

## ¿Qué hace la app?

- **Consulta el clima actual** de una ciudad (por defecto, Managua) usando la API de OpenWeather.
- **Evalúa si las condiciones climáticas son óptimas para la siembra** y muestra un mensaje claro y visual.
- **Ofrece recomendaciones técnicas** generadas por IA (Groq API) para el cuidado de cultivos, basadas en el clima actual.
- **Muestra una lista de cultivos favoritos** con su estado actual.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeather API](https://openweathermap.org/api)
- [Groq API](https://console.groq.com/)
- [Axios](https://axios-http.com/)

## Instalación y uso

1. Clona el repositorio.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` en la raíz con tus claves de API:
   ```
   VITE_GROQ_API=tu_clave_groq
   VITE_WEATHER_API=tu_clave_openweather
   ```
4. Inicia la app en modo desarrollo:
   ```sh
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura principal

- `src/App.jsx`: Componente principal, maneja la lógica de clima y recomendaciones.
- `src/components/Navbar.jsx`: Barra de navegación.
- `src/components/EstadoSiembra.jsx`: Evalúa condiciones de siembra.
- `src/components/Cultivos.jsx`: Lista de cultivos favoritos.
- `src/service/consultarGroq.js`: Llama a la API de Groq para obtener recomendaciones.
- `src/service/weatherService.js`: Llama a la API de OpenWeather.

## Créditos

Desarrollado por [tu nombre o equipo].

---
¡Cultiva con información y seguridad!# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
