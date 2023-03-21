import React, { useContext, useEffect, useRef } from 'react'
import { Transition } from '../../utils/Transition';
import { CalendarContext, CalendarDispatchContext } from './CalendarContext.js';

export const SidebarRightForm = () => {

    //const [dropdownOpenRightForm, setDropdownOpenRightOpen] = useState(false);

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext)

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!state.dropdownOpenRightForm || dropdown.current.contains(target) || trigger.current.contains(target) ) return;
            dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: false});
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
        if (!state.dropdownOpenRightForm || keyCode !== 27) return;
            dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: false});
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="inline-flex ml-3" ref={trigger}>
            <Transition
                
                className="origin-top-right z-40 absolute top-0 right-0 -mr-48 sm:mr-0 w-80 h-screen overflow-y-auto min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden"
                show={state.dropdownOpenRightForm}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 translate-x-2"
                enterEnd="opacity-100 translate-x-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: true})}
                    onBlur={() => dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: false})}
                >
                    <div className="flex justify-between items-center  text-xs font-semibold text-slate-400 uppercase p-2">
                        <button onClick={() => dispatch({ type: 'OPEN_RIGHT_FORM', dropdownOpenRightForm: false})} className='border px-2 py-1'>x</button>
                        {/* <span>Notificaciones</span> */}
                    </div>
                    <div className='border px-2 pt-4'>
                        Título:
                    </div>
                </div>
            </Transition>
        </div>
    )
}
