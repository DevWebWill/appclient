import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
                { <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
            


            {/* <div id="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link to={`contactos`}>Contactos</Link>
                        </li>
                        <li>
                            <Link to={`calendario`}>Calendario</Link>
                        </li>
                    </ul>
                </nav>
            </div> */}

            <div>
                <Outlet />
            </div>
        </div>
    );
}