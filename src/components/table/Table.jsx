import React, { useEffect, useRef, useState } from 'react'
/* import { Modal } from '../Modal' */
import { Select } from '../select/Select'

export const Table = ({columns, path, children}) => {

    const filtersInput = useRef(null)
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const limits = [1, 10, 20, 50, 100, 200, 500, 800]
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10)
    const [showOptionsLimit, setShowOptionsLimit] = useState(false)
    const [filters, setFilters] = useState([['limit', limit], ['skip', skip]])

    /* const [openModal, setOpenModal] = useState(false) */
    /* const [modalType, setModalType] = useState()
    const [modalMessage, setModalMessage] = useState(false) */

    useEffect(() => {
        //console.log(filters)
        getAllUser(path, filters);
    }, [path, filters])

    const getAllUser = async (path, filters) => {
        let token = localStorage.getItem("token")
        //let obj = Object.fromEntries(filters)
        let url = path + "?" + new URLSearchParams(filters)
        //console.log(filters)
        //console.log(url)
        
        if(token !== undefined && token != null) {
            await fetch(url , {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                },
            })
            .then(res => res.json())
            .then(data => {
                setRows(data.users)
                setTotal(data.total)
                //return data.users
            }).catch(error => {
                console.error('Error al conectar con el servidor, ', error)
            })
        }
    }

    const handleActionSelected = (selected, field) => {
        //console.log(`${field}: `, selected);
        setFilters(filters.filter(item => item[0] !== field))
        selected.forEach(filter => {
            setFilters(filters => [...filters, [field, filter.text]])
            setFilters(filters => [...filters, [field, filter.text]])
        })
    }

    const handleKeyDown = async (e) => {
        if(e.key === 'Enter') {
            let key = e.target.name
            let value = e.target.value
            
            if(filters.find(element => element[0] === key)) {
                setFilters(filters.filter(item => item[0] !== key))
                if(value !== '') {
                    setFilters(filters => [...filters, [key, value]])
                }
            } else {
                if(value !== '') {
                    setFilters(filters => [...filters, [key, value]])
                }
            }
        }
    }

    const clearFilters = () => {
        let arrayChildren = filtersInput.current.children
        for(let child of arrayChildren) {
            if(child.childNodes.length > 0 && child.childNodes[0].type === 'text') {
                child.childNodes[0].value = ''
            }
        }
        
        setFilters(filters.filter(item => item[0] === 'limit'))
    }

    const newLimit = (lim) => {
        //console.log(lim)
        setLimit(lim)
        setFilters(filters.filter(item => item[0] !== 'limit'))
        setFilters(filters => [...filters, ['limit', lim]])
        setShowOptionsLimit(!showOptionsLimit)
    }

    const nextPage = async () => {
        await setSkip(skip + limit)
        setFilters(filters.filter(item => item[0] !== 'skip'))
        setFilters(filters => [...filters, ['skip', (skip + limit)]])
    }

    const previousPage = async () => {
        await setSkip(skip - limit)
        setFilters(filters.filter(item => item[0] !== 'skip'))
        setFilters(filters => [...filters, ['skip', (skip - limit)]])
    }

    return (
        <div className="overflow-x-auto dark:bg-gray-700" style={{minHeight: '300px'}}>
            <div className='mb-2 flex justify-end gap-2'>
                <button 
                    onClick={ () => setShowOptionsLimit(!showOptionsLimit) }
                    type="button" 
                    className="relative flex justify-center align-middle p-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm py-2.5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                    </svg>
                    <span className='mt-0.5'>{ limit }</span>
                    { 
                        showOptionsLimit &&
                        <ul className="absolute z-10 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm top-full">            
                            {
                                limits.map(lim => {
                                    return <li 
                                        key={lim}
                                        onClick={ () => newLimit(lim) } 
                                        className="group text-gray-900 relative text-center cursor-default select-none py-2 hover:bg-blue-400"
                                    > 
                                        <span className="font-normal block text-center text-gray-900 w-full h-full">{ lim }</span>                       
                                    </li>
                                })
                            }
                        </ul>
                    }
                </button>
                <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-3 py-2.5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                <button 
                    onClick={() => clearFilters()}
                    type="button" 
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-3 py-2.5 text-center">
                    <svg fill="#ffffff" className="w-6 h-6" viewBox="0 0 256.00098 256.00098" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="5.120019600000001">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path d="M216.001,211.833H120.6875l98.14258-98.1416a20.0237,20.0237,0,0,0-.001-28.28418L173.57422,40.15234a20.01987,20.01987,0,0,0-28.2832,0l-56.564,56.564-.00537.00439-.00439.00537-56.564,56.564a20.02163,20.02163,0,0,0,0,28.2832l37.08887,37.08789a4.00051,4.00051,0,0,0,2.82812,1.17188H216.001a4,4,0,0,0,0-8ZM150.94727,45.80859a12.0157,12.0157,0,0,1,16.9707,0l45.25488,45.25489a12.016,12.016,0,0,1,0,16.97168L159.43213,161.7749,97.20654,99.54932ZM109.37305,211.833H73.72754l-35.918-35.916a12.01392,12.01392,0,0,1,0-16.9707l53.74072-53.74072,62.22559,62.22558Z"/> </g>
                    </svg>
                </button>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm dark:bg-gray-800 border dark:border-gray-500 rounded">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {
                            columns.map(column => {
                                if(column.visible === undefined || (column.visible !== undefined && column.visible === true)) {
                                    if(column.field === 'selection-column') {
                                        return <th key={ column.field } className="px-4 pt-4 text-center">
                                            <input type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </th>
                                    } if(column.field === 'actions') { 
                                        return <th key={ column.field } className="px-4 pt-4 text-center">
                                        { column.label }
                                        </th>
                                    } else {
                                        return <th key={ column.field } className="px-4 pt-4 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-gray-100">
                                            { column.label }
                                        </th>
                                    }
                                } else {
                                    return ""
                                }
                            })
                        }
                    </tr>
                    <tr ref={filtersInput}>
                        {
                            columns.map(column => {
                                if(column.visible === undefined || (column.visible !== undefined && column.visible === true)) {
                                    if(column.field === 'selection-column') {
                                        return <th key={ column.field } className="px-4 py-1 text-left">
                                            
                                        </th>
                                    } else if(column.field === 'actions') {
                                        return <th key={ column.field } className="px-4 py-1 text-left">
                                            
                                        </th>
                                    } else if(column.filter.type === 'text') {
                                        return <th key={ column.field } className="px-4 py-1 text-left">
                                            <input 
                                                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none" 
                                                placeholder={column.filter.placeholder}
                                                type="text" 
                                                name={column.field}
                                                onKeyDown={(e) => handleKeyDown(e)}
                                            />
                                        </th>
                                    } else if(column.filter.type === 'select') {
                                        return <th key={ column.field } className="px-4 py-1 text-left">
                                            {/* <Select options={column.filter.options} ></Select> */}
                                            <Select handleActionSelected={handleActionSelected} options={column.filter.options} multiple={true} flexLabel={false} field={column.field}></Select>
                                        </th>
                                    } else {
                                        return ""
                                    }
                                } else {
                                    return ""
                                }
                            })
                        }
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-500" style={{borderTop: '1px solid #cccccc'}}>
                    {
                        rows !== undefined && rows.length > 0 ?
                            rows.map(row => {

                                return <tr key={row._id} className='bg-white  dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                    {
                                        columns.map(column => {
                                            if(column.field === 'selection-column') {
                                                return <td key={column.field} className='text-center'>
                                                    {/* <label htmlFor="SelectAll" className="sr-only">Select All</label> */}
                                                    <input type="checkbox" id="SelectAll" className="h-5 w-5 rounded border-gray-300"/>
                                                </td>
                                            } else if(column.field === 'actions') {
                                                return <td key={column.field} className='text-center'>
                                                    {/* <button 
                                                        onClick={() => console.log('Editar: ', row._id)}
                                                        type="button" 
                                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-1.5 py-1.5 m-0.5 text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => console.log('Ver: ', row._id)}
                                                        type="button" 
                                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-1.5 py-1.5 m-0.5 text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setModalType('danger')
                                                            setModalMessage('¿Está seguro de eliminar este registro?')
                                                            setOpenModal(true)
                                                            console.log('Eliminar: ', row._id)
                                                        }}
                                                        type="button" 
                                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-sm px-1.5 py-1.5 m-0.5 text-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button> */}
                                                    {children}
                                                </td>
                                            } else if((column.field && column.visible === undefined) || column.visible === true) {
                                                return  <td key={column.field} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">{ row[column.field] }</td>
                                            } else {
                                                return ''
                                            }
                                        })
                                    }
                                </tr>
                            })
                        :
                        <tr className='h-16 p-0 m-0'>
                            <td className='text-center p-0 m-0' colSpan={columns.length}>No se han encontrado resultados para los criterios definidos</td>
                        </tr>
                    }
                </tbody>
            </table>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-2">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium mx-1">{skip+1}</span> a 
                        <span className="font-medium mx-1">
                            {
                                skip === 0 && rows.length < limit ? rows.length : skip + limit
                            }
                        </span>
                        de <span className="font-medium mx-1">{total}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button onClick={() => previousPage()} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {/* 
                        <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                         */}
                        <button onClick={() => nextPage()} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
            {/* <Modal open={openModal} setOpen={setOpenModal} type={modalType} message={modalMessage}></Modal> */}
        </div>
    )
}
