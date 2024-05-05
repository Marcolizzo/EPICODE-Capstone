import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { Button, Image, Form } from 'react-bootstrap'
import styles from './CommentsSection.module.scss'
import { FaFloppyDisk, FaXmark, FaComment, FaComments } from 'react-icons/fa6'
import CommentElement from '../commentElement/CommentElement'

import { getUserById } from '../../redux/reducers/usersReducer'
import { createComment, getComments } from '../../redux/reducers/commentsReducer'
import { getTaskById } from '../../redux/reducers/tasksReducer'

const CommentsSection = ({ taskObject }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const comments = useSelector((state) => state.getComments.comments)
    const userId = jwtDecode(useSelector((state) => state.login.token)).userId
    const user = useSelector((state) => state.getUserById.user)

    const [isCreateComment, setIsCreateComment] = useState(false)
    const [newComment, setNewComment] = useState('')

    const toggleCreateComment = () => {
        setIsCreateComment(!isCreateComment)
    }

    const onChangeCreateCommentInput = (e) => {
        setNewComment(e.target.value)
    }

    const handleCreateComment = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createComment([taskObject._id, newComment])))
        setNewComment('')
        toggleCreateComment()
    }

    useEffect(() => {
        doDispatch(getTaskById(taskObject._id))
        doDispatch(getComments(taskObject._id))
    }, [dispatch])

    useEffect(() => {
        doDispatch(getUserById(userId))
    }, [doDispatch])

    return (
        <>
            <div className={styles.title}>
                <FaComments className={styles.commentsIcon} />
                Comments
            </div>
            <div className={styles.body}>
                <Image src={user.profileImg} roundedCircle className={styles.image} />
                {isCreateComment ? (
                    <div className="w-100">
                        <Form onSubmit={handleCreateComment}>
                            <Form.Control
                                type="text"
                                autoFocus
                                placeholder="Write a comment..."
                                onChange={onChangeCreateCommentInput}
                            />
                        </Form>
                        <div className={styles.btn_container}>
                            <div className={styles.btn_save} onClick={handleCreateComment}>
                                <FaComment />
                            </div>
                            <div className={styles.btn_discard} onClick={toggleCreateComment}>
                                <FaXmark />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.btn_createComment} onClick={toggleCreateComment}>
                        Write a comment...
                    </div>
                )}
            </div>

            {comments && (
                <div className="mt-3">
                    {comments.map((comment) => (
                        <CommentElement key={comment._id} comment={comment} taskObject={taskObject} loggedUser={user} loggedUserId={userId}/>
                    ))}
                </div>
            )}
        </>
    )
}

export default CommentsSection
