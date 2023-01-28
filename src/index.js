import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Calendar from './components/calendar/Calendar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';


    
const ProtectedRoute = ({ children }) =>  {
    let token = localStorage.getItem("token")
    if(token == null) {
        return <Navigate to="/login" replace />;
    }

    let isLogin = fetch(process.env.REACT_APP_URL_API+"/isuserauth", {
        headers: {'x-access-token': token},
    })
    .then(data => {
        console.log('OK')
        return data.isLogin 
    }).catch(error => {
        console.error('Error al conectar con el servidor, ', error)
    });
    
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }  
    return children;
};

/* const RedirectIfLogin = ({ children }) =>  {
    let token = localStorage.getItem("token")
    if(token == null) {
        return children;
    }
    let isLogin = fetch(process.env.REACT_APP_URL_API+"/isuserauth", {
        headers: {'x-access-token': token},
    })
    .then(res => res.json())
    .then(data => data.isLogin )
    
    if (isLogin) {
        return <Navigate to="/admin" replace />;
    }  
    return children;
}; */



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "contactos",
                element: <div>Contactos</div>,
                errorElement: <ErrorPage />
            },
            {
                path: "calendario",
                element: <Calendar />,
                errorElement: <ErrorPage />
            }
        ]
    },
    {
        path: "/hello",
        element: <div>Hello World</div>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
