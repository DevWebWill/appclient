import React from 'react'

import desarrolloApi from '../../assets/desarrollo-api.png';
import desarrolloWeb from '../../assets/desarrollo-web.png';
import desarrolloApp from '../../assets/desarrollo-app.png';
import desarrolloSoftware from '../../assets/desarrollo-software.png';

export const Services = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 text-gray-100 mb-32 px-6 sm:px-0 md:px-4 lg:px-2 xl:px-8 2xl:px-16 pt-14'>
        <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[50vh] rounded-lg z-1 py-4'>
            <div className='rounded-lg sm:relative bg-purple-900 bg-opacity-50 h-full w-full left-11 sm:left-8 p-5 sm:p-3 shadow-lg shadow-purple-800/30'>
                <div className='mb-4 p-4'>
                    <img src={desarrolloApp} alt='' />
                </div>
                <div className='text-center text-gray-200'>
                    <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo de App Móviles</h3>
                    <span className='text-md text-gray-300'>Desarrollo de aplicaciones móviles con hermosos diseños para IOs y Android.</span>
                </div>                                                            
            </div>
        </div>
        <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[50vh] rounded-lg z-10'>
            <div className='rounded-lg sm:relative bg-purple-900 h-full w-full border-0 p-5 sm:p-3 shadow-lg shadow-purple-800/40'>
                <div className='mb-4 p-8'>
                    <img src={desarrolloWeb} alt='' />
                </div>
                <div className='text-center text-gray-200'>
                    <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo Web</h3>
                    <span className='text-md text-gray-300'>Desarrollo web a medida, moderno, responsivo, componentes reutilizables, amigable para el usuario.</span>
                </div>                                                            
            </div>
        </div>
        <div className='relative min-h-[52vh] sm:min-h-[42vh] 2xl:min-h-[50vh] rounded-lg z-1 py-4'>
            <div className='rounded-lg sm:relative bg-purple-900 bg-opacity-50 h-full w-full right-11 sm:right-8 border-0 p-5 sm:p-3 shadow-lg shadow-purple-800/30'>
                <div className='mb-4 p-4'>
                    <img src={desarrolloSoftware} alt='' />
                </div>
                <div className='text-center text-gray-200'>
                    <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Solución de problemas</h3>
                    <span className='text-md text-gray-300'>Desarrollo de soluciones innovadoras, mantenimiento y mejora de las herramientas de trabajo.</span>
                </div>                                
            </div>
        </div>
        <div className='sm:col-span-3 lg:col-span-1 relative  rounded-lg z-1 sm:mx-8 lg:mx-0 md:py-4'>
            <div className='rounded-lg sm:relative sm:grid sm:grid-cols-2 lg:grid-cols-none flex flex-col justify-center items-center bg-purple-900 bg-opacity-50 h-full w-full right-11 sm:right-0 lg:right-11 border-0 p-5 sm:p-3 md:p-3 sm:mt-4 md:mt-0 shadow-lg shadow-purple-800/30'>
                <div className='static mb-4 sm:mb-0'>
                    <img className='object-fit sm:h-64 lg:h-auto' src={desarrolloApi} alt='' />
                </div>
                <div className='text-center text-gray-200 sm:px-2 md:px-0'>
                    <h3 className='text-2xl sm:text-xl font-bold mb-2 text-white'>Desarrollo de APIs</h3>
                    <span className='text-md text-gray-300'>Desarrollo de software como capa de comunicación enttre diferentes aplicaciones o sistemas.</span>
                </div>                                
            </div>
        </div>
    </div>
  )
}
