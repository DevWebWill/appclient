import React, { useEffect, useState } from 'react'
import { CardItem } from './CardItem'

export const ContainerCards = ({ status, items, isDragging, handleDragging,  handleUpdateList }) => {

    const [itemDrag, setItemDrag] = useState(0)

    useEffect(() => {
        if(!isDragging) {
            handleItemDrag(0)
        }
    }, [isDragging])
    

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const id = +e.dataTransfer.getData('text')
        handleUpdateList(id, status)
        handleDragging(false)
        handleItemDrag(0)
    }

    const handleItemDrag = (id) => { setItemDrag(id) }

    return (
        <div 
            className={`border rounded-md layout-cards shadow-lg h-full 
                ${isDragging ? 'border-dashed border-2' : ''} 
                ${status === 'PENDIENTE' ? 'border-orange-500 bg-orange-500 bg-opacity-40' : ''} 
                ${status === 'EN CURSO' ? 'border-blue-500 bg-blue-500 bg-opacity-40' : ''} 
                ${status === 'FINALIZADA' ? 'border-green-500 bg-green-500 bg-opacity-40' : ''} 
                ${status === 'ABORTADA' ? 'border-red-500 bg-red-500 bg-opacity-40' : ''}
            `} 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
        >
            <div className={`border-b p-4 text-center
                ${status === 'PENDIENTE' ? 'border-orange-500' : ''} 
                ${status === 'EN CURSO' ? 'border-blue-500' : ''} 
                ${status === 'FINALIZADA' ? 'border-green-500' : ''} 
                ${status === 'ABORTADA' ? 'border-red-500' : ''}
            `}>
                <p>{status}</p>
            </div>
            <div className='p-1 rounded-md'>
            {
                items.map(item => (
                    status === item.status
                    && <CardItem data={item} key={item.id} handleDragging={handleDragging} itemDrag={itemDrag} handleItemDrag={handleItemDrag}></CardItem>
                ))
            }
            </div>
        </div>
    )
}
