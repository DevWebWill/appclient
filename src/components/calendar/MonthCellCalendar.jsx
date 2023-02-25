
export const MonthCellCalendar = ({listTasks, DAYS_OF_THE_WEEK, days, startDay, year, month, today, selectedDate, setDate, setSelectedDate, menuContext, setMenuContext, setPoints, triggerCell, deleteTask, tamVentana}) => {

    function findTask(d) {
        if(listTasks.tasks !== undefined) {
            let tasks = listTasks.tasks.filter((task) => {
                let taskTemp = new Date(task.date)
                return  taskTemp.getDate() === d && taskTemp.getMonth() === month && taskTemp.getFullYear() === year
            })
            return tasks
        } else {
            return []
        }
        
    }

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
                Array(days[month] + (startDay - 1)).fill(null).map((_, index) => {
                    const d = index - (startDay - 2);
                    return (
                        <div
                            ref={triggerCell}
                            /*onContextMenu={(e) => {
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
                                setSelectedDate(new Date(year, month, d))
                                setDate(new Date(year, month, d))
                                //cconsole.log("Right Click", e.pageX, e.pageY, e);
                            }}*/
                            key={index}
                            onClick={ (e) => {
                                e.preventDefault();
                                setSelectedDate(new Date(year, month, d))
                                setDate(new Date(year, month, d))
                                setMenuContext(true)
                                
                                /* console.log(e.pageX, e.pageY)
                                console.log(e.screenX, e.screenY)
                                console.log(e.nativeEvent.layerX, e.nativeEvent.layerY)
                                console.log(window.screen.width, window.screen.height)
                                console.log(e) */
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
                            className={`cursor-pointer border-r border-b pl-1 pr-1 ${d === today.getDate() && month === today.getMonth() ? 'bg-slate-100' : ''} ${d === selectedDate.getDate() && month === selectedDate.getMonth() ? 'bg-blue-100' : ''}`}
                            style={{ minHeight: '110px' }}
                        >
                            {d > 0 ? d : ''}
                            {   

                                findTask(d).map((task, index2) => {
                                    return <div 
                                            key={index2} 
                                            className='bg-red-100 px-1 rounded text-sm mb-1 flex justify-between align-middle content-center'
                                            onClick={ (e) => {
                                                e.stopPropagation()
                                                setMenuContext(false)
                                            }}
                                        >
                                        <div>
                                            <span className="mr-2 font-semibold">{ task.name }</span>
                                            <span className="text-xs">
                                                { 
                                                    new Date(task.date).getHours() < 10 ? 0+new Date(task.date).getHours().toString() : new Date(task.date).getHours()
                                                }
                                                :
                                                { 
                                                    new Date(task.date).getMinutes() < 10 ? 0+new Date(task.date).getMinutes().toString() : new Date(task.date).getMinutes()
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <span onClick={ (e) => {
                                                e.stopPropagation()
                                                setMenuContext(false)
                                                deleteTask(task._id)
                                            }}>
                                                <i className="icofont-close-line"></i>
                                            </span>
                                        </div>
                                    </div>
                                })
                                
                            }
                        </div>
                    );        
                })
            }
        </div>
    )
}
