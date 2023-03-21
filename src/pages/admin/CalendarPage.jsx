import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { Calendar } from '../../components/calendar/Calendar'

export const CalendarPage = () => {
    const { user, tasks } = useLoaderData();
    const [listTasks, setListTask] = useState(tasks)

    async function addTask(datosTask) {
        //console.log('datosTask: ', datosTask)
        let token = localStorage.getItem("token")
        const obj = {
            _id: user._id,
            task: datosTask
        }
        const _task = await fetch(process.env.REACT_APP_URL_API+"/task/set-task", {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'Content-type': "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            return data.data
        })
        //const _task = 
        //listTasks.tasks.push(_task)
        //const arr = listTasks.tasks
        //setListTask({tasks: arr})
        return _task
    }

    async function deleteTask(idTask) {
        /* const arr = listTasks.filter(element => element._id !== idTask)
        setListTask(arr) */
        
        let token = localStorage.getItem("token")
        const obj = {
            _id: user._id,
            idTask: idTask
        }
        fetch(process.env.REACT_APP_URL_API+"/task/delete-task", {
            method: 'DELETE',
            headers: {
                'x-access-token': token,
                'Content-type': "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    async function moveTask(task) {
        let token = localStorage.getItem("token")
        await fetch(process.env.REACT_APP_URL_API+"/task/move-task", {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'Content-type': "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return data.data
        })
    }

    return (
        <Calendar listTasks={listTasks} setListTask={setListTask} addTask={addTask} deleteTask={deleteTask} moveTask={moveTask}></Calendar>
    )
}
