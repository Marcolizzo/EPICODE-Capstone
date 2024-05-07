import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form, ListGroup } from 'react-bootstrap'
import { FaTrashCan, FaPlus, FaTableList, FaXmark } from 'react-icons/fa6'
import styles from './ListCard.module.scss'
import TaskElement from '../taskElement/TaskElement'

import { updateList, deleteList, getListById } from '../../redux/reducers/listsReducer'
import { createTask } from '../../redux/reducers/tasksReducer'
import { getProjectById } from '../../redux/reducers/projectsReducer'

const ListCard = ({ listObject, projectId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()

    const error = useSelector((state) => state.deleteList.error)
    const list = listObject
    const tasks = list ? list.tasks : []

    const [isEditingList, setIsEditingList] = useState(false)
    const [listTitle, setListTitle] = useState(list.title)
    const [isCreatingTask, setIsCreatingTask] = useState(false)
    const [TaskTitle, setTaskTitle] = useState('')

    const handleEditList = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(updateList([list._id, listTitle])))
        toggleEditList()
    }

    const toggleEditList = () => {
        setIsEditingList(!isEditingList)
    }

    const handleDeleteList = async () => {
        const doDeleteList = await doDispatch(deleteList([projectId, list._id]))
        
        if(doDeleteList.error) {
            const error = doDeleteList.payload.message
            toast.error(error)
        } else {
            doDispatch(getProjectById(projectId))
            toast.success(`"${list.title}" successfully deleted!`)
        }
    }

    const onChangeListInput = (e) => {
        setListTitle(e.target.value)
    }

    // CREATE NEW TASKS

    const toggleCreateTask = () => {
        setTaskTitle('')
        setIsCreatingTask(!isCreatingTask)
    }

    const onChangeTaskInput = (e) => {
        setTaskTitle(e.target.value)
    }

    const onCreateTask = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createTask([list._id, TaskTitle])))
        setTaskTitle('')
        toggleCreateTask()
    }

    //

    useEffect(() => {
        doDispatch(getProjectById(projectId))
        doDispatch(getListById(list._id))
    }, [dispatch])

    return (
        <>
            <div className={styles.card}>
                <div className={styles.header}>
                    {isEditingList ? (
                        <Form className={styles.form_title} onSubmit={handleEditList}>
                            <Form.Control
                                type="text"
                                autoFocus
                                onBlur={handleEditList}
                                onChange={onChangeListInput}
                                value={listTitle}
                            />
                        </Form>
                    ) : (
                        <div className={styles.title} onClick={toggleEditList}>
                            {listTitle}
                        </div>
                    )}
                    <div className={styles.btn_delete_list} onClick={handleDeleteList}>
                        <FaTrashCan />
                    </div>
                </div>

                <div>
                    {isCreatingTask ? (
                        <div className="mt-2">
                            <Form onSubmit={onCreateTask}>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    onChange={onChangeTaskInput}
                                    placeholder={'Insert title...'}
                                    // onBlur={toggleCreateTask}
                                />
                            </Form>

                            <div className={styles.btn_container}>
                                <div className={styles.btn_save} onClick={onCreateTask}>
                                    <FaTableList />
                                </div>
                                <div className={styles.btn_discard} onClick={toggleCreateTask}>
                                    <FaXmark />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.btn_addTask} onClick={toggleCreateTask}>
                            <FaPlus />
                        </div>
                    )}
                </div>
                {tasks && tasks.length > 0 ? (
                    <ListGroup>
                        {tasks.map((task) => (
                            <TaskElement key={task._id} projectId={projectId} listObject={list} task={task} />
                        ))}
                    </ListGroup>
                ) : (
                    <div className={styles.noTasks}>No tasks...</div>
                )}
            </div>
        </>
    )
}

export default ListCard
