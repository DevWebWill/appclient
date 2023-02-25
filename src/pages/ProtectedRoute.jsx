import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    console.log(children)

    useEffect(() => {
        console.log('xcv')
        let token = localStorage.getItem("token")
        if(token === null || token === "") {
            return setIsAuthenticated(false)
        }
    
        fetch(process.env.REACT_APP_URL_API+"/isuserauth", {
            headers: {'x-access-token': token},
        })
        .then(res => res.json())
        .then(data => {
            setIsAuthenticated(data.isLogin)
        })
        .catch(error => {
            console.error('Error al conectar con el servidor, ', error)
        })

    }, [])
    

    return (
        <>
            {   isAuthenticated ? children : <Navigate to="/login" replace />
            }
        </>
    )
}
