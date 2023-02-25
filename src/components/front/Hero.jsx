import React from 'react'
import imgHero from '../../assets/desarrollo-web1.png'

export const Hero = () => {
    return (
        <>
            <div className='relative h-auto w-auto flex flex-col bg-transparent'>
                <div className='bg-theme clip-path h-[85vh] lg:h-[65vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
                
                    <div className='grid grid-cols-2 px-24'>
                        <div className='flex flex-col justify-center'>
                            <span className='uppercase font-extrabold filter drop-shadow-sm text-slate-200'>
                                {`Desarrollo de software`}
                            </span>
                            <h1 className='mb-4 text-6xl lg:text-6xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-slate-200'>
                                Dev<span className='text-violet-500'>Web</span> FullStack
                            </h1>
                            <div className='text-slate-200 pr-24 mb-6'>
                                Desarrollo web y de aplicaciones móviles a medida para empresas. 
                                Desarrollo de software multiplataforma con el uso de tecnologías modernas.    
                            </div>
                            <div>
                                <button type='button' className='button-theme bg-slate-200  shadow-slate-200 rounded-md px-4 py-2'>{`Presupuesto`}</button>
                            </div>
                        </div>

                        <div className='flex items-center justify-center'>
                            <img className='h-[70vh]' src={imgHero} alt='' />
                        </div>
                        
                        {/* <div className='grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto'>
                            {videos?.map((val, i) => (
                                <Clips
                                    key={i}
                                    imgsrc={val.imgsrc}
                                    clip={val.clip}
                                    t={i*3}
                                />
                            ))}
                        </div> */}
                        {/* <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3'>
                            {sociallinks?.map((val, i) => (
                                <SocialLink
                                    key={i}
                                    icon={val.icon}
                                />
                            ))}
                        </div> */}
                    </div>
                    {/* <div className='flex items-center'>
                        <img
                            src={img}
                            alt='hero-img/img'
                            className='w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill'
                        />
                    </div> */}
                
            </div>
        </>
    )
}
