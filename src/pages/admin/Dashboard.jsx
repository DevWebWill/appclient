import React, { useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";


export const Dashboard = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    //const [user, setUser] = useState({})
    const { user } = useLoaderData();

    const logout = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    /* useEffect(() => {
        let token = localStorage.getItem("token")
        if(token !== undefined && token != null) {
            fetch(process.env.REACT_APP_URL_API+"/getuser", {
                headers: {'x-access-token': token},
            })
            .then(res => res.json())
            .then(data => {
                if(data.isLogin) {
                    setUser(data.user)
                    //console.log(data.user)    
                } else {
                    //console.log('El usuario no esta logueado')
                    navigate('/login')
                }
                
            })
        } else {
            //console.log('No encontro el token')
        }
    }, []) */

    return (
        <div className="flex h-screen overflow-hidden">
            { <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
            
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} logout={logout}/>

                <div className="p-2 h-full">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}