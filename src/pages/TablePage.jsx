import React, { useRef } from 'react'
import { Table } from '../components/table/Table'

export const TablePage = () => {

    const cotactsTable = useRef(null)

    const rolOptions = [
        { value: 1, text: 'user'}, 
        { value: 2, text: 'admin'}, 
        { value: 3, text: 'superadmin'}
    ]
  
    const path = process.env.REACT_APP_URL_API+"/users/getallusers"
    const columns = [
        {
            field: "selection-column",
            width: "25"
        },
        {
            field: "id",
            sort: true,
            truncate: true,
            visible: false,
            filter: {
                type: "text",
                placeholder: "Código"
            }
        },
        {
            field: "name",
            label: "Nombre",
            sort: true,
            truncate: true,
            visible: true,
            filter: {
                type: "text",
                placeholder: "Nombre"
            }
        },
        {
            field: "email",
            label: "Email",
            sort: true,
            truncate: true,
            visible: true,
            filter: {
                type: "text",
                placeholder: "Correo electrónico"
            }
        },
        {
            field: "age",
            label: "Edad",
            sort: true,
            truncate: true,
            visible: true,
            filter: {
                type: "text",
                placeholder: "Edad"
            }
        },
        {
            field: "role",
            label: "Rol",
            sort: true,
            truncate: true,
            visible: true,
            filter: {
                type: "select",
                placeholder: "Rol",
                options: rolOptions
            }
        },
    ]
   

    return (
        <div className='border rounded-md shadow-lg p-4 dark:bg-gray-700'>
            <Table cotactsTable={cotactsTable} columns={columns} path={path}></Table>
        </div>
    )
}
