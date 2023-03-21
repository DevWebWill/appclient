import React from 'react';

const InputSocket = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="border mr-2"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="border p-1" onClick={e => sendMessage(e)}>Send</button>
    </form>
)

export default InputSocket;