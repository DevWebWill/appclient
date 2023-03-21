import React from 'react'

export const CardItem = ({ data, handleDragging, itemDrag, handleItemDrag }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text', `${data.id}`)
        handleDragging(true)
        handleItemDrag(data.id)
    }
    const handleDragEnd = () => handleDragging(false)
    return (
        <div className={`border mt-1 px-4 py-2 bg-white rounded-md
            ${data.id === itemDrag ? 'opacity-40' : ''}
        `}
            draggable 
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd}
        >
            <h3 className='font-semibold text-sm'>
                {data.title}
            </h3>
            <span>
                { data.description }
            </span>
        </div>
    )
}
