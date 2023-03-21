import React, { useState } from 'react'
import { ContainerCards } from './ContainerCards'
import { STATUS } from './model/Status.enum'
import { Task } from './model/Task'


export const DragAndDrop = () => {

    const types = ['PENDIENTE', 'EN CURSO', 'FINALIZADA', 'ABORTADA']
    const defaultTask1 = new Task(1, 'Desarrollo Carga Bash', 'Carga de ficheros a la BD por bash', STATUS.PENDIENTE)
    const defaultTask2 = new Task(2, 'Desarrollo Visión Global', 'Desarrollo fullstack de Visión Global', STATUS.EN_CURSO)
    const defaultTask3 = new Task(3, 'Importación y Exportación de Ficheros', 'Desarrollo de la importación y exportación de ficheros en la web y bash', STATUS.PENDIENTE)
    const defaultTask4 = new Task(4, 'Módulo Auth', 'Mejora y desarrollo del módulo de autenticación y administración de roles', STATUS.FINALIZADA)
    const defaultTask5 = new Task(5, 'Desarrollo CRUD Elementos', 'Desarrollo de las pantallas de CRUD de los elementos y lógica backend', STATUS.EN_CURSO)
    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3, defaultTask4, defaultTask5])

    const [isDragging, setIsDragging] = useState(false)

    const handleDragging = (dragging) => setIsDragging(dragging)

    const handleUpdateList = (id, status) => {

        let card = tasks.find(item => item.id === id)
 
        if (card && card.status !== status) {
 
            card.status = status
 
            setTasks( prev => ([
                 ...prev.filter(item => item.id !== id),
                 card,
             ]))
        }
    }

    return (
        <div className='grid grid-cols-4 gap-4 h-full'>
            {
                types.map( container => (
                    <ContainerCards
                        status={container}
                        key={container}
                        items={tasks}
                        setTasks={setTasks}

                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                    />
                ))
            }
        </div>
    )
}
