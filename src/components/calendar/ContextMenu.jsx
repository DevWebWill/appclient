import React, { useEffect, useState } from 'react'
import { TimePicker } from '../timepicker/TimePicker'

export const ContextMenu = ({menuContext, setMenuContext, points, selectedDate, listTasks, menu_context, addTask}) => {
    const dd = new Date()
    const [hourSelected, setHourSelected] = useState({
        hour: dd.getHours() < 10 ? (0+dd.getHours().toString()) : dd.getHours().toString(), 
        minute: dd.getMinutes() < 10 ? 0+dd.getMinutes().toString() : dd.getMinutes().toString()
    })

    const [datosTask, setDatosTask] = useState({
        name: '',
        date: selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate() + " " + hourSelected.hour + ":" + hourSelected.minute + ":" + "00"
    })

    useEffect(() => {
        setDatosTask({
            ...datosTask,
            date: selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate() + " " + hourSelected.hour + ":" + hourSelected.minute + ":" + "00"
        })
    }, [selectedDate, hourSelected])

    const handleInputChange = (event) => {        
        setDatosTask({
            ...datosTask,
            //date: completeDate,
            [event.target.name] : event.target.value
        })
    }

    const sendData = (event) => {
        event.preventDefault()
        setDatosTask({
            ...datosTask,
        })
        
        //Validation
        if(validateData(datosTask)) {
            addTask(datosTask)
        }
        

        setMenuContext(false)
    }

    const validateData = () => {
        //console.log(datosTask)
        if(datosTask.name !== '' && datosTask.date !== '') {
            return true
        } else {
            return false
        }
    }

    

    //console.log(new Date())
    //console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())

    return (
        <div ref={menu_context} className={`absolute border shadow-md rounded-md w-60 bg-white z-50 ${menuContext ? '' : 'hidden'}`} style={{ top: `${points.layerY}px`, left: `${points.layerX}px` }}>
            <div className='flex justify-end pt-2 pr-2'>
                <button 
                    type="button" 
                    className='px-1 rounded border'
                    onClick={
                        () => setMenuContext(false)
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
                        value={datosTask.name}
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
