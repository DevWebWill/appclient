import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            { <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
            
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div>
                    <Outlet />
                </div>
            </div>

        </div>
    );
}