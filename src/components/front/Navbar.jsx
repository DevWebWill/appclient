import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [navState, setNavState] = useState(false);

    const onNavScroll = () => {
        if(window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);

        return () => {
            window.removeEventListener('scroll', onNavScroll);
        }
    },[]);

    return (
        <>
            <header className={!navState ? 'absolute top-0 left-0 h-12 right-0 opacity-100 z-50' : 'fixed top-0 left-0 right-0 h-[9vh] w-full flex items-center justify-center opacity-100 z-[200] blur-effect-theme'}>
                <nav className='flex items-center justify-between nike-container px-4 h-full w-full bg-red-100'>
                    <div className='flex items-center'>
                        {/* <img
                            src={logo}
                            alt="logo/img"
                            className={`w-16 h-auto ${navState && "filter brightness-0"}`}
                        /> */}
                        <span className={`w-16 h-auto ${navState && "filter brightness-0"}`}>Dev</span>
                    </div>
                    <div className='flex gap-6'>
                    <ul className='flex items-center justify-center gap-2'>
                        <li className='grid items-center'>
                            <span className='cursor-pointer'>Inicio</span>
                        </li>
                        <li className='grid items-center'>
                            {/* <span className='cursor-pointer'>Admin</span> */}
                            <Link to={'/admin'}>Admin</Link>
                        </li>
                        <li className='grid items-center'>
                            <span className='cursor-pointer'>Tienda</span>
                        </li>
                    </ul>
                    <ul className='flex items-center justify-center gap-2'>
                        <li className='grid items-center'>
                            <i className={`icon-style cursor-pointer icofont-search ${navState && "text-slate-900 transition-all duration-300"}`}></i>
                        </li>
                        <li className='grid items-center'>
                            <i className={`icon-style cursor-pointer icofont-heart ${navState && "text-slate-900 transition-all duration-300"}`} ></i>
                        </li>
                        <li className='grid items-center'>
                            <button type='button' className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                                <i className={`icon-style icofont-cart-alt ${navState && "text-slate-900 transition-all duration-300"}`} ></i>
                                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navState ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{0}</div>
                            </button>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}
