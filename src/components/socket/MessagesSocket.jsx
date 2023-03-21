
import React from 'react'

export const MessagesSocket = ({ messages }) => {
    console.log(messages)
    return (
        <div>
            {
                messages.map((message, i) => {
                    return <div key={i}>
                        {message}
                    </div>
                })
            }
        </div>
    )
}
