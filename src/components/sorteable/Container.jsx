import React, { cloneElement, useState } from 'react'

export const Container = ({children}) => {
    //const [dragged, setDragged] = useState(null)
    const [draggedOver, setDraggedOver] = useState(null)
    const [draggedL, setDraggedL] = useState(null)
    const [draggedOverL, setDraggedOverL] = useState(null)
    const [content, setContent] = useState(children)
    const [isDragging, setIsDragging] = useState(false)

    const [tmpContent, setTmpContent] = useState(children)

    const dragStart = (ev) => {
        let location = [].indexOf.call(ev.target.parentNode.children, ev.target);
        //setDragged(ev.target)
        setDraggedL(location)
        ev.dataTransfer.effectAllowed = 'copy'

        setIsDragging(true)

        //console.log('dragStart')
    }
    
    const onDrop = (ev) => {
        let tmpContent = [].concat(content);
        let newContent = tmpContent.filter((item, i) => {
            if(i !== draggedL) {
                return item
            } else {
                return null
            }
        })
        newContent.splice(draggedOverL, 0, tmpContent[draggedL] );
        
        let mierda = newContent.map((child) => cloneElement(child, {'style': {background: 'transparent'}} ));
        
        setContent(mierda)
        setTmpContent(mierda)

        setIsDragging(false)

        //console.log('onDrop')
    }
    
    const prevent = (ev) => {
        ev.preventDefault();
    }
    
    const over = (ev) => {
        if(ev.target === draggedOver) return;
        let location = [].indexOf.call(ev.target.parentNode.children, ev.target);
        setDraggedOver(ev.target)
        setDraggedOverL(location)

        let tmpContent = [].concat(content);
        let newContent = tmpContent.filter((item, i) => {
            if(i === draggedL) {
                return null
            } else {
                /* if(i === location) {
                    return cloneElement(item, {'style': {background: 'blue'}})
                } else {
                    return cloneElement(item, {'style': {background: 'transparent'}})
                } */
                return item
            }
            
        })
        newContent.splice(location, 0, cloneElement(tmpContent[draggedL], {'style': {border: '1px dashed'}}) );
        setTmpContent(newContent)

        //console.log(draggedL, location)
    }

    let mierda = '';
    if(isDragging) {
        mierda = tmpContent.map((child) => cloneElement(child,{'onDragStart':dragStart, "onDragEnter":over,  onDrop:onDrop, "onDragOver":prevent }));
    } else {
        mierda = content.map((child) => cloneElement(child,{'onDragStart':dragStart, "onDragEnter":over,  onDrop:onDrop, "onDragOver":prevent }));
    }

    return (
        <div id="container" className='grid grid-cols-1 border rounded-md p-2'>
            {
                mierda
            }
        </div>
    )
}
