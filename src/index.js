import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import store from './state/store'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google';

import ErrorPage from './pages/ErrorPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { CalendarPage } from './pages/CalendarPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { TablePage } from './pages/TablePage';
import { SelectPage } from './pages/SelectPage';
import { ObservableEx } from './pages/ObservableEx';

export async function loader() {
    let token = localStorage.getItem("token")
    if(token !== undefined && token !== null) {
        //GET USER
        const user = await fetch(process.env.REACT_APP_URL_API+"/users/getuser", {
            headers: {'x-access-token': token},
        })
        .then(res => res.json())
        .then(data => {
            if(data.isLogin) {
                return data.user
            } else {
                localStorage.removeItem("token")
                return null
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
        if(data.isLogin) {
            return true
        } else {
            return false
        }
        
    }).catch(error => {
        console.error('Error al conectar con el servidor, ', error)
    })
    
    if (!isLogin) {
        return <Navigate to="/login" replace />
    }  
    return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/observable",
        element: <ObservableEx />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        loader: loader,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <DashboardPage /> },
            {
                path: "contactos",
                element: <ContactPage></ContactPage>,
                errorElement: <ErrorPage />
            },
            {
                path: "calendario",
                element: <CalendarPage />,
                loader: loader,
                errorElement: <ErrorPage />
            },
            {
                path: "componentes",
                element: <ComponentsPage />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <ComponentsPage /> },
                    {
                        path: "selects",
                        element: <SelectPage></SelectPage>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "checkboxs",
                        element: <CheckboxPage></CheckboxPage>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "tables",
                        element: <TablePage></TablePage>,
                        errorElement: <ErrorPage />
                    }
                ]
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
    <GoogleOAuthProvider clientId="974882295012-1456iesh0jcmadau4pac5k7t9ub1tk94.apps.googleusercontent.com">
        <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
