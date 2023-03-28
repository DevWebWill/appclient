import React, { useContext } from 'react'
import { CalendarContext, CalendarDispatchContext } from './CalendarContext.js';
import { Task } from './Task.jsx';

export const WeekCellCalendar = ({ listTasks, DAYS_OF_THE_WEEK, setPoints, deleteTaskBySocket, tamVentana, isDragging, setIsDragging, handleUpdateList }) => {

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext);

    function findTask(d) {
        let tasks = listTasks.filter((task) => {
            let taskTemp = new Date(task.date)
            return  taskTemp.getDate() === d && taskTemp.getMonth() === state.month && taskTemp.getFullYear() === state.year
        })
        return tasks
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, d, h) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text')
        
        const hour = parseInt(h)
        let date = new Date(state.year, state.month, d, hour, 0, 0)
        handleUpdateList(id, date, true)
        setIsDragging(false)
    }

    const hours = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 
        '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
    ]

    /* const hours = [
        '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 AM', 
        '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
    ] */

    /* const halfAnHour = [
        '00:30 AM', '1:00 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 AM', 
        '12:30 PM', '1:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 PM', 
    ] */

    return (

        <div className='h-full relative'>
            <div className='flex absolute w-full h-6'>
                <div className='w-12 h-6'></div>
                <div className='grid grid-cols-7 relative border-l w-full h-6'>
                    {
                        DAYS_OF_THE_WEEK.map((d, index) => (
                            <div key={d} className='flex justify-between px-3 font-medium border-r border-b'>
                                <span>{d}</span>
                                <span>
                                    {(index+1) > 0 ? new Date(state.year, state.month, (state.date.getDate()-(state.date.getDay()-(index+1)))).getDate() : ''}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='flex h-full pt-6'>

                <div className='relative h-full w-12 border-t border-b'>
                    <div className='h-full w-full right-0 flex flex-col justify-between'>
                        {
                            hours.map((hour, index) => {
                                return <div key={index} className='border-b border-dashed text-xs h-24 relative'>
                                    {/* <span className='absolute bottom-0'>{ parseInt(hour) < 10 ? `0${hour}` : hour }:00</span> */}
                                    <span className='absolute -bottom-2'>{ parseInt(hour) <= 12 ? `${hour} AM` : `${hour-12} PM` }</span>
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className='relative h-full w-full border-t'>
                    <div className='absolute h-full w-full right-0 flex flex-col justify-between'>
                        {
                            hours.map((hour, index) => {
                                return <div key={index} className='border-b border-dashed text-xs h-24 relative'>
                                    
                                </div>
                            })
                        }
                    </div>
                    <div className='grid grid-cols-7 h-full relative border-l'>
                        {
                            DAYS_OF_THE_WEEK.map((d, index) => {
                                return <div
                                    key={index}
                                    //onContextMenu={(e) => {
                                    //    e.preventDefault(); // prevent the default behaviour when right clicked
                                    //    setMenuContext(true)
                                    //    setPoints({
                                    //        x: e.pageX,
                                    //        y: e.pageY,
                                    //        screenX: e.screenX,
                                    //        screenY: e.screenY,
                                    //        layerX: e.nativeEvent.layerX,
                                    //        layerY: e.nativeEvent.layerY
                                    //    });
                                    //    setSelectedDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                    //    setDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                    //    //cconsole.log("Right Click", e.pageX, e.pageY, e);
                                    //}}
                                    onClick={ (e) => {
                                            e.preventDefault();
                                            //setSelectedDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                            //setDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                            const newDate = new Date(state.year, state.month, (state.date.getDate()-(state.date.getDay()-(index+1))))
                                            dispatch({
                                                type: 'SET_DATE', 
                                                date: newDate, 
                                                day: newDate.getDate(), 
                                                month: newDate.getMonth(), 
                                                year: newDate.getFullYear(), 
                                                selectedDate: newDate,
                                                startDay: newDate
                                            })
                                            dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: true, initHourOfTask: null });
                                            console.log('OOKOK')
                                            /*if(tamVentana() !== undefined) {
                                                console.log(e.nativeEvent.layerX, e.nativeEvent.layerY)
                                                if((e.pageX + 240) > tamVentana()[0]) {
                                                    setPoints({
                                                        layerX: e.nativeEvent.layerX-240,
                                                        layerY: e.nativeEvent.layerY
                                                    })
                                                } else {
                                                    setPoints({
                                                        layerX: e.nativeEvent.layerX,
                                                        layerY: e.nativeEvent.layerY
                                                    })
                                                }
                                            }*/
                                            
                                            if(tamVentana() !== undefined) {
                                                if((e.pageX + 240) > tamVentana()[0]) {
                                                    setPoints({
                                                        layerX: e.pageX-480,
                                                        layerY: e.pageY
                                                    })
                                                } else {
                                                    setPoints({
                                                        layerX: e.pageX-240,
                                                        layerY: e.pageY
                                                    })
                                                }
                                            }
                                        } 
                                    }
                                    className={`cursor-pointer border-r border-b h-full ${(state.date.getDate()-(state.date.getDay()-(index+1))) === new Date().getDate() && state.month === new Date().getMonth() ? 'bg-slate-100' : ''} ${(state.date.getDate()-(state.date.getDay()-(index+1))) === state.selectedDate.getDate() && state.month === state.selectedDate.getMonth() ? 'bg-blue-100 bg-opacity-40' : ''}`}
                                >
                                    {/* {(index+1) > 0 ? new Date(state.year, state.month, (state.date.getDate()-(state.date.getDay()-(index+1)))).getDate() : ''} */}
                                    {
                                        hours.map((hour, index3) => {
                                            return <div 
                                                onDragOver={(e) => handleDragOver(e)} 
                                                onDrop={(e) => { 
                                                    let dia = (index+1) > 0 ? new Date(state.year, state.month, (state.date.getDate()-(state.date.getDay()-(index+1)))).getDate() : ''
                                                    if(dia !== '') {
                                                        handleDrop(e, dia, hour-1)
                                                    }
                                                }}
                                                key={index3} 
                                                className='text-xs h-24 relative bg-transparent hover:bg-blue-100 hover:bg-opacity-80 hover:z-40 px-1 py-0.5'
                                            >
                                                <span 
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        dispatch({ 
                                                            type: 'MENU_MODAL_OPEN', 
                                                            menuModalOpen: true,
                                                            initHourOfTask: `${hour-1 < 10 ? `0${hour-1}` : hour-1}:30`
                                                        });
                                                        if(tamVentana() !== undefined) {
                                                            if((e.pageX + 240) > tamVentana()[0]) {
                                                                setPoints({
                                                                    layerX: e.pageX-480,
                                                                    layerY: e.pageY
                                                                })
                                                            } else {
                                                                setPoints({
                                                                    layerX: e.pageX-240,
                                                                    layerY: e.pageY
                                                                })
                                                            }
                                                        }
                                                        e.stopPropagation()
                                                    }}
                                                    className='w-2/3 h-0 z-50 m-auto absolute left-0 right-0 top-0 bottom-0 border-b border-red-500 opacity-0 hover:opacity-100 p-0'
                                                >
                                                    <span className='bg-red-400 rounded-b px-1 m-0 left-0'>{`${hour-1 < 10 ? `0${hour-1}` : hour-1}:30`}</span>
                                                </span>

                                                <div className='w-full h-full z-10 flex items-center absolute top-0 left-0'>
                                                    <span className='w-full absolute border-b border-dotted border-d border-0.5 border-opacity-10'>
                                                        
                                                    </span>
                                                </div>
                                                
                                                {
                                                    findTask(state.date.getDate()-(state.date.getDay()-(index+1))).map((task, index2) => {
                                                        if(new Date(task.date).getHours() === 0 && parseInt(hour) === 1) {
                                                            return <Task key={index2} deleteTaskBySocket={deleteTaskBySocket} task={task} setIsDragging={setIsDragging}></Task>
                                                        } else if(new Date(task.date).getHours() === parseInt(hour)-1) {
                                                            return <Task key={index2} deleteTaskBySocket={deleteTaskBySocket} task={task} setIsDragging={setIsDragging}></Task>
                                                        } else {
                                                            return null
                                                        }
                                                        
                                                    })
                                                }

                                                
                                                {/* <div className='w-full h-full z-40 hidden hover:flex items-center justify-center absolute top-0 left-0'>
                                                    <span className='w-1/2 absolute border-y border-blue-500'>
                                                        
                                                    </span>
                                                </div>

                                                <div className='w-full h-1/2 z-40 hidden group-hover:flex items-center justify-center absolute top-0 left-0'>
                                                    <span className='w-1/2 absolute border-y border-red-500'>
                                                        
                                                    </span>
                                                </div> */}

                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
