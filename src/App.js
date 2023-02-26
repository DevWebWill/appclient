import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from './components/front/Hero';
import { Sidebar } from './components/front/Sidebar';
import desarrolloApi from '../src/assets/desarrollo-api.png';
import bg from '../src/assets/bg.jpg';
/* import DesarrolloWebProfesionalIcon from './assets/DesarrolloWebProfesionalIcon'; */
/* import {Fade} from './components/pruebasTransitions/Fade' */

const App = () => {

    const bgImageStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: '0.1'
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const triggerSidebar = useRef(null)
    const triggerMenuIcon = useRef(null)

    useEffect(() => {
        if (localStorage.theme === 'dark'  /* || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) */) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!isSidebarOpen || (triggerSidebar !== null && triggerSidebar.current.contains(target)) || (triggerMenuIcon.current.contains(target)) ) { return; }
            console.log('mierda')
            setIsSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    return (
        <div className="flex flex-col h-screen bg-purple-900">
            <header className="fixed w-full z-20 bg-gray-900 bg-opacity-90 text-gray-200 p-6 flex justify-between items-center sm:hidden shadow-md">
                <h1 className="font-bold text-lg">Developer</h1>
                <button ref={triggerMenuIcon}
                    className="text-gray-200 hover:text-purple-100"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <i className="icofont-close"></i> : <i className="icofont-navigation-menu"></i>}
                </button>
            </header>
            <nav className="fixed hidden sm:flex sm:items-center sm:justify-between bg-transparent text-gray-200 py-6 px-6 md:px-12 lg:px-10 xl:px-16 2xl:px-24 w-full z-20">
                <h1 className="font-bold text-lg">Dev<span className='text-violet-400'>Web</span> FullStack</h1>
                <ul className="flex text-gray-200">
                    <li className="mr-4">
                        <Link to={"#"} className="hover:text-violet-400">
                            Home
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="hover:text-violet-400">
                            About
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="hover:text-violet-400">
                            Contact
                        </Link>
                    </li>
                    <li className="">
                        <Link to={"/admin"} className="hover:text-violet-400">
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        
            <Sidebar triggerSidebar={triggerSidebar} isSidebarOpen={isSidebarOpen}></Sidebar>
            
            <main className="relative bg-gradient-to-br from-black to-purple-900">
                <div className='absolute w-full h-full' style={bgImageStyle} ></div>
                {/* <h1 className="font-bold text-xl mb-4">Welcome to my app!</h1> */}
                
                {/* <Fade></Fade> */}

                <Hero></Hero>

                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 text-gray-100 mb-32 px-6 sm:px-0 md:px-4 lg:px-2 xl:px-8 2xl:px-16 pt-14'>
                    <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[45vh] rounded-lg z-1 py-4'>
                        <div className='rounded-lg sm:relative bg-purple-900 bg-opacity-50 h-full w-full left-11 sm:left-8 p-5 sm:p-3'>
                            <div className='mb-4'>
                                <img src={desarrolloApi} alt='' />
                            </div>
                            <div className='text-center text-gray-200'>
                                <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo de App Móviles</h3>
                                <span className='text-md text-gray-300'>Desarrollo de aplicaciones móviles con hermosos diseños para IOs y Android.</span>
                            </div>                                                            
                        </div>
                    </div>
                    <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[45vh] rounded-lg z-10'>
                        <div className='rounded-lg sm:relative bg-purple-900 h-full w-full shadow-2xl border-0 p-5 sm:p-3'>
                            <div className='mb-4'>
                                <img src={desarrolloApi} alt='' />
                            </div>
                            <div className='text-center text-gray-200'>
                                <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo Web</h3>
                                <span className='text-md text-gray-300'>Desarrollo web a medida, moderno, responsivo, componentes reutilizables, amigable para el usuario.</span>
                            </div>                                                            
                        </div>
                    </div>
                    <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[45vh] rounded-lg z-1 py-4'>
                        <div className='rounded-lg sm:relative bg-purple-900 bg-opacity-50 h-full w-full right-11 sm:right-8 border-0 p-5 sm:p-3'>
                            <div className='mb-4'>
                                <img src={desarrolloApi} alt='' />
                            </div>
                            <div className='text-center text-gray-200'>
                                <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Solución de problemas</h3>
                                <span className='text-md text-gray-300'>Desarrollo de soluciones innovadoras, mantenimiento y mejora de las herramientas de trabajo.</span>
                            </div>                                
                        </div>
                    </div>
                    <div className='sm:col-span-3 lg:col-span-1 relative min-h-[52vh] sm:min-h-[30vh] 2xl:min-h-[45vh] rounded-lg z-1 sm:mx-8 lg:mx-0'>
                        <div className='rounded-lg sm:relative sm:grid sm:grid-cols-2 lg:grid-cols-none flex flex-col justify-center items-center bg-purple-900 bg-opacity-50 h-full w-full right-11 sm:right-0 lg:right-11 border-0 p-5 sm:p-3 lg:p-5 sm:mt-4'>
                            <div className='static mb-4 sm:mb-0'>
                                <img className='object-fit' src={desarrolloApi} alt='' />
                            </div>
                            <div className='text-center text-gray-200 sm:px-2'>
                                <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo de APIs</h3>
                                <span className='text-md text-gray-300'>Desarrollo de software como capa de comunicación enttre diferentes aplicaciones o sistemas.</span>
                            </div>                                
                        </div>
                    </div>
                </div>
                


                <div className='grid grid-cols-3 md:grid-cols-6 gap-5 mb-24 px-6 md:px-12 lg:px-10 xl:px-16 2xl:px-24'>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                    <div className='bg-gray-700 text-gray-200 bg-opacity-25 p-5 rounded-lg'>
                        Hola
                    </div>
                </div>

                <div className='grid grid-cols-2 relative h-60 rounded-lg opacity-60 text-gray-100 my-48 px-6 md:px-12 lg:px-10 xl:px-16 2xl:px-24'>
                    <div className='border'>
                            
                    </div>
                    <div className='border'>
                        
                    </div>
                </div>

                <div className='px-6 md:px-12 lg:px-10 xl:px-16 2xl:px-24'>
                    <div className='grid grid-cols-2 h-60 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 opacity-60 shadow-xl text-gray-100 mb-32 p-10'>
                        <div className=''>
                        </div>
                        <div className=''></div>
                    </div>
                </div>

                    {/* <div className='grid grid-cols-6 gap-5 mb-12'>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                        <div className='p-5 flex items-center justify-center'>
                            <div className='bg-gray-700 text-gray-200 bg-opacity-25 rounded-full w-[100px] h-[100px] p-4'>
                                <div className='w-full h-full rounded-full border-purple-700 ring-2 shadow-2xl'></div>
                            </div>
                        </div>
                    </div> */}
                
            </main>
        </div>
    );
};

export default App;


