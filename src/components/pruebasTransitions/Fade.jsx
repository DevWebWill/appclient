import { Transition } from 'react-transition-group';
import React, { useRef, useState } from 'react';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

export function Fade() {
    const [inProp, setInProp] = useState(false);
    const nodeRef = useRef(null);
    return (
        <div>
            <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
                {state => (
                    <div 
                        ref={nodeRef} style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        className="text-slate-800"
                    >
                        I'm a fade Transition!
                    </div>
                )}
            </Transition>
            <button onClick={() => setInProp(!inProp)}>
                Click to Enter
            </button>
        </div>
    );
}