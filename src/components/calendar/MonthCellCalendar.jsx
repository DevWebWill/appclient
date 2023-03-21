import { useContext } from "react"
import { Task } from "./Task"
import { CalendarContext, CalendarDispatchContext } from './CalendarContext.js';

export const MonthCellCalendar = ({ listTasks, DAYS_OF_THE_WEEK, days, setPoints, triggerCell, deleteTaskBySocket, tamVentana, isDragging, setIsDragging, handleUpdateList }) => {

    const state = useContext(CalendarContext)
    const dispatch = useContext(CalendarDispatchContext);

    /* function findTask(d) {
        if(listTasks !== undefined) {
            //console.log(listTasks)
            //console.log('aaaaaaaaa')
            let tasks = listTasks.filter((task) => {
                let taskTemp = new Date(task.date)
                return  taskTemp.getDate() === d && taskTemp.getMonth() === state.month && taskTemp.getFullYear() === state.year
            })
            return tasks
        } else {
            return []
        }
        
    } */

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, d) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text')
        //let date = year + '-' + month + '-' + d
        let date = new Date(state.year, state.month, d)
        //console.log('OOKKK: ', id, date)
        handleUpdateList(id, date, false)
        setIsDragging(false)
    }


    /* console.log(Array(days[state.month] + (startDay - 1)))
    Array(days[state.month] + (state.startDay - 1)).fill(null).map((_, index) => {
        console.log('Pesfsafg')
    }) */
    

    return (
        <div className='grid grid-cols-7'>
            {
                DAYS_OF_THE_WEEK.map((d, index) => (
                        <div key={d+index} className='pl-2 font-semibold border-r border-b lg:hidden'>
                           {d.charAt(0)}
                        </div>
                ))
            }
            {
                DAYS_OF_THE_WEEK.map((d, index) => (
                    <div key={d+index} className='pl-2 font-semibold border-r border-b hidden lg:block'>
                        {d}
                    </div>
                ))
            }
            {
                Array(days[state.month] + (state.startDay - 1)).fill(null).map((_, index) => {
                    const d = index - (state.startDay - 2);
                    return (
                        <div
                            onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, d)}
                            ref={triggerCell}
                            //onContextMenu={(e) => {
                            //    e.preventDefault(); // prevent the default behaviour when right clicked
                            //    setMenuContext(true)
                            //    setPoints({
                            //        x: e.pageX,
                            //        y: e.pageY,
                            //        screenX: e.screenX,
                            //        screenY: e.screenY,
                            //        layerX: e.nativeEvent.layerX,
                            //        layerY: e.nativeEvent.layerY
                            //    });
                            //    setSelectedDate(new Date(year, month, d))
                            //    setDate(new Date(year, month, d))
                            //    //cconsole.log("Right Click", e.pageX, e.pageY, e);
                            //}}
                            key={index}
                            onClick={ (e) => {
                                e.preventDefault();
                                //dispatch({ type: 'SET_DATE', date: new Date(state.year, state.month, d), selectedDate: new Date(state.year, state.month, d) })
                                //setSelectedDate(new Date(year, month, d))
                                //setDate(new Date(year, month, d))

                                const newDate = new Date(state.year, state.month, d)
                                dispatch({ 
                                    type: 'SET_DATE', 
                                    date: newDate, 
                                    day: newDate.getDate(), 
                                    month: newDate.getMonth(), 
                                    year: newDate.getFullYear(), 
                                    selectedDate: newDate,
                                    startDay: newDate
                                })
                                dispatch({ type: 'MENU_MODAL_OPEN', menuModalOpen: true });
                                
                                if(tamVentana() !== undefined) {
                                    if((e.pageX + 240) > tamVentana()[0]) {
                                        setPoints({
                                            layerX: e.nativeEvent.layerX-240,
                                            layerY: e.nativeEvent.layerY
                                        })
                                    } else {
                                        setPoints({
                                            layerX: e.nativeEvent.layerX,
                                            layerY: e.nativeEvent.layerY
                                        })
                                    }
                                }
                            } }
                            className={`cursor-pointer border-r border-b pl-1 pr-1 ${d === new Date().getDate() && state.month === new Date().getMonth() ? 'bg-slate-100' : ''} ${d === state.selectedDate.getDate() && state.month === state.selectedDate.getMonth() ? 'bg-blue-100 bg-opacity-40' : ''}`}
                            style={{ minHeight: '110px' }}
                        >
                            {d > 0 ? d : ''}
                            {   

                                listTasks.map((task, index2) => {
                                    let dateOfTask = new Date(task.date)
                                    
                                    if(dateOfTask.getFullYear() === state.year && dateOfTask.getMonth() === state.month && dateOfTask.getDate() === d) {
                                        return <Task key={index2} deleteTaskBySocket={deleteTaskBySocket} task={task} setIsDragging={setIsDragging}></Task>
                                    } else {
                                        return null
                                    }
                                    
                                })

                                
                                
                            }
                        </div>
                    );        
                })
            }
            
        </div>
    )
}
