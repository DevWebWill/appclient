import React from 'react'

export const WeekCellCalendar = ({listTasks, DAYS_OF_THE_WEEK, year, month, date, today, selectedDate, setDate, setSelectedDate, menuContext, setMenuContext, points, setPoints, deleteTask, tamVentana}) => {

    function findTask(d) {
        let tasks = listTasks.tasks.filter((task) => {
            let taskTemp = new Date(task.date)
            return  taskTemp.getDate() === d && taskTemp.getMonth() === month && taskTemp.getFullYear() === year
        })
        return tasks
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='grid grid-cols-7'>
                {
                    DAYS_OF_THE_WEEK.map((d) => (
                        <div key={d} className='pl-2 font-medium border-r border-b h-6'>
                            {d}
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-7 h-full'>
                {
                    DAYS_OF_THE_WEEK.map((d, index) => {
                        return <div
                            key={index}
                            /* onContextMenu={(e) => {
                                e.preventDefault(); // prevent the default behaviour when right clicked
                                setMenuContext(true)
                                setPoints({
                                    x: e.pageX,
                                    y: e.pageY,
                                    screenX: e.screenX,
                                    screenY: e.screenY,
                                    layerX: e.nativeEvent.layerX,
                                    layerY: e.nativeEvent.layerY
                                });
                                setSelectedDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                setDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                //cconsole.log("Right Click", e.pageX, e.pageY, e);
                            }} */
                            onClick={ (e) => {
                                    e.preventDefault();
                                    setSelectedDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                    setDate(new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))))
                                    setMenuContext(true)

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
                                } 
                            }
                            className={`cursor-pointer border-r border-b h-full pl-1 pr-1 ${(date.getDate()-(date.getDay()-(index+1))) === today.getDate() && month === today.getMonth() ? 'bg-slate-100' : ''} ${(date.getDate()-(date.getDay()-(index+1))) === selectedDate.getDate() && month === selectedDate.getMonth() ? 'bg-blue-100' : ''}`}
                        >
                            {(index+1) > 0 ? new Date(year, month, (date.getDate()-(date.getDay()-(index+1)))).getDate() : ''}
                            {   
                                findTask(date.getDate()-(date.getDay()-(index+1))).map((task, index) => {
                                    return <div 
                                            key={index} 
                                            className='bg-red-100 px-1 rounded text-sm mb-1 flex justify-between align-middle content-center'
                                            onClick={ (e) => {
                                                e.stopPropagation()
                                                setMenuContext(false)
                                            }}
                                        >
                                        <div>
                                            <span className="mr-2 font-semibold">{ task.name }</span>
                                            <span className="text-xs">{ new Date(task.date).getHours() }:{ new Date(task.date).getMinutes() }</span>
                                        </div>
                                        <span onClick={ (e) => {
                                            e.stopPropagation()
                                            setMenuContext(false)
                                            deleteTask(task._id)
                                        }}>
                                            <i className="icofont-close-line"></i>
                                        </span>
                                    </div>
                                })
                                
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}
