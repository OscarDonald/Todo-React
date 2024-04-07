import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
import { StateContext } from './Context/StateContext';
import { format } from "date-fns";

const EditTaskModal = ({ openEditModal, editIsOpen, setEditIsOpen }) => {
    const { tasks, setTasks, clickedTaskId } = useContext(StateContext);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");


    useEffect(() => {
        const clickedTask = tasks.find((task) => task.id === clickedTaskId);
        setEditTitle(clickedTask?.title || "");
        setEditBody(clickedTask?.description || "");
    }, [clickedTaskId, tasks])

    function closeEditModal() {
        setEditIsOpen(false);
    }

    const handleEdit = () => {
        const datetime = format(new Date(), "MMMM dd, yyyy - HH:m");
        const updatedTasks = tasks.map((task) => {
            if (task.id === clickedTaskId) {
                return {
                    ...task,
                    title: editTitle,
                    description: editBody,
                    datetime: datetime
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        closeEditModal();

    }
    return (
        <div>
            <Modal

                overlayClassName="modal__overlay"
                className="taskModal"
                openEditModal={openEditModal}
                isOpen={editIsOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Modal"
            >
                <div style={{ boxShadow: "none" }} className='editTaskModal__content'>
                    <div className='editTaskModal__content__form'>
                        <h2>Redigera uppgift</h2>
                        <input
                            className='taskModal__input'
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            className='taskModal__textarea'
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                    </div>
                    <div className='editTaskModal__button'>
                        <button
                            style={{ backgroundColor: "#a8dadc" }}
                            onClick={handleEdit}
                        >Spara</button>
                        <button
                            style={{ backgroundColor: "#f08080" }}
                            onClick={closeEditModal}

                        >Avbryt</button>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditTaskModal