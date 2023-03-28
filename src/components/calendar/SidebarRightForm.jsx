import React, { useContext, useEffect, useRef, useState } from 'react'
import { Transition } from '../../utils/Transition';
import { CalendarContext, CalendarDispatchContext } from './CalendarContext.js';

export const SidebarRightForm =  ({ listTasks }) => {

    

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext)

    /* console.log(listTasks.find(item => item._id === state.idTaskToEdit)) */
    /* console.log(state.idTaskToEdit) */
    //console.log(listTasks, state.idTaskToEdit)

    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {
        setSelectedTask(listTasks.find(item => item._id === state.idTaskToEdit))
    }, [listTasks, state.idTaskToEdit])
    

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!state.openRightForm || dropdown.current.contains(target) || trigger.current.contains(target) ) return;
            dispatch({ type: 'OPEN_RIGHT_FORM', openRightForm: false, idTaskToEdit: null});
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!state.openRightForm || keyCode !== 27) return;
            dispatch({ type: 'OPEN_RIGHT_FORM', openRightForm: false, idTaskToEdit: null});
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    /* if(state.idTaskToEdit != null) {
        console.log(listTasks.find(item => item._id === state.idTaskToEdit))
        //setSelectedTask(listTasks.find(item => item._id === state.idTaskToEdit))
    } */

   

    return (
        <div className="inline-flex ml-3" ref={trigger}>
            <Transition
                
                className="fixed origin-top-right z-40 top-0 right-0 -mr-48 sm:mr-0 w-80 h-screen overflow-y-auto min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden"
                show={state.openRightForm}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 translate-x-2"
                enterEnd="opacity-100 translate-x-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    
                >
                    <div className="flex justify-between items-center  text-xs font-semibold text-slate-400 uppercase p-2">
                        <button onClick={() => dispatch({ type: 'OPEN_RIGHT_FORM', openRightForm: false, idTaskToEdit: null })} className='border px-2 py-1'>x</button>
                        {/* <span>Notificaciones</span> */}
                    </div>
                    <div className='border px-2 pt-4'>
                        Título: { selectedTask !== undefined && selectedTask !== null  ? selectedTask.name : '' }
                    </div>
                </div>
            </Transition>
        </div>
    )
}
