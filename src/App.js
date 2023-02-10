import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './components/front/Sidebar';
import {Fade} from './components/pruebasTransitions/Fade'

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const triggerSidebar = useRef(null)
    const triggerMenuIcon = useRef(null)

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
        <div className="flex flex-col h-screen">
            <header className="bg-white p-6 flex justify-between items-center sm:hidden shadow-md">
                <h1 className="font-bold text-lg">Developer</h1>
                <button ref={triggerMenuIcon}
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <i className="icofont-close"></i> : <i className="icofont-navigation-menu"></i>}
                </button>
            </header>
            <nav className="hidden sm:flex sm:items-center sm:justify-between bg-white p-6 shadow-md z-0">
                <h1 className="font-bold text-lg">Developer</h1>
                <ul className="flex">
                    <li className="mr-4">
                        <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                            About
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                            Contact
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to={"/admin"} className="text-gray-600 hover:text-gray-900">
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        
            <Sidebar triggerSidebar={triggerSidebar} isSidebarOpen={isSidebarOpen}></Sidebar>
            
            <main className="flex-1 bg-white p-6">
                {/* <h1 className="font-bold text-xl mb-4">Welcome to my app!</h1> */}
                
                {/* <Fade></Fade> */}
            </main>
        </div>
    );
};

export default App;


