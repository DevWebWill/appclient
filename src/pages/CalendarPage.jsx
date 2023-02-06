import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { Calendar } from '../components/calendar/Calendar'

export const CalendarPage = () => {
    const { user, tasks } = useLoaderData();
    const [listTasks, setListTask] = useState({tasks: tasks})

    async function addTask(datosTask) {
        const obj = {
            _id: user._id,
            task: datosTask
        }
        const _task = await fetch(process.env.REACT_APP_URL_API+"/task/set-task", {
            method: 'PUT',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
            return data.data
        })
        
        listTasks.tasks.push(_task)
        const arr = listTasks.tasks
        setListTask({tasks: arr})
    }

    function deleteTask(idTask) {
        const arr = listTasks.tasks.filter(element => element._id !== idTask)
        setListTask({tasks: arr})
        
        const obj = {
            _id: user._id,
            idTask: idTask
        }
        fetch(process.env.REACT_APP_URL_API+"/task/delete-task", {
            method: 'DELETE',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <Calendar listTasks={listTasks} addTask={addTask} deleteTask={deleteTask} ></Calendar>
    )
}
