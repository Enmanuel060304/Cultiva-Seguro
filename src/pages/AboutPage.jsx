// pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import EnmanuelUrbinaImg from '../images/Enmanuel-Urbina.jpg';
import RomanGriosImg from '../images/Roman-Grios.jpg'

const AboutPage = () => {
return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-green-800 mb-4">Sobre Cultiva Seguro</h1>
                <div className="h-1 w-24 bg-green-600 mx-auto mb-6"></div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Proyecto académico desarrollado por estudiantes de la Universidad Nacional de Ingeniería
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-600 p-3 rounded-xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-800">Nuestro Propósito</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Cultiva Seguro es un proyecto académico desarrollado como parte de nuestra formación en la Universidad Nacional de Ingeniería. 
                        Buscamos aplicar nuestros conocimientos en tecnología para resolver problemas reales en el sector agrícola.
                    </p>
                    <p className="text-gray-700">
                        Nuestra misión es crear herramientas accesibles que ayuden a los pequeños agricultores a tomar mejores decisiones 
                        basadas en datos climáticos y buenas prácticas agrícolas.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                    <div className="flex items-center mb-6">
                        <div className="bg-green-600 p-3 rounded-xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-800">Visión Académica</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                        Como estudiantes de último año de Ingeniería en Computación, buscamos demostrar cómo la tecnología puede ser 
                        aplicada para mejorar sectores tradicionales como la agricultura.
                    </p>
                    <p className="text-gray-700">
                        Aspiramos a que este proyecto sirva como base para futuras investigaciones y desarrollos que beneficien 
                        al sector agrícola nicaragüense.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-green-100">
                <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">¿Cómo Funciona Cultiva Seguro?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">1</span>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Integración de Datos</h3>
                        <p className="text-gray-600">
                            Conectamos con APIs meteorológicas para obtener datos climáticos en tiempo real de diferentes regiones.
                        </p>
                    </div>
                    
                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Inteligencia Artificial</h3>
                        <p className="text-gray-600">
                            Utilizamos modelos de lenguaje para analizar condiciones y generar recomendaciones específicas para cada cultivo.
                        </p>
                    </div>
                    
                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">3</span>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Interfaz Intuitiva</h3>
                        <p className="text-gray-600">
                            Diseñamos una plataforma accesible que permite a los agricultores obtener información valiosa sin necesidad de conocimientos técnicos.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Desarrolladores del Proyecto</h2>
                <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
                    Estudiantes de último año de Ingeniería en Computación en la Universidad Nacional de Ingeniería (UNI)
                </p>
                
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-green-100 flex items-center justify-center">
                            <img
                                src={EnmanuelUrbinaImg}
                                alt="Jose Enmanuel Urbina Fierro"
                                className="object-cover w-full h-full"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Jose Enmanuel Urbina Fierro</h3>
                        <p className="text-gray-600">Estudiante de Ingeniería en Computación</p>
                        <p className="text-sm text-gray-500">Universidad Nacional de Ingeniería</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-4 overflow-hidden border-4 border-green-100 flex items-center justify-center">
                            <img
                                src={RomanGriosImg}
                                alt="Roman Alfonso Grios Boza"
                                className="object-cover w-full h-full"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Roman Alfonso Grios Boza</h3>
                        <p className="text-gray-600">Estudiante de Ingeniería en Computación</p>
                        <p className="text-sm text-gray-500">Universidad Nacional de Ingeniería</p>
                    </div>
                </div>
                
                <div className="mt-12 text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Información Académica</h3>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 max-w-2xl mx-auto">
                        <p className="text-gray-700 mb-4">
                            Este proyecto fue desarrollado como parte del trabajo académico para la Asignatura Tendencias Tecnologicas
                        </p>
                        <p className="text-gray-700">
                            Nuestro objetivo es demostrar la aplicación de tecnologías modernas y en Tendencias en la solución de problemas reales 
                            del sector agrícola nicaragüense.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link 
                    to="/" 
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al inicio
                </Link>
            </div>
        </div>
    </div>
);
};

export default AboutPage;