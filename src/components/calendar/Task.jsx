import React, { useContext } from 'react'
import { CalendarDispatchContext } from './CalendarContext';

export const Task = ({ deleteTaskBySocket, task, setIsDragging}) => {
    const dispatch = useContext(CalendarDispatchContext);

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', `${task._id}`)
        setIsDragging(true)
    }
    const handleDragEnd = () => setIsDragging(false)
    return (
        <div                           
            className='bg-red-100 px-1 rounded text-sm mb-1 flex justify-between align-middle content-center relative z-20 border-white border'
            onClick={ (e) => {
                e.stopPropagation()
                dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false });
                dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: true});
            }}
            draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd}
        >
            <div>
                <span className="mr-2 font-semibold">{ task.name }</span>
                <span className="text-xs">
                    { 
                        new Date(task.date).getHours() < 10 ? 0+new Date(task.date).getHours().toString() : new Date(task.date).getHours()
                    }
                    :
                    { 
                        new Date(task.date).getMinutes() < 10 ? 0+new Date(task.date).getMinutes().toString() : new Date(task.date).getMinutes()
                    }
                </span>
            </div>
            <div>
                <span onClick={ (e) => {
                    e.stopPropagation()
                    dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: false });
                    deleteTaskBySocket(task._id)
                }}>
                    <i className="icofont-close-line"></i>
                </span>
            </div>
        </div>
    )
}
