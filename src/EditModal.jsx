import React, { useContext, useEffect, useState } from 'react'
import Modal from "react-modal"
import { StateContext } from './Context/StateContext';
import EditTaskModal from './EditTaskModal';
import { FaTimes } from "react-icons/fa";




const EditModal = () => {
    Modal.setAppElement('#root');
    const { tasks, setTasks, isOpen, setIsOpen, clickedTaskId } = useContext(StateContext)
    const [taskData, setTaskData] = useState(null)
    const [editIsOpen, setEditIsOpen] = useState(false)

    useEffect(() => {

        setTaskData(tasks.find((task) => task.id === clickedTaskId))
    }, [clickedTaskId, tasks])

    function closeModal() {
        setIsOpen(false);
    }

    function openEditModal() {
        setEditIsOpen(true)
    }
    

    // Funktion för lite onördig styling
    function getColumnClassName(columnId) {
        switch (columnId) {
            case "Todo":
                return "taskData__todo";
            case "In Progress":
                return "taskData__inProgress";
            case "Done":
                return "taskData__done";
            default:
                return ""; // Återvänder en tom sträng om columnId inte matchar något av ovanstående
        }
    }
    const handleDelete = () => {
        // Filtrerar ut det värdet jag klickar på (clickedTaskId)
        const tasksList = tasks.filter((task) => task.id !== clickedTaskId);
        // console.log(clickedTaskId)
        // Skriver ut arrayen utan det filtrerade värdet
        setTasks(tasksList)
        closeModal();
    }


    return (
        <Modal
            className="taskModal"
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Test Modal"
        >
            {taskData && (
                <div className='taskData__content'>
                    <div className="taskData__cross"><FaTimes onClick={closeModal} /></div>
                    <h2 className={`${getColumnClassName(taskData.columnId)}`}>
                        {taskData.columnId} 
                    </h2>
                    
                    <div>
                        <h2>{taskData.title}</h2>
                    </div>
                    <div>
                        <p>
                            {taskData.datetime}
                        </p>
                    </div>
                    <div>
                        <p>
                            {taskData.description}
                        </p>
                    </div>
                    <div className='editModal__button'>
                        <button
                        style={{ backgroundColor: "#52b788" }}
                        onClick={openEditModal}
                        >Redigera</button>
                        <button
                        style={{ backgroundColor: "#f08080" }}
                        onClick={handleDelete}
                        >Ta bort</button>
                    </div>
                </div>
            )}
        <EditTaskModal openEditModal={openEditModal} editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} />
        </Modal>
        
    )
}

export default EditModal
