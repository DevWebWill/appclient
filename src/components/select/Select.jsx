import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

export const Select = ({options = [], label = '', placeholder = 'Sleccionar', flexLabel = false, multiple = false, disabled = false, field = 'fieldSelect', handleActionSelected, preSelected = []}) => {
 
    const [show, setShow] = useState(false)
    const displayOptions = useRef(null);
    const buttonSelect = useRef(null);

    const [selected, setSelected] = useState(preSelected)
  
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!show || displayOptions.current.contains(target) || buttonSelect.current.contains(target)) return;
            setShow(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        handleActionSelected(selected, field)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    const handleAction = async (element) => {
        if(multiple) {
            let seleccionado = await selected.find(item => item.value === element.value)
            if(seleccionado === undefined || seleccionado === null) {
                setSelected(selected => [...selected, element])
            } else {
                setSelected(selected.filter(item => item.value !== element.value));
            }
        } else {
            await setSelected([element])
        }
        setShow(false)
    }
    
    return (
        <div className={`items-center ${flexLabel ? 'flex' : 'w-full'}`}>
            <label id="listbox-label" className="block text-base font-bold text-gray-700 mr-2">{ label }</label>
            <div className="relative w-full">
                
                <div className="flex">
                    {/* <span className="inline-flex items-center px-3 text-sm text-gray-700 border border-r-0 border-gray-300 rounded-l-md">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                    </span> */}
                    <input 
                        ref={buttonSelect}
                        onClick={() => { 
                            if(!disabled) {
                                setShow(!show) 
                            }
                        }}
                        disabled={disabled}
                        defaultValue={ 
                                !multiple ? 
                                    selected.length > 0 ? selected[0].text : '' 
                                : selected.map((element, index) => {
                                    if(index === 0) {
                                        return element.text
                                    } else if((index+1) === selected.length) {
                                        return element.text
                                    } else {
                                        return element.text
                                    }
                                    
                                }) 
                            }
                        type="text" 
                        className="rounded-none rounded-l-md border border-r-0 border-gray-300 text-gray-900 outline-none block flex-1 min-w-0 w-full text-sm py-1.5 px-2" 
                        placeholder={placeholder} />
                    <span className={`inline-flex items-center pr-1 text-sm text-gray-700 border border-l-0 border-gray-300 rounded-r-md bg-white ${disabled ? 'bg-gray-50' : ''}`}>
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                    
                </div>

                {/* <button 
                    ref={buttonSelect}
                    onClick={() => { 
                        if(!disabled) {
                            setShow(!show) 
                        }
                    }}
                    type="button" 
                    className={`relative w-full cursor-default rounded-md border border-gray-300 h-8 pl-2 pr-8 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ${disabled ? 'bg-gray-200' : 'bg-white cursor-pointer'}`} 
                    aria-haspopup="listbox" 
                    aria-expanded="true" 
                    aria-labelledby="listbox-label"
                    disabled={disabled}
                >
                    <div className="flex items-center p-0 w-100">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
                        <input className="w-100 border m-0" 
                            defaultValue={ 
                                !multiple ? 
                                    selected.length > 0 ? selected[0].text : '' 
                                : selected.map((element, index) => {
                                    if(index === 0) {
                                        return element.text
                                    } else if((index+1) === selected.length) {
                                        return element.text
                                    } else {
                                        return element.text + ','
                                    }
                                    
                                }) 
                            }
                        />
                            
                    </div>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </span>
                </button> */}

                { show &&
                    <ul ref={displayOptions} className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                        {
                            options.map((element) => {
                                return ( 
                                    
                                        <li onClick={ () => { 
                                                    handleAction(element)
                                                }
                                            } 
                                            key={ element.value } 
                                            className="group text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" 
                                            id="listbox">
                                            <div className="flex items-center">
                                                {/* <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-6 w-6 flex-shrink-0 rounded-full" /> */}
                                                <span className="font-normal ml-3 block truncate">{ element.text }</span>
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