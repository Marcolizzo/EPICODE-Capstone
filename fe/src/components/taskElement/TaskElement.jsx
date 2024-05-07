import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { FaTrashCan, FaFloppyDisk, FaTableList, FaXmark, FaPenToSquare } from 'react-icons/fa6'
import styles from './TaskElement.module.scss'
import TaskModal from '../taskModal/TaskModal'

import { deleteTask, updateTask } from '../../redux/reducers/tasksReducer'
import { getProjectById } from '../../redux/reducers/projectsReducer'

const TaskElement = ({ projectId, listObject, task }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()

    const [isEditingTask, setIsEditingTask] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState(task.title)

    const [isTaskModalOpen, setTaskModalOpen] = useState(false)

    const handleOpenTaskModal = () => {
        setTaskModalOpen(true)
    }

    const handleCloseTaskModal = () => {
        setTaskModalOpen(false)
    }

    const toggleEditTask = (e) => {
        e.stopPropagation()
        setIsEditingTask(!isEditingTask)
    }

    const onChangeTaskInput = (e) => {
        setNewTaskTitle(e.target.value)
    }

    const onEditTask = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDispatch(await doDispatch(updateTask([task._id, { title: newTaskTitle }])))
        setIsEditingTask(!isEditingTask)
    }

    const handleDeleteTask = async (e) => {
        e.stopPropagation()
        const doDeleteTask = await doDispatch(deleteTask([listObject._id, task._id]))

        if(doDeleteTask.error) {
            const error = doDeleteTask.payload.message
            toast.error(error)
        } else {
            doDispatch(getProjectById(projectId))
            toast.success(`"${task.title}" successfully deleted!`)
        }
    }

    useEffect(() => {
        doDispatch(getProjectById(projectId))
    }, [dispatch])

    return (
        <>
            <ListGroup.Item key={task._id} onClick={handleOpenTaskModal} className={styles.listItem}>
                <div className={styles.item_body}>
                    {isEditingTask ? (
                        <Form onSubmit={onEditTask}>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={onChangeTaskInput}
                                onClick={(e) => e.stopPropagation()}
                                //   onBlur={toggleEditTask}
                                value={newTaskTitle}
                            />
                            <div className={styles.btn_container}>
                                <div className={styles.btn_save} onClick={onEditTask}>
                                    <FaFloppyDisk />
                                </div>
                                <div className={styles.btn_discard} onClick={toggleEditTask}>
                                    <FaXmark />
                                </div>
                            </div>
                            {/* <div>
                                <Button type="submit" variant="warning">
                                    Save
                                </Button>
                                <Button variant="danger" onClick={toggleEditTask}>
                                    <CloseCircleOutline />
                                </Button>
                            </div> */}
                        </Form>
                    ) : (
                        <div className={styles.title}>
                            <FaTableList className={styles.title_icon} />
                            {task.title}
                        </div>
                    )}
                    <div className={styles.item_icons}>
                        <FaPenToSquare className={styles.btn_edit} onClick={toggleEditTask} />
                        <FaTrashCan className={styles.btn_delete} onClick={handleDeleteTask} />
                    </div>
                </div>
            </ListGroup.Item>
            {task && (
                <TaskModal
                    isOpen={isTaskModalOpen}
                    onClose={handleCloseTaskModal}
                    taskObject={task}
                    listObject={listObject}
                    projectId={projectId}
                />
            )}
        </>
    )
}

export default TaskElement
