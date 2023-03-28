import React, { useContext, useEffect, useState } from 'react'
import { TimePicker } from '../timepicker/TimePicker'
import { CalendarContext, CalendarDispatchContext } from './CalendarContext';

export const MenuModal = ({ points, menu_context, task, setTask, addTaskBySocket }) => {

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext);

    let currentTimeInit = new Date()
    const [hourSelected, setHourSelected] = useState({
        hour: currentTimeInit.getHours() < 10 ? (0+currentTimeInit.getHours().toString()) : currentTimeInit.getHours().toString(), 
        minute: currentTimeInit.getMinutes() < 10 ? 0+currentTimeInit.getMinutes().toString() : currentTimeInit.getMinutes().toString()
    })

    useEffect(() => {
        let newHour = state.initHourOfTask !== undefined && state.initHourOfTask !== null ? state.initHourOfTask.split(':') : null;
        if(newHour !== null) {
            let hour = newHour[0];
            let minute = newHour[1];
            setHourSelected({ hour: hour, minute: minute})
        } else {
            let currentTime = new Date()
            setHourSelected({
                hour: currentTime.getHours() < 10 ? (0+currentTime.getHours().toString()) : currentTime.getHours().toString(), 
                minute: currentTime.getMinutes() < 10 ? 0+currentTime.getMinutes().toString() : currentTime.getMinutes().toString()
            })
        }
    }, [state.initHourOfTask])
    

    const handleInputChange = (event) => {        
        setTask({
            ...task,
            [event.target.name] : event.target.value,
            date: state.selectedDate.getFullYear()+'-'+((state.selectedDate.getMonth()+1) < 10 ? `0${state.selectedDate.getMonth()+1}` : `${state.selectedDate.getMonth()+1}`)+ '-' + (state.selectedDate.getDate() < 10 ? `0${state.selectedDate.getDate()}` : `${state.selectedDate.getDate()}`) + " " + (hourSelected.hour < 10 ? `${hourSelected.hour}` : `${hourSelected.hour}`) + ":" + (hourSelected.minute < 10 ? `${hourSelected.minute}` : `${hourSelected.minute}`) + ":00"
        })
    }

    const sendData = (event) => {
        event.preventDefault();
        //Validation
        if(validateData(task)) {
            addTaskBySocket(task);
        }
        

        dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false });
    }

    const validateData = () => {
        console.log(task);
        if(task.name !== '' && task.date !== '') {
            return true;
        } else {
            return false;
        }
    }

    

    //console.log(new Date())
    //console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())

    return (
        <div ref={menu_context} className={`absolute border shadow-md rounded-md w-60 bg-white z-50 ${state.menuModalOpen ? '' : 'hidden'}`} style={{ top: `${points.layerY}px`, left: `${points.layerX}px` }}>
            <div className='flex justify-end pt-2 pr-2'>
                <button 
                    type="button" 
                    className='px-1 rounded border'
                    onClick={
                        () => dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false })
                    }
                >
                    <i className="icofont-close-line"></i>
                </button>
            </div>
            <form className="grid grid-cols-12 p-2 bg-white" onSubmit={sendData}>
                <div className="col-span-12 mb-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Nueva Tarea:
                    </label>
                    <input
                        onChange={handleInputChange}
                        value={task.name}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 p-2 block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                    />
                </div>
                <TimePicker hourSelected={hourSelected} setHourSelected={setHourSelected}></TimePicker>
                <div>
                    <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">Aceptar</button>
                </div>
            </form>
        </div>
    )
}
