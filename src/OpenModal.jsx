import React, { useContext } from 'react'
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal"
import { useState } from 'react';
import { format } from "date-fns";
import { StateContext } from './Context/StateContext';

const OpenModal = () => {

    const {tasks, setTasks} = useContext(StateContext)
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    Modal.setAppElement('#root');
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false);
    }

    const createNewTask = (e) => {
        e.preventDefault();
        // Skapar Id för tasksen och för kolumnerna
        const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1
        const datetime = format(new Date(), "MMMM dd, yyyy - HH:m");
        

        const newTask = {
            id,
            columnId: "Todo",
            title: postTitle,
            body: postBody,
            datetime
        };
        setPostTitle("")
        setPostBody("");
        setTasks([...tasks, newTask]);
        closeModal();

        
    };

    return (
        <div className='createTask'>
            <button className='taskButton' onClick={openModal}> <FaPlus />Skapa ny uppgift</button>
            <Modal
                className="taskModal"
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Test Modal"
            >
                <div className='taskModal-content'>
                    <form onSubmit={createNewTask} className='taskModal-content-form'>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            style={{ height: "30px" }}
                            type="text"
                            id='postTitle'
                            placeholder='Task name'
                            required
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />

                        <label htmlFor="postBody">Content:</label>
                        <textarea
                            className='taskModal-textarea'
                            type="text"
                            id='postBody'
                            required
                            placeholder='Innehåll'
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                        />

                        <div className='taskModal-button'>
                            <button style={{ backgroundColor: "lightblue" }} >Spara</button>
                        </div>
                    </form>
                </div>




            </Modal>
        </div>
    )
}

export default OpenModal