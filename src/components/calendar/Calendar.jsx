import React, { useState, useEffect, useReducer, useRef } from 'react'

import io from 'socket.io-client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Select } from './Select';
import { WeekCellCalendar } from './WeekCellCalendar';
import { MonthCellCalendar } from './MonthCellCalendar';
import { MenuModal } from './MenuModal';
import { calendarReducer } from './calendarReducer';
import { CalendarContext, CalendarDispatchContext } from './CalendarContext.js';
import { SidebarRightForm } from './SidebarRightForm';

let socket;

export const Calendar = ({ listTasks, setListTask, addTask, deleteTask, moveTask }) => {
    const ENDPOINT = process.env.REACT_APP_URL_API
    const [task, setTask] = useState({name: '', date: ''})
    /**
     * Inicialización Estado con useReducer
     * Variables de estado para calendario grande y pequeño
     */
    const dateInit = new Date()
    const [state, dispatch] = useReducer(calendarReducer, { 
        date: dateInit, 
        day: dateInit.getDate(), 
        month: dateInit.getMonth(), 
        year: dateInit.getFullYear(), 
        selectedDate: dateInit,
        startDay: new Date(dateInit.getFullYear(), dateInit.getMonth(), 1).getDay(),

        miniDate: dateInit,
        miniDay: dateInit.getDate(), 
        miniMonth: dateInit.getMonth(), 
        miniYear: dateInit.getFullYear(), 
        miniStartDay: new Date(dateInit.getFullYear(), dateInit.getMonth(), 1).getDay(),

        menuModalOpen: false,
        initHourOfTask: null,

        alertModalOpen: false,

        selectedView: 'Mes',

        openRightForm: false,
        idTaskToEdit: null
    });

    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos'];
    const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    /** Cordenadas x,y del clic donde se abrira el form para añadir o editar tareas */
    const [points, setPoints] = useState({ x: 0, y: 0, screenX: 0, screenY: 0, layerX: 0, layerY: 0 });

    const triggerCell = useRef(null);
    const triggerCalendar = useRef(null);
    const menu_context = useRef(null);

    //Socket
    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.emit('disconnectt')
            socket.off()
        }
    }, [ENDPOINT])

    useEffect(() => {
        socket.on('createdTask', (task) => {
            setListTask([...listTasks, task])
        }, [listTasks])
    })
    const addTaskBySocket = async (datosTask) => {
        let tmpTask = await addTask(datosTask)
        setTask(tmpTask)
        if(tmpTask) {
            socket.emit('createTask', tmpTask, () => setTask({name: '', date: ''}))
        }
    }

    useEffect(() => {
        socket.on('deletedTask', (id) => {
            setListTask(listTasks.filter(element => element._id !== id))
        }, [listTasks])
    })
    const deleteTaskBySocket = async (id) => {
        await deleteTask(id)
        if(id) {
            socket.emit('deleteTask', id)
        }
    }
    
    /**dispatch({ type: 'ALERT_MODAL_OPEN', alertModalOpen: true }) */

    useEffect(() => {
        socket.on('updatedTask', (task) => {
            console.log('2', task)
            setListTask([...listTasks.filter(element => element._id !== task._id), task])
        }, [listTasks])
    })
    const updateTaskBySocket = async (task) => {
        console.log('1', task)
        if(task) {
            socket.emit('updateTask', task)
        }
    }

    // Cierra el menu si la tecla escape es presionada
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!state.menuModalOpen || keyCode !== 27) return;
            dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false });
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!state.menuModalOpen || (triggerCalendar != null && triggerCalendar.current.contains(target)) || menu_context.current.contains(target)) return;
            dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false });
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });
    
    /**
     * Se calcula si el año es bisiesto o no
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * Selección de vista [Semana, Mes, Año]
     */
    function navView() {
        if(state.selectedView === 'Semana') {
            dispatch({ type: 'SELECTED_VIEW', selectedView: 'Mes' })
        } else if(state.selectedView === 'Mes') {
            dispatch({ type: 'SELECTED_VIEW', selectedView: 'Año' })
        }
    }

    /**
     * Navegación del calendario. Según la vista se retrocede una semana, un mes o un año
     */
    function navPrevViewDate() {
        let tmp_date = null
        if(state.selectedView === 'Semana') {
            tmp_date = new Date(state.year, state.month, state.day-7)
        } else if(state.selectedView === 'Mes') {
            tmp_date = new Date(state.year, state.month-1, state.day)
        } else if(state.selectedView === 'Año') {
            tmp_date = new Date(state.year-1, state.month, state.day)
        }
        
        dispatch({ 
            type: 'SET_DATE', 
            date: tmp_date, 
            day: tmp_date.getDate(), 
            month: tmp_date.getMonth(), 
            year: tmp_date.getFullYear(), 
            selectedDate: tmp_date,
            startDay: tmp_date
        })
    }

    /**
     * Navegación del calendario. Según la vista se adelanta una semana, un mes o un año
     */
    function navPosViewDate() {
        let tmp_date = null
        if(state.selectedView === 'Semana') {
            tmp_date = new Date(state.year, state.month, state.day+7)
        } else if(state.selectedView === 'Mes') {
            tmp_date = new Date(state.year, state.month+1, state.day)
        } else if(state.selectedView === 'Año') {
            tmp_date = new Date(state.year+1, state.month, state.day)
        }

        dispatch({ 
            type: 'SET_DATE', 
            date: tmp_date, 
            day: tmp_date.getDate(), 
            month: tmp_date.getMonth(), 
            year: tmp_date.getFullYear(), 
            selectedDate: tmp_date,
            startDay: tmp_date
        })

    }

    function navViewMiniDate(tmp_date) {
        dispatch({ 
            type: 'SET_MINI_DATE', 
            miniDate: tmp_date, 
            miniDay: tmp_date.getDate(), 
            miniMonth: tmp_date.getMonth(), 
            miniYear: tmp_date.getFullYear(),
            miniStartDay: tmp_date
        })
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
    
    const days = isLeapYear(state.year) ? DAYS_LEAP : DAYS;
    const miniDays = isLeapYear(state.miniYear) ? DAYS_LEAP : DAYS;

    /**
     * Drag and Drop
     */
    const [isDragging, setIsDragging] = useState(false)
    //const handleDragging = (dragging) => setIsDragging(dragging)
    const handleUpdateList = async (id, date, updateHour) => {
        console.log('gol')
        let task = await listTasks.find(item => item._id === id)
        if (task && task.date !== date) {
            console.log(id, listTasks)
            //await setListTask(listTasks.filter(element => element._id !== id))

            if(updateHour) {
                task.date = date
            } else {
                const tmpDate = new Date(task.date)
                task.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), tmpDate.getHours(), tmpDate.getMinutes(), 0, 0)
            }
                        
            updateTaskBySocket(task);
            //setListTask([...listTasks.filter(element => element._id !== id), task])

            moveTask(task)
        }
    }

    let content;
    if(state.selectedView === 'Semana') {
        content = <WeekCellCalendar 
                    listTasks={listTasks} 
                    DAYS_OF_THE_WEEK={DAYS_OF_THE_WEEK} 
                    setPoints={setPoints} 
                    deleteTaskBySocket={deleteTaskBySocket}
                    tamVentana={tamVentana}

                    //Funcionalidad de Drag and Drop
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    handleUpdateList={handleUpdateList}
                />
    } else if(state.selectedView === 'Mes') {
        content = <MonthCellCalendar 
                    listTasks={listTasks} 
                    DAYS_OF_THE_WEEK={DAYS_OF_THE_WEEK} 
                    days={days}  
                    setPoints={setPoints} 
                    triggerCell={triggerCell} 
                    deleteTaskBySocket={deleteTaskBySocket}
                    tamVentana={tamVentana}

                    //Funcionalidad de Drag and Drop
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    handleUpdateList={handleUpdateList}
                />
    } else if(state.selectedView === 'Año') {
        content = <div className='grid grid-cols-4'>
            {    
                MONTHS.map((element, index) => {
                    return (
                        <div
                            key={element}
                            className={`cursor-pointer h-32 border-r border-b pl-1 ${element === MONTHS[state.month] ? 'bg-blue-100 bg-opacity-40' : ''}`}
                            onClick={() => {
                                //dispatch({ type: 'SET_DATE', month: index }); setSelectedView('Mes')}
                                let newDate = state.date.setMonth(index)
                                dispatch({ 
                                    type: 'SET_DATE', 
                                    date: newDate, 
                                    day: state.day, 
                                    month: index, 
                                    year: state.year, 
                                    selectedDate: newDate,
                                    startDay: newDate
                                })

                                dispatch({ type: 'SELECTED_VIEW', selectedView: 'Mes' })
                            }}

                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>
    }


    return (
        <CalendarContext.Provider value={state}>
            <CalendarDispatchContext.Provider value={dispatch}>
                <div className={`md:grid grid-cols-12 gap-4 hidden ${state.selectedView === 'Mes' ? 'h-fit' : 'h-full'}`}>
                    <div className='col-span-2 hidden lg:block'>
                        <div className='w-100 border-l shadow-sm'>
                            <div className='flex justify-between items-center bg-slate-300 text-sm font-bold px-2 py-2'>
                                <div>
                                    { MONTHS[state.miniMonth] } { state.miniYear }
                                </div>
                                <div>
                                    <button 
                                        onClick={ () => navViewMiniDate(new Date(state.miniYear, state.miniMonth - 1, state.miniDay)) } 
                                        type="button" 
                                        className="ml-1 rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-offset-2">
                                        <ChevronLeftIcon className="h-4 w-4 text-blue-500"/>
                                    </button>
                                    <button 
                                        onClick={ () => navViewMiniDate(new Date(state.miniYear, state.miniMonth + 1, state.miniDay)) }
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
                                    Array(miniDays[state.miniMonth] + (state.miniStartDay - 1)).fill(null).map((_, index) => {
                                        const d = index - (state.miniStartDay - 2);
                                        return (
                                            <div
                                                key={index}
                                                onClick={ () =>  { 
                                                    //dispatch({ type: 'SET_DATE', date: new Date(miniYear, miniMonth, d), selectedDate: new Date(miniYear, miniMonth, d) })
                                                    dispatch({ 
                                                        type: 'SET_DATE', 
                                                        date: new Date(state.miniYear, state.miniMonth, d), 
                                                        day: new Date(state.miniYear, state.miniMonth, d).getDate(), 
                                                        month: new Date(state.miniYear, state.miniMonth, d).getMonth(), 
                                                        year: new Date(state.miniYear, state.miniMonth, d).getFullYear(), 
                                                        selectedDate: new Date(state.miniYear, state.miniMonth, d),
                                                        startDay: new Date(state.miniYear, state.miniMonth, d)
                                                    })
                                                    //setSelectedDate(new Date(miniYear, miniMonth, d)); setDate(new Date(miniYear, miniMonth, d)) }
                                                }}
                                                className={`cursor-pointer w-100 h-8 border-r border-b text-center flex justify-center items-center text-sm ${d === state.selectedDate.getDate() ? 'bg-blue-100' : ''}`}
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
                                    { MONTHS[state.month].substring(0, 3) }. { state.year }
                                </div>
                                <div className='flex items-center'>
                                    <Select />
                                    <div>
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

                    <MenuModal points={points} menu_context={menu_context} task={task} setTask={setTask} addTaskBySocket={addTaskBySocket}/>
                    {/* {
                        listTasks.map((item,i) => {
                            return <span key={i}>
                                {item.name}
                            </span>
                        })
                    } */}
                </div>

                <SidebarRightForm listTasks={listTasks}/>
            </CalendarDispatchContext.Provider>
        </CalendarContext.Provider>
    )
}
