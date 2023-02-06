import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BodyDashboard } from './components/BodyDashboard';
import { CalendarPage } from './pages/CalendarPage';

export async function loader() {
    let token = localStorage.getItem("token")
    if(token !== undefined && token != null) {
        //GET USER
        const user = await fetch(process.env.REACT_APP_URL_API+"/user/getuser", {
            headers: {'x-access-token': token},
        })
        .then(res => res.json())
        .then(data => {
            if(data.isLogin) {
                return data.user
            } else {
                return <Navigate to="/login" replace />
            }
            
        }).catch(error => {
            console.error('Error al conectar con el servidor, ', error)
        })

        //GET TASKS
        const tasks = await fetch(process.env.REACT_APP_URL_API+"/task/get-tasks", {
            headers: {'x-access-token': token},
        })
        .then(res => res.json())
        .then(data => {
            return data.tasks
        }).catch(error => {
            console.error('Error al conectar con el servidor, ', error)
        })

        //console.log(new Date(tasks[4].date))
        return {user, tasks}
    } else {
        console.log('No encontro el token')
        return null
    }
}
    
const ProtectedRoute = ({ children }) =>  {
    let token = localStorage.getItem("token")
    if(token === null || token === "") {
        return <Navigate to="/login" replace />
    }

    let isLogin = fetch(process.env.REACT_APP_URL_API+"/isuserauth", {
        headers: {'x-access-token': token},
    })
    .then(data => {
        return data.isLogin === true ? true : false
    }).catch(error => {
        console.error('Error al conectar con el servidor, ', error)
    })
    
    if (!isLogin) {
        return <Navigate to="/login" replace />
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
        loader: loader,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <BodyDashboard /> },
            {
                path: "contactos",
                element: <div>Contactos</div>,
                errorElement: <ErrorPage />
            },
            {
                path: "calendario",
                element: <CalendarPage />,
                loader: loader,
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
