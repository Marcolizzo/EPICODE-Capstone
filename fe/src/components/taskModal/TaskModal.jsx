import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Dropdown, DropdownButton, Image } from 'react-bootstrap'
import { FaFloppyDisk, FaXmark, FaPlus } from 'react-icons/fa6'
import styles from './TaskModal.module.scss'
import ChecklistElement from '../checklistElement/ChecklistElement'
import CommentsSection from '../commentsSection/CommentsSection'

import { getProjectById } from '../../redux/reducers/projectsReducer'
import { getTaskById, updateTask } from '../../redux/reducers/tasksReducer'
import { createChecklist } from '../../redux/reducers/checklistsReducer'

const TaskModal = ({ isOpen, onClose, taskObject, listObject, projectId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const task = useSelector((state) => state.getTaskById.task)
    const project = useSelector((state) => state.getProjectById.project)

    const [isEditingDescription, setEditingDescription] = useState(false)
    const [taskDescription, setTaskDescription] = useState(taskObject.description)

    const [taskPriority, setTaskPriority] = useState(taskObject.priority)
    const variantPriority =
        taskPriority === 'low'
            ? 'primary'
            : taskPriority === 'medium'
            ? 'warning'
            : taskPriority === 'high'
            ? 'danger'
            : 'info'

    const [isCreatingChecklist, setIsCreatingChecklist] = useState(false)
    const [checklistTitle, setChecklistTitle] = useState('')

    const getFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }

    const handleSetPriority = async (e) => {
        const newPriority = e.target.name
        setTaskPriority(newPriority)
        setDispatch(await doDispatch(updateTask([taskObject._id, { priority: newPriority }])))
    }

    const toggleEditDescription = (e) => {
        e && setTaskDescription(taskObject.description)
        setEditingDescription(!isEditingDescription)
    }

    const handleEditDescription = async (e) => {
        setDispatch(await doDispatch(updateTask([taskObject._id, { description: taskDescription }])))
        toggleEditDescription()
    }

    const onChangeTaskDescription = (e) => {
        setTaskDescription(e.target.value)
    }

    const handleAssignTask = async (e) => {
        const userId = e.target.id
        setDispatch(await doDispatch(updateTask([taskObject._id, { assignedTo: userId }])))
    }

    const toggleCreateChecklist = () => {
        setIsCreatingChecklist(!isCreatingChecklist)
    }

    const onChangeChecklistInput = (e) => {
        setChecklistTitle(e.target.value)
    }
    const handleCreateChecklist = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createChecklist([taskObject._id, checklistTitle])))
        setChecklistTitle('')
        toggleCreateChecklist()
    }

    useEffect(() => {
        doDispatch(getTaskById(taskObject._id))
        doDispatch(getProjectById(projectId))
    }, [dispatch, isOpen])

    return (
        <>
            <Modal show={isOpen} onHide={onClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{taskObject.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className={styles.info}>
                        <div>
                            <div>
                                in <span>{listObject.title}</span>{' '}
                            </div>
                        </div>
                        {task && task.createdBy && (
                            <div className={styles.creator}>
                                <Image src={task.createdBy.profileImg} roundedCircle className={styles.image} />
                                {getFullName(task.createdBy.firstName, task.createdBy.lastName)}
                            </div>
                        )}
                    </div>

                    <div className={styles.body}>
                        <div className={styles.dropdown}>
                            <div>Assigned to:</div>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={
                                    task && task.assignedTo
                                        ? getFullName(task.assignedTo.firstName, task.assignedTo.lastName)
                                        : 'Unassigned'
                                }
                            >
                                {project &&
                                    project.members.map((member) => (
                                        <Dropdown.Item key={member._id} id={member._id} onClick={handleAssignTask}>
                                            {getFullName(member.firstName, member.lastName)}
                                        </Dropdown.Item>
                                    ))}
                            </DropdownButton>
                        </div>

                        <div className={styles.dropdown}>
                            <div>Priority:</div>
                            <DropdownButton variant={variantPriority} id="dropdown-basic-button" title={taskPriority}>
                                <Dropdown.Item onClick={handleSetPriority} name="low">
                                    Low
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSetPriority} name="medium">
                                    Medium
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSetPriority} name="high">
                                    High
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>

                    <div className={styles.description_container}>
                        <div>Description</div>
                        <Form.Control
                            as={'textarea'}
                            placeholder="Insert description..."
                            onFocus={() => setEditingDescription(true)}
                            onChange={onChangeTaskDescription}
                            value={isEditingDescription ? taskDescription : taskObject.description}
                        />
                        {isEditingDescription && (
                            <div className={styles.btn_container}>
                                <div className={styles.btn_save} onClick={handleEditDescription}>
                                    <FaFloppyDisk />
                                </div>
                                <div className={styles.btn_discard} onClick={toggleEditDescription}>
                                    <FaXmark />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-2">
                        {isCreatingChecklist ? (
                            <div className="mt-2 d-flex gap-2">
                                <Form onSubmit={handleCreateChecklist}>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        placeholder="Insert title..."
                                        onChange={onChangeChecklistInput}
                                    />
                                </Form>
                                <div className={styles.btn_container}>
                                    <div className={styles.btn_save} onClick={handleCreateChecklist}>
                                        <FaFloppyDisk />
                                    </div>
                                    <div className={styles.btn_discard} onClick={toggleCreateChecklist}>
                                        <FaXmark />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.btn_addChecklist} onClick={toggleCreateChecklist}>
                                <FaPlus className={styles.fa_plus} />
                                Add Checklist
                            </div>
                        )}
                    </div>

                    <div>
                        {task &&
                            task.checklists &&
                            task.checklists.map((checklist) => (
                                <ChecklistElement key={checklist._id} taskObject={task} checklistObject={checklist} />
                            ))}
                    </div>

                    <CommentsSection taskObject={taskObject} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TaskModal
