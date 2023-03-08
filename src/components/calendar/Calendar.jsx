import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Select } from './Select';
import { WeekCellCalendar } from './WeekCellCalendar';
import { Modal } from './Modal';
import { MonthCellCalendar } from './MonthCellCalendar';
import { ContextMenu } from './ContextMenu';

export const Calendar = ({ listTasks, addTask, deleteTask }) => {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos'];
    const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const today = new Date();
    const [date, setDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

    const miniToday = new Date();
    const [miniDate, setMiniDate] = useState(miniToday);
    const [miniDay, setMiniDay] = useState(miniDate.getDate());
    const [miniMonth, setMiniMonth] = useState(miniDate.getMonth());
    const [miniYear, setMiniYear] = useState(miniDate.getFullYear());
    const [miniStartDay, setMiniStartDay] = useState(getStartDayOfMonth(miniDate));

    //const [show, setShow] = useState(true)
    const [selectedView, setSelectedView] = useState('Mes')

    const [open, setOpen] = useState(false)
    const [menuContext, setMenuContext] = useState(false)
    const [points, setPoints] = useState({ x: 0, y: 0, screenX: 0, screenY: 0, layerX: 0, layerY: 0 });

    const triggerCell = useRef(null);
    const triggerCalendar = useRef(null);
    const menu_context = useRef(null);

    useEffect(() => {
        setMiniDay(miniDate.getDate());
        setMiniMonth(miniDate.getMonth());
        setMiniYear(miniDate.getFullYear());
        setMiniStartDay(getStartDayOfMonth(miniDate));
    }, [miniDate]);

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
    }, [date]);

    // Cierra el menu si la tecla escape es presionada
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!menuContext || keyCode !== 27) return;
            setMenuContext(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!menuContext || (triggerCalendar != null && triggerCalendar.current.contains(target)) || menu_context.current.contains(target)) return;
            setMenuContext(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });
    
    function getStartDayOfMonth(date) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return startDate === 0 ? 7 : startDate;
    }
    
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function navView() {
        if(selectedView === 'Semana') {
            setSelectedView('Mes')
        } else if(selectedView === 'Mes') {
            setSelectedView('Año')
        }
    }

    function navPrevViewDate() {
        if(selectedView === 'Semana') {
            setDate(new Date(year, month, day-7))
        } else if(selectedView === 'Mes') {
            setDate(new Date(year, month-1, day))
        } else if(selectedView === 'Año') {
            setDate(new Date(year-1, month, day))
        }
    }

    function navPosViewDate() {
        if(selectedView === 'Semana') {
            setDate(new Date(year, month, day+7))
        } else if(selectedView === 'Mes') {
            setDate(new Date(year, month+1, day))
        } else if(selectedView === 'Año') {
            setDate(new Date(year+1, month, day))
        }
    }

    function tamVentana() {
        var tam = [0, 0];
        if (typeof window.innerWidth !== 'undefined') {
            tam = [window.innerWidth,window.innerHeight];
        }
        else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
            tam = [
                document.documentElement.clientWidth,
                document.documentElement.clientHeight
            ];
        } else {
            tam = [
                document.getElementsByTagName('body')[0].clientWidth,
                document.getElementsByTagName('body')[0].clientHeight
            ];
        }
        return tam;
    }
    
    const days = isLeapYear(year) ? DAYS_LEAP : DAYS;
    const miniDays = isLeapYear(miniYear) ? DAYS_LEAP : DAYS;

    let content;
    if(selectedView === 'Semana') {
        content = <WeekCellCalendar 
                    listTasks={listTasks} 
                    DAYS_OF_THE_WEEK={DAYS_OF_THE_WEEK} 
                    year={year} 
                    month={month} 
                    date={date} 
                    today={today} 
                    selectedDate={selectedDate} 
                    setDate={setDate} 
                    setSelectedDate={setSelectedDate}
                    menuContext={menuContext} 
                    setMenuContext={setMenuContext}
                    points={points} 
                    setPoints={setPoints} 
                    deleteTask={deleteTask}
                    tamVentana={tamVentana}
                />
    } else if(selectedView === 'Mes') {
        content = <MonthCellCalendar 
                    listTasks={listTasks} 
                    DAYS_OF_THE_WEEK={DAYS_OF_THE_WEEK} 
                    days={days} 
                    startDay={startDay} 
                    year={year} month={month} 
                    today={today} 
                    selectedDate={selectedDate} 
                    setDate={setDate} 
                    setSelectedDate={setSelectedDate} 
                    menuContext={menuContext} 
                    setMenuContext={setMenuContext}
                    points={points} 
                    setPoints={setPoints} 
                    triggerCell={triggerCell} 
                    menu_context={menu_context}
                    triggerCalendar={triggerCalendar}
                    deleteTask={deleteTask}
                    tamVentana={tamVentana}
                />
    } else if(selectedView === 'Año') {
        content = <div className='grid grid-cols-4'>
            {    
                MONTHS.map((element, index) => {
                    return (
                        <div
                            key={element}
                            className={`cursor-pointer h-32 border-r border-b pl-1 ${element === MONTHS[month] ? 'bg-blue-100' : ''}`}
                            onClick={() => {setMonth(index); setSelectedView('Mes')}}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>
    }

    return (
        <div className={`md:grid grid-cols-12 gap-4 hidden ${selectedView === 'Mes' ? 'h-fit' : 'h-full'}`}>
            <div className='col-span-2 hidden lg:block'>
                <div className='w-100 border-l shadow-sm'>
                    <div className='flex justify-between items-center bg-slate-300 text-sm font-bold px-2 py-2'>
                        <div>
                            { MONTHS[miniMonth] } { miniYear }
                        </div>
                        <div>
                            <button 
                                onClick={ () => setMiniDate(new Date(miniYear, miniMonth - 1, miniDay)) } 
                                type="button" 
                                className="ml-1 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                                <ChevronLeftIcon className="h-4 w-4 text-blue-500"/>
                            </button>
                            <button 
                                onClick={ () => setMiniDate(new Date(miniYear, miniMonth + 1, miniDay)) }
                                type="button" 
                                className="ml-1 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                                <ChevronRightIcon className="h-4 w-4 text-blue-500"/>
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-7'>
                        { 
                            DAYS_OF_THE_WEEK.map((d) => (
                                <div key={d} className='font-medium border-r border-b text-center'>
                                    {d.charAt(0)}
                                </div>
                            ))
                        }
                        {
                            Array(miniDays[miniMonth] + (miniStartDay - 1)).fill(null).map((_, index) => {
                                const d = index - (miniStartDay - 2);
                                return (
                                    <div
                                        key={index}
                                        onClick={ () =>  { setSelectedDate(new Date(miniYear, miniMonth, d)); setDate(new Date(miniYear, miniMonth, d)) }}
                                        className={`cursor-pointer w-100 h-8 border-r border-b text-center flex justify-center items-center text-sm ${d === selectedDate.getDate() ? 'bg-blue-100' : ''}`}
                                    >
                                        {d > 0 ? d : ''}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='col-span-12 lg:col-span-10 border-l shadow-sm'>
               <div className='flex flex-col h-full'>
                    <div className='flex justify-between items-center bg-slate-300 text-base font-bold px-2 py-2 h-fit'>
                        <div onClick={() => navView()} className='cursor-pointer'>
                            { MONTHS[month].substring(0, 3) }. { year }
                        </div>
                        <div className='flex items-center'>
                            <Select selectedView={selectedView} setSelectedView={setSelectedView}/>
                            <div>
                                {/* <button onClick={() => setOpen(true)} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Prueba</button> */}
                                <button 
                                    onClick={ () => navPrevViewDate() } 
                                    type="button" 
                                    className="ml-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                                    <ChevronLeftIcon className="h-4 w-4 text-blue-500"/>
                                </button>
                                <button 
                                    onClick={ () => navPosViewDate() }
                                    type="button" 
                                    className="ml-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                                    <ChevronRightIcon className="h-4 w-4 text-blue-500"/>
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <div className='h-full w-full' ref={triggerCalendar}>
                        {content}
                    </div>
                    

                </div>
            </div>

            <Modal open={open} setOpen={setOpen}/>
            <ContextMenu menuContext={menuContext} setMenuContext={setMenuContext} points={points} selectedDate={selectedDate} listTasks={listTasks} menu_context={menu_context} addTask={addTask}/>
        </div>
    )
}
