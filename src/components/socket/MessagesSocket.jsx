
import React from 'react'

export const MessagesSocket = ({ messages, room }) => {
    return (
        <div className='p-2 h-full border overflow-y-auto'>
            {
                room !== undefined && room !== null ?
                    messages.filter(m => m.room === room).map((message, i) => {
                        if(message.client === 'Admin') {
                            return <div key={i} className="w-full flex justify-end items-center mb-2">
                                {/* <span className='w-fit'>{message.client}</span>
                                <span className='w-2 h-2 rounded-full bg-slate-600 mx-2'></span> */}
                                <span className='bg-slate-200 w-fit px-3 py-1 rounded-lg max-w-[85%]'>{message.message}</span>
                            </div>
                        } else {
                            return <div key={i} className="w-full flex justify-start mb-2">
                                <span className='bg-slate-200 w-fit px-3 py-1 rounded-lg max-w-[85%]'>{message.message}</span>
                            </div>
                        }
                    })
                :
                    messages.map((message, i) => {
                        if(message.client === 'Admin') {
                            return <div key={i} className="w-full flex justify-end items-center mb-2">
                                {/* <span className='w-fit'>{message.client}</span>
                                <span className='w-2 h-2 rounded-full bg-slate-600 mx-2'></span> */}
                                <span className='bg-slate-200 w-fit px-3 py-1 rounded-lg max-w-[85%]'>{message.message}</span>
                            </div>
                        } else {
                            return <div key={i} className="w-full flex justify-start mb-2">
                                <span className='bg-slate-200 w-fit px-3 py-1 rounded-lg max-w-[85%]'>{message.message}</span>
                            </div>
                        }
                    })

            }
        </div>
    )
}
