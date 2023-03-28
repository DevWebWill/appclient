import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import InputSocket from '../../components/socket/InputSocket';
import { MessagesSocket } from '../../components/socket/MessagesSocket';

let socket;

export const Messages = ({user}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [rooms, setRooms] = useState([])
    const [activeTab, setActiveTab] = useState(0)
    const [openChat, setOpenChat] = useState(false)

    const ENDPOINT = process.env.REACT_APP_URL_API

    useEffect(() => {
        //Obtiene un nombre y su sala desde el localStorage
        let name = localStorage.getItem('name');
        let room = localStorage.getItem('chatroom');

        //Si no existe crea un nombre por defecto y un nombre para la sala
        if(name === null) { name = 'Usuario'; }
        if(room === null) { room = `chat${new Date().getTime()}`; }
        
        //Si el usuario no es superadmin guarda el nombre y la sala en localStorage
        if(user.role !== 'superadmin') {
            localStorage.setItem('name', name)
            localStorage.setItem('chatroom', room)
        }

        //ENDPOINT del socket
        socket = io(ENDPOINT)

        /**
         * Si el usuario no es superadmin lo conecta a la sala obtenida anteriormente con el nombre por defecto
         */
        if(user.role !== 'superadmin') {
            socket.emit('join', {name, room}, () => {})
        }

        return () => {
            socket.emit('disconnectt')
            socket.off()
        }
        
    }, [ENDPOINT, user.role, rooms])

    useEffect(() => {
        /**
         * Escucha todos los mensajes enviados por los usuarios. Cada mensaje solo será escuchado por el propio 
         * usuario y un superadmin conectado a la sala del usuario
         */
        socket.on('message', ({client, room, message}) => {
            setMessages([...messages, {client: client, room: room, message: message}])
        }, [messages])
        
        /**
         * Reconecta el usuario y avisa al Admin para que este reciba nuevos mensajes. Esto se hace por si el 
         * superadmin actualiza su página poder recuperar la sala del usuario.
         */
        let name = localStorage.getItem('name');
        let room = localStorage.getItem('chatroom');
        if(user.role !== 'superadmin') {
            socket.emit('join', {name, room}, () => {})
        }

        /** 
         * Si el usuario es superadmin escucha y obtiene la sala del usuario que se conecte.
         * Luego avisa al superadmin para que se conecte a la sala del usuario
         */
        if(user.role === 'superadmin') {
            socket.on('superadmin', ({client, room}) => {
                let name = 'Admin'
                socket.emit('joinadmin', {name, room}, (room) => {
                    const exist = rooms.find(r => {
                        return r===room ? r : null;
                    })
                    if(exist === undefined || exist === null) {
                        setRooms([...rooms, room])
                    }
                    
                })
            })
        }
        
    })

    /**
     * Envía mensaje al backend para enviarlo luego al superadmin y al propio usuario
     */
    const sendMessage = (event, toRoom) => {
        event.preventDefault();
        let name = localStorage.getItem('name');
        let room = localStorage.getItem('chatroom');
        
        
        if(user.role !== 'superadmin' && message) {
            socket.emit('sendMessage', {name, room, message}, () => setMessage(''))
        } else if(user.role === 'superadmin' && toRoom !== null) {
            name = 'Admin'
            room = toRoom;
            socket.emit('sendMessage', {name, room, message}, () => setMessage(''))
        }
    }

    console.log(openChat)

    let content = null
    if(user.role !== 'superadmin') {
        content = <div className='absolute flex justify-center items-center w-12 h-12 rounded-full bottom-4 right-4'>
            <button onClick={() => setOpenChat(!openChat)} className='flex justify-center items-center w-12 h-12 rounded-full bg-green-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </button>
            
            { 
                openChat ?
                    <div className='absolute w-80 h-96 -left-80 -top-96 shadow-2xl rounded bg-white' draggable>
                        <div className='h-[10%] border-b flex justify-between items-center'>
                            <span className='px-2'>Contacta con soporte</span>
                            <span onClick={() => setOpenChat(false)} className='px-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </div>
                        <div className='h-[80%]'>
                            <MessagesSocket messages={messages} />
                        </div>
                        <div className='h-[10%]'>
                            <InputSocket message={message} setMessage={setMessage} sendMessage={sendMessage} toRoom={null}/>
                        </div>
                    </div>
                :
                    null
            }
        </div>
    } else {
        content = <div className='h-full'>
            <ul className="flex justify-center items-center my-4">
			    {/* x-for="(tab, index) in tabs" :key="index" */}
                {/* <li class="cursor-pointer py-2 px-4 text-gray-500 border-b-8"
					:class="activeTab===index ? 'text-green-500 border-green-500' : ''" @click="activeTab = index"
					x-text="tab"></li> */}
                {
                    rooms.map((room, index) => {
                        return <li 
                            key={room} 
                            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${activeTab===index ? 'text-green-500 border-green-500' : ''}`}
                            onClick={() => {
                                setActiveTab(index)
                            }}
                        >{room}</li>

                    })
				    
                }
		    </ul>

            <div className="bg-white border h-full">
                {
                    rooms.map((room, index) => {
                        if(activeTab === index) {
                            return <div key={room}  className='h-full'>
                                <div className='h-[90%]'>
                                    <MessagesSocket messages={messages} room={room} />
                                </div>
                                <div className='h-[10%]'>
                                    <InputSocket message={message} setMessage={setMessage} sendMessage={sendMessage} toRoom={room}/>
                                </div>
                            </div>
                        } else {
                            return null;
                        }
                    })
                }
            </div>
      </div>
        /* rooms.map((room) => {
            return <div key={room}>{room}</div>

        }) */
        
    }

    
    return (
        content
    )
}
