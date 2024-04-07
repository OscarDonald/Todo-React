
import { useContext } from 'react';
import Column from './Column';
import { StateContext } from './Context/StateContext';
import EditModal from './EditModal';

import { Routes, Route } from 'react-router-dom'



const MainContent = () => {

    // Skapar usestate för mina tasks
    const { tasks } = useContext(StateContext)

    const todoTasks = tasks.filter(task => task.columnId === "Todo")
    const inProgressTasks = tasks.filter(task => task.columnId === "In Progress")
    const doneTasks = tasks.filter(task => task.columnId === "Done")

    return (
        <div className='main__content'>
            <Routes>
                <Route path='/*' element={
                    <div className='main__content'>
                    <Column columnTasks={todoTasks} title="Todo" customKey="todo" />
                    <Column columnTasks={inProgressTasks} title="In Progress" customKey="inprogress" />
                    <Column columnTasks={doneTasks} title="Done" customKey="done"/>
                </div>
                } >

                </Route>
                <Route path='/column/todo' element={<Column columnTasks={todoTasks} title="Todo" customKey="todo"  />} />
                <Route path='/column/inprogress' element={<Column columnTasks={inProgressTasks} title="In Progress" customKey="inprogress"  />} />
                <Route path='/column/done' element={<Column columnTasks={doneTasks} title="Done" customKey="done"  />} />
            </Routes>
            <EditModal />

        </div>


    )
}

export default MainContent