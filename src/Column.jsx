import React, { useContext } from 'react'
import { FaExpandAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import OpenModal from './OpenModal';
import { StateContext } from './Context/StateContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Column = ({ title, columnTasks, customKey }) => {
    const columnId = ["Todo", "In Progress", "Done"]
    const navigate = useNavigate();
    const { tasks, setTasks, setIsOpen, setClickedTaskId } = useContext(StateContext)

    const handleColumnChange = (id, title, direction) => {
        // Tar in title för att veta vilken column tasken ligger i från början
        // Tar in direction om den ska flyttas vänster eller höger, dvs -1 eller +1 i indexen i min array ["Todo", "In Progress", "Done"]
        const newIndex = columnId.indexOf(title) + direction
        const newColumnId = columnId[newIndex]

        // Tar in ID för att veta vilken task jag ska uppdatera med hjälp av task.id, den jag klickar på
        // Jämför ID med den task jag klickat på, mot ID av alla objekt i tasks arrayen (alla tasksen, t.ex "äta mat")
        const task = tasks.find((task) => task.id === id)
        if (task) {
            // Spreadar upp task, byter ut värdet av columnId till newColumnId
            // särar task vilket är ett OBJEKT i keyvalue-par, alltså 
            // columnId: newColumnId tex KEY till vänster om : och value till höger.
            const newTask = { ...task, columnId: newColumnId }
            // MAP gör en kopia, och allt jag skriver i MAP-funktionen är det jag vill göra med objekten i arrayen.
            // Går igenom hela tasks arrayen, 
            const updatedTasks = tasks.map((task) => {
                // Läser av vilket ID tasken har, sedan vilket ID newTask har, om det är samma returna newTask, annars Task.
                return task.id === newTask.id ? newTask : task
            })
            // Därefter byter ut gamla arrayen mot den nya med det uppdaterade columnId
            setTasks(updatedTasks);
        }
    }
    
    const handleColumnDisplay = () => {
        if (window.location.pathname === `/column/${customKey}`) {
            navigate("/")
        } else {
            navigate(`column/${customKey}`)
        }
    }

    const handleTaskModal = (id) => {
        setIsOpen(true)
        setClickedTaskId(id)
    }

    return (
        <div>
            <div className='card__column'>
                <h2>{title} 
                <FaExpandAlt customkey={customKey} onClick={handleColumnDisplay}/>
                </h2>
                <div className='task-list'>
                    {columnTasks.map(task => (
                        <div  className='task' key={task.id}>
                            {(title === "Done" || title === "In Progress") && (<div className='task__arrow'>
                                <FaArrowLeft onClick={() => handleColumnChange(task.id, title, -1)} />
                            </div>)}
                            
                            <div onClick={() => handleTaskModal(task.id)} className='task__content'>
                                <div className='task__title'>
                                    <h2>{task.title}</h2>
                                </div>
                                <div className='task__date'>
                                    {task.date}
                                    {task.datetime}
                                </div>
                            </div>
                            {(title === "Todo" || title === "In Progress") && (<div className='task__arrow'>
                                <FaArrowRight onClick={() => handleColumnChange(task.id, title, 1)} />
                            </div>)}
                        </div>
                    ))}
                </div>

                {title === "Todo" && <OpenModal />}

            </div>
        </div>
    )
}

export default Column