import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, Form } from 'react-bootstrap'
import { FaPenToSquare, FaXmark, FaTrashCan, FaComment } from 'react-icons/fa6'
import styles from './CommentElement.module.scss'

import { deleteComment, getComments, updateComment } from '../../redux/reducers/commentsReducer'
import { getTaskById } from '../../redux/reducers/tasksReducer'

const CommentElement = ({ comment, taskObject, loggedUser, loggedUserId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const ref = useRef()

    const [isAuthor, setIsAuthor] = useState(false)
    const [isEditingComment, setIsEditingComment] = useState(false)
    const [commentText, setCommentText] = useState(comment.text)

    const getFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }

    const checkCommentAuthorship = () => {
        if (loggedUserId === comment.author._id) {
            setIsAuthor(true)
        } else {
            setIsAuthor(false)
        }
    }

    const handleDeleteComment = async (commentId) => {
        setDispatch(await doDispatch(deleteComment([taskObject._id, commentId])))
    }

    const toggleEditComment = async (e) => {
        e && e.target && setCommentText(comment.text)
        setIsEditingComment(!isEditingComment)
    }

    const onChangeEditComment = (e) => {
        setCommentText(e.target.value)
    }

    const handleEditComment = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(updateComment([comment._id, commentText])))
        toggleEditComment()
    }

    useEffect(() => {
        if (isEditingComment && ref.current) {
            ref.current.focus()
        }
    }, [isEditingComment])

    useEffect(() => {
        doDispatch(getComments(taskObject._id))
    }, [dispatch])

    useEffect(() => {
        checkCommentAuthorship()
        doDispatch(getTaskById(taskObject._id))
    }, [doDispatch])

    return (
        <div className={styles.comment_container} key={comment._id}>
            <Image src={comment.author.profileImg} roundedCircle className={styles.image} />
            <div className="w-100">
                <div>{getFullName(comment.author.firstName, comment.author.lastName)}</div>

                {isEditingComment ? (
                    <Form onSubmit={handleEditComment}>
                        <Form.Control
                            type="text"
                            disabled={!isEditingComment}
                            ref={ref}
                            onChange={onChangeEditComment}
                            value={commentText}
                        />
                    </Form>
                ) : (
                    <div className={styles.comment}>{commentText}</div>
                )}

                {isAuthor &&
                    (isEditingComment ? (
                        <div className={styles.btn_container}>
                            <div className={styles.btn_save} onClick={handleEditComment}>
                                <FaComment />
                            </div>
                            <div className={styles.btn_discard} onClick={toggleEditComment}>
                                <FaXmark />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.btn_container}>
                            <div className={styles.btn_save} onClick={toggleEditComment}>
                                <FaPenToSquare />
                            </div>
                            <div className={styles.btn_discard} onClick={() => handleDeleteComment(comment._id)}>
                                <FaTrashCan />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default CommentElement
