import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { Messages } from '../../components/socket/Messages';

export const SocketPage = () => {
    const { user } = useLoaderData();
    
    return (
        <div className='h-full'>
            <Messages user={user}></Messages>
        </div>
    )
}
