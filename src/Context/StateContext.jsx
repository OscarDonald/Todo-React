
import { createContext } from 'react'
export const StateContext = createContext()
import { defaultTasks } from '../tasks';
import { useState } from 'react';

const StateProvider = ({ children }) => {
    const [tasks, setTasks] = useState(defaultTasks);
    const [isOpen, setIsOpen] = useState(false)
    const [clickedTaskId, setClickedTaskId] = useState(null)


    return (
        <StateContext.Provider value={{
            tasks, setTasks,
            isOpen, setIsOpen,
            clickedTaskId, setClickedTaskId
        }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider