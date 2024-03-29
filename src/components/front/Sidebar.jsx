import React from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group';

const duration = 400;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  display: 'none'
};

const transitionStyles = {
  entering: { opacity: 0.95, display: 'block' },
  entered: { opacity: 0.95, display: 'block' },
  exiting: { opacity: 0, display: 'none' },
  exited: { opacity: 0, display: 'none' },
};

export const Sidebar = ({triggerSidebar, isSidebarOpen}) => {
    return (
        <Transition nodeRef={triggerSidebar} in={isSidebarOpen} timeout={duration}>
            {state => (
                <aside
                    ref={triggerSidebar}
                    className={`absolute bg-gray-200 opacity-95 w-72 h-full backdrop-blur-3xl z-40`}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    {/* <div className='bg-red-200 absolute -z-10 w-full h-60 backdrop-blur-lg'></div> */}
                    <nav className='m-6 z-10'>
                        <ul className="flex flex-col">
                            <li className="mb-4">
                                <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                                    Inicio
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                                    Sobre
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link to={"#"} className="text-gray-600 hover:text-gray-900">
                                    Contacto
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link to={"/admin"} className="text-gray-600 hover:text-gray-900">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
            )}
        </Transition>
    )
}
