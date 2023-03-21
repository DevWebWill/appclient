import React from 'react'
import { Container } from './Container'
//const cards = {"border":"1px solid", "display":"block"};

export const Sorteable = () => {
    return (
        <div className='grid grid-cols-2'>
            <Container>
                <div key={1} draggable="true" className='border p-4 mb-0.5'>1 - First</div>
                <div key={2} draggable="true" className='border p-4 mb-0.5'>2 - Hello</div>
                <div key={3} draggable="true" className='border p-4 mb-0.5'>3 - How</div>
                <div key={4} draggable="true" className='border p-4 mb-0.5'>4 - Last</div>
            </Container>
        </div>
    )
}
