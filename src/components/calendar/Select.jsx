import React, { useContext } from 'react'
import { useState } from 'react'
import { CalendarContext, CalendarDispatchContext } from './CalendarContext'

export const Select = () => {

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext)

    const options = ['Semana', 'Mes', 'Año']
    const [show, setShow] = useState(false)
    

    return (
        <div className='flex items-center'>
            <label id="listbox-label" className="block text-base font-medium text-gray-700 mr-2">Vista:</label>
            <div className="relative w-40">
                <button 
                    onClick={() => setShow(!show)}
                    type="button" 
                    className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
                    aria-haspopup="listbox" 
                    aria-expanded="true" 
                    aria-labelledby="listbox-label"
                >
                    <span className="flex items-center">
                        {/* <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                        <span className="ml-3 block truncate">{ state.selectedView }</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button>

                { show &&
                    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        {
                            options.map((element) => {
                                return ( 
                                    state.selectedView === element ? '' :
                                        <li onClick={() => { 
                                                dispatch({ type: 'SELECTED_VIEW', selectedView: element }); 
                                                setShow(false) 
                                            }} 
                                            key={element} 
                                            className="group text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0"
                                        >
                                            <div className="flex items-center">
                                                {/* <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                                                <span className="font-normal ml-3 block truncate">{element}</span>
                                            </div>
                                            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100">
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </div>

    )
}
