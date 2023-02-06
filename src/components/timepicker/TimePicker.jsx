import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import './TimePicker.css'

export const TimePicker = ({hourSelected, setHourSelected}) => {

    const [openTimeSelector, setOpenTimeSelector] = useState(false)
    const [viewHour, setViewHour] = useState(true)
    
    const [posHourHand, setPosHourHand] = useState(`rotate(${linearMap((new Date().getHours() - 12), 0, 12, 0, 360)}deg)`)
    const [posMinuteHand, setPosMinuteHand] = useState(`rotate(${linearMap((new Date().getMinutes()), 0, 60, 0, 360)}deg)`)

    const triggerTimePicker = useRef(null)
    const triggerInputTimePicker = useRef(null)

    useEffect(() => {
        if(viewHour) {
            calculateHourDegrees()
        } else {
            calculateMinuteDegrees()
        }
        calculateLines()
    })

    function calculateLines() {
        const hours = document.querySelectorAll(".hour-clock");
        const numberHours = hours.length;
        for (let i = 0; i < numberHours; i++) {
          
          const hour = hours[i];
          const angle = linearMap(i, 0, numberHours, 0, 360);
          
          hour.style.transform = `rotate(${angle}deg)`;
        }
    }

    function calculateHourDegrees() {
        //const currentHour = new Date().getHours() - 12;
        //const angle = linearMap(currentHour, 0, 12, 0, 360);
        document.querySelector(".hours").style.transform = posHourHand;
        document.querySelector(".circle-hour").style.transform = posHourHand;
    }

    function calculateMinuteDegrees() {
        //const currentMinutes = new Date().getMinutes();
        //const angle = linearMap(currentMinutes, 0, 60, 0, 360);
        document.querySelector(".minutes").style.transform = posMinuteHand;
        document.querySelector(".circle-minute").style.transform = posMinuteHand;
    }

    function handleViewHour(val, e) {
        setPosHourHand(e.target.style.transform)
        //console.log(posHourHand)
        document.querySelector(".hours").style.transform = posHourHand;
        document.querySelector(".circle-hour").style.transform = posHourHand;
        //console.log(e.target.innerHTML)
        setHourSelected({
            ...hourSelected,
            hour: e.target.innerHTML
        })
        setViewHour(val)
    }

    function handleViewMinute(val, e) {
        setPosMinuteHand(e.target.style.transform)
        //console.log(posMinuteHand)
        document.querySelector(".minutes").style.transform = posMinuteHand;
        document.querySelector(".circle-minute").style.transform = posMinuteHand;
        setHourSelected({
            ...hourSelected,
            minute: e.target.innerHTML
        })
        //setViewHour(val)
    }

    const handleInputChange = (event) => {        
        
    }

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (triggerTimePicker.current.contains(target) || triggerInputTimePicker.current.contains(target)) return;
            setOpenTimeSelector(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    })
    
    /* const switchTimeSelector = (target, val) => {
        if(!triggerTimePicker.current.contains(target)) {
            console.log(val)
            setOpenTimeSelector(val)
        }
    } */
      
    /* function calculateSeconds() {
        const currentMinutes = new Date().getSeconds();
        const angle = linearMap(currentMinutes, 0, 60, 0, 360);
        document.querySelector(".seconds").style.transform = `rotate(${angle}deg)`;
    } */

    function linearMap(value, min, max, newMin, newMax) {
        return newMin + (newMax - newMin) * (value - min) / (max - min);
    }


    

    return (
        <>
            <div className="col-span-12 mb-2">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Hora:
                </label>
                <div>

                </div>
                <input
                    ref={triggerInputTimePicker}
                    onFocus={() => setOpenTimeSelector(true)}
                    type="text"
                    name="hour"
                    id="hour"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={`${hourSelected.hour}:${hourSelected.minute}`}
                    className="mt-1 p-2 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-lg text-center"
                />
                <div ref={triggerTimePicker} className={`${openTimeSelector ? '' : 'hidden'}`}>
                    <div className='h-58 border mt-2'>
                        { 
                            viewHour ? <div className="clock">
                                <svg className="circle" viewBox="0 0 120 120" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="60" fill="#e5e5e5" />
                                    <line x1="60" y1="1.5" x2="60" y2="60" className="hours" />
                                    <line x1="60" y1="8" x2="60" y2="8" className="circle-hour" />

                                    {/* <line x1="60" y1="8" x2="60" y2="8" className="line-circle" /> */}

                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>00</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>01</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>02</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>03</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>04</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>05</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>06</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>07</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>08</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>09</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>10</text>
                                    <text onClick={(e) => handleViewHour(false, e) } x="54" y="11" className='hour-clock'>11</text>
                                    
                                    {/* <line onClick={() => console.log('hey')} x1="60" y1="5" x2="60" y2="10" className="line" /> */}
                                </svg>
                            </div> 
                            :
                            <div className="clock">
                                <svg className="circle" viewBox="0 0 120 120" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="60" cy="60" r="60" fill="#e5e5e5" />
                                    <line x1="60" y1="1.5" x2="60" y2="60" className="minutes" />
                                    <line x1="60" y1="8" x2="60" y2="8" className="circle-minute" />

                                    {/* <line x1="60" y1="8" x2="60" y2="8" className="line-circle" /> */}

                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>00</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>05</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>10</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>15</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>20</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>25</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>30</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>35</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>40</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>45</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>50</text>
                                    <text onClick={(e) => handleViewMinute(true, e) } x="54" y="11" className='hour-clock'>55</text>
                                    
                                    {/* <line onClick={() => console.log('hey')} x1="60" y1="5" x2="60" y2="10" className="line" /> */}
                                </svg>
                            </div>
                        }

                    </div>
                    <div className='flex justify-center mt-2'>
                        <button 
                            onClick={ () => setViewHour(true) } 
                            type="button" 
                            className="ml-1 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                            <ChevronLeftIcon className="h-4 w-4 text-blue-500"/>
                        </button>
                        <button 
                            onClick={ () => setViewHour(false) }
                            type="button" 
                            className="ml-1 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                            <ChevronRightIcon className="h-4 w-4 text-blue-500"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
