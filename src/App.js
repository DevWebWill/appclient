import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import bg from '../src/assets/bg.jpg';

/* import { setUser } from './state/userSlice'
import { useDispatch, useSelector } from 'react-redux'; */

import { Hero } from './components/front/Hero';
import { Services } from './components/front/Services';
import { Sidebar } from './components/front/Sidebar';

/* import DesarrolloWebProfesionalIcon from './assets/DesarrolloWebProfesionalIcon'; */
/* import {Fade} from './components/pruebasTransitions/Fade' */

const App = () => {
    /* const user = useSelector((state) => state.user)
    const dispatch = useDispatch() */

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
            //console.log('mierda')
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
                            Inicio
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="hover:text-violet-400">
                            Sobre
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="hover:text-violet-400">
                            Contacto
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
                
                {/* <Fade></Fade> */}

                <Hero></Hero>

                <Services></Services>
                
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
                        {/* <div>
                            <div>
                                <button onClick={() => dispatch(setName('juan'))}>
                                    Set Juan
                                </button>
                                <br></br>
                                <button onClick={() => dispatch(setName('pepe'))}>
                                    Set Pepe
                                </button>
                                <div>{user.name}</div>
                                
                            </div>
                        </div> */}
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


