import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, ProgressBar } from 'react-bootstrap'
import { FaListCheck, FaFloppyDisk, FaXmark, FaPlus, FaTrashCan } from 'react-icons/fa6'
import styles from './ChecklistElement.module.scss'
import ItemElement from '../itemElement/ItemElement'

import { deleteChecklist, updateChecklist } from '../../redux/reducers/checklistsReducer'
import { getTaskById } from '../../redux/reducers/tasksReducer'
import { createItem } from '../../redux/reducers/itemsReducer'

const ChecklistElement = ({ taskObject, checklistObject }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const checklist = checklistObject

    const [isEditingChecklistTitle, setIsEditingChecklistTitle] = useState(false)
    const [newChecklistTitle, setNewChecklistTitle] = useState(checklist.title)

    const [isCreatingItem, setIsCreatingItem] = useState(false)
    const [itemTitle, setItemTitle] = useState('')

    const [progress, setProgress] = useState(0)

    const toggleEditChecklistTitle = () => {
        setIsEditingChecklistTitle(!isEditingChecklistTitle)
    }

    const onChangeChecklistInput = (e) => {
        setNewChecklistTitle(e.target.value)
    }

    const handleEditChecklistTitle = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(updateChecklist([checklist._id, newChecklistTitle])))
        doDispatch(getTaskById(taskObject._id))
        toggleEditChecklistTitle()
    }

    const handleDeleteChecklist = async () => {
        setDispatch(await doDispatch(deleteChecklist([taskObject._id, checklist._id])))
        doDispatch(getTaskById(taskObject._id))
    }

    const toggleCreateItem = () => {
        setIsCreatingItem(!isCreatingItem)
    }

    const onChangeItemTitle = (e) => {
        setItemTitle(e.target.value)
    }

    const handleCreateItem = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createItem([checklist._id, itemTitle])))
        doDispatch(getTaskById(taskObject._id))
        setItemTitle('')
        toggleCreateItem()
    }

    useEffect(() => {
        if (checklist && checklist.items && checklist.items.length > 0) {
            const completedItems = checklist.items.filter((item) => item.completed).length
            const totalItems = checklist.items.length
            const percentage = Math.round((completedItems / totalItems) * 100)
            setProgress(percentage)
        } else {
            setProgress(0)
        }
    }, [checklist])

    return (
        <div className={styles.checklist_container}>
            <div>
                <div className={styles.checklist_header}>
                    <div className={styles.checklist_title}>
                        <span>
                            <FaListCheck />
                        </span>
                        {isEditingChecklistTitle ? (
                            <Form onSubmit={handleEditChecklistTitle}>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    onBlur={handleEditChecklistTitle}
                                    placeholder="Insert title..."
                                    onChange={onChangeChecklistInput}
                                    value={newChecklistTitle}
                                />
                            </Form>
                        ) : (
                            <div onClick={toggleEditChecklistTitle}>{checklist.title}</div>
                        )}
                    </div>
                    <div className={styles.btn_deleteChecklist} onClick={handleDeleteChecklist}>
                        <FaTrashCan className={styles.fa_plus} />
                    </div>
                </div>

                <div className="my-3">
                    <ProgressBar now={progress} label={`${progress}%`} className={styles.progressBar} />
                </div>

                <div>
                    <div className={styles.btn_addItem} onClick={toggleCreateItem}>
                        <FaPlus className={styles.fa_plus} />
                    </div>
                </div>
            </div>

            {isCreatingItem && (
                <div className="mt-2">
                    <Form onSubmit={handleCreateItem}>
                        <Form.Control type="text" autoFocus placeholder="Add item..." onChange={onChangeItemTitle} />
                    </Form>

                    <div className={styles.btn_container}>
                        <div className={styles.btn_save} onClick={handleCreateItem}>
                            <FaFloppyDisk />
                        </div>
                        <div className={styles.btn_discard} onClick={toggleCreateItem}>
                            <FaXmark />
                        </div>
                    </div>
                </div>
            )}

            {checklist &&
                checklist.items &&
                checklist.items.map((item) => (
                    <ItemElement
                        key={item._id}
                        itemObject={item}
                        checklistId={checklist._id}
                        taskId={taskObject._id}
                    ></ItemElement>
                ))}
        </div>
    )
}

export default ChecklistElement
