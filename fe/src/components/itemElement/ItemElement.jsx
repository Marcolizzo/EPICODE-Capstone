import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import styles from './ItemElement.module.scss'
import { FaRegSquare, FaSquareCheck, FaTrashCan } from 'react-icons/fa6'
import { deleteItem, updateItem } from '../../redux/reducers/itemsReducer'
import { getTaskById } from '../../redux/reducers/tasksReducer'

const ItemElement = ({ itemObject, checklistId, taskId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const item = itemObject

    const [isTaskCompleted, setIsTaskCompleted] = useState(item.completed)
    const [isEditingItemTitle, setIsEditingItemTitle] = useState(false)
    const [itemTitle, setItemTitle] = useState(item.title)

    const toggleCompleteTask = async (e) => {
        e.stopPropagation()
        const isCompleted = !isTaskCompleted
        setIsTaskCompleted(!isTaskCompleted)
        setDispatch(await doDispatch(updateItem([item._id, { completed: isCompleted }])))
        doDispatch(getTaskById(taskId))
    }

    const toggleEditItemTitle = () => {
        setIsEditingItemTitle(!isEditingItemTitle)
    }

    const onChangeItemTitle = (e) => {
        setItemTitle(e.target.value)
    }

    const handleEditItemTitle = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(updateItem([item._id, { title: itemTitle }])))
        doDispatch(getTaskById(taskId))
        toggleEditItemTitle()
    }

    const handleDeleteItem = async (e) => {
        e.stopPropagation()
        setDispatch(await doDispatch(deleteItem([checklistId, item._id])))
        doDispatch(getTaskById(taskId))
    }

    return (
        <div className={styles.item_container} onClick={toggleEditItemTitle}>
            <div className={styles.item_title}>
                {isTaskCompleted ? (
                    <FaSquareCheck className={styles.checkIcon} onClick={toggleCompleteTask} />
                ) : (
                    <FaRegSquare className={styles.sqaureIcon} onClick={toggleCompleteTask} />
                )}

                {isEditingItemTitle ? (
                    <Form onSubmit={handleEditItemTitle}>
                        <Form.Control
                            type="text"
                            autoFocus
                            onBlur={handleEditItemTitle}
                            placeholder="Add item..."
                            onChange={onChangeItemTitle}
                            value={itemTitle}
                        />
                    </Form>
                ) : (
                    <div className={isTaskCompleted ? styles.itemCompleted : ''}>{item.title}</div>
                )}
            </div>
            <div className={styles.btn_deleteItem} onClick={handleDeleteItem}>
                <FaTrashCan />
            </div>
        </div>
    )
}

export default ItemElement
