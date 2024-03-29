import React from 'react'
import imgHero from '../../assets/desarrollo-web1.png'

export const Hero = () => {
    return (
        <>
            <div className='relative h-auto w-auto flex flex-col bg-transparent'>
                {/* <div className='bg-theme clip-path h-[85vh] lg:h-[65vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div> */}
                
                <div className='grid grid-cols-1 md:grid-cols-2 justify-center px-6 md:px-12 lg:px-10 xl:px-16 2xl:px-24 pt-28 md:pt-20 xl:pt-10'>
                    <div className='flex flex-col justify-center absolute md:relative'>
                        <span className='uppercase font-extrabold filter drop-shadow-sm text-slate-200'>
                            {`Desarrollo de software`}
                        </span>
                        <h1 className='mb-4 text-6xl xsm:text-2xl sm:text-6xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold filter drop-shadow-sm text-slate-200'>
                            Dev<span className='text-violet-500'>Web</span> FullStack
                        </h1>
                        <div className='text-slate-200 xl:pr-24 mb-6'>
                            Desarrollo web y de aplicaciones móviles a medida para empresas. 
                            Desarrollo de software multiplataforma con el uso de tecnologías modernas.    
                        </div>
                        <div className=''>
                            <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-purple-900 via-purple-900 to-purple-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-purple-800/50 dark:shadow-lg dark:shadow-purple-800/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 z-20">
                                Presupuesto
                            </button>
                            {/* <button type='button' className='button-theme bg-purple-900 shadow-md shadow-gray-700 rounded-md px-4 py-2'>{`Presupuesto`}</button> */}
                        </div>
                    </div>
                    <div className='flex items-center justify-center pt-52 sm:pt-20 md:pt-0'>
                        <img className='' src={imgHero} alt='' />
                    </div>
                </div>
            </div>
        </>
    )
}
