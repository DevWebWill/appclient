import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import InputSocket from '../../components/socket/InputSocket';
import { MessagesSocket } from '../../components/socket/MessagesSocket';

let socket;

export const SocketPage = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = process.env.REACT_APP_URL_API

    useEffect(() => {

        socket = io(ENDPOINT)
        
        return () => {
            socket.emit('disconnectt')
            socket.off()
        }
        
    }, [ENDPOINT])

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
            setMessages([...messages, message])
        }, [messages])
    })

    const sendMessage = (event) => {
        event.preventDefault();
        console.log(message)
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    
    return (
        <div>
            <MessagesSocket messages={messages} />
            <InputSocket message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}
