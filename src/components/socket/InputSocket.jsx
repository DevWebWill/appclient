import React from 'react';

const InputSocket = ({ setMessage, sendMessage, message, toRoom }) => (
    <form className="form flex justify-between h-full">
        <input
            className="border-t w-full px-2 ring-0 focus:ring-0 focus:outline-none"
            type="text"
            placeholder="¿En qué podemos ayudarte?"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyDown={event => event.key === 'Enter' ? sendMessage(event, toRoom) : null}
        />
        <button className="px-2 text-white bg-green-500" onClick={event => sendMessage(event, toRoom)}>Enviar</button>
    </form>
)

export default InputSocket;