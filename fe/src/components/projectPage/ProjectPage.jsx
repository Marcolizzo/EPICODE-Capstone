import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { FaUserPlus, FaBars, FaPlus, FaFloppyDisk, FaXmark } from 'react-icons/fa6'
import { CloseCircleOutline } from 'react-ionicons'
import { jwtDecode } from 'jwt-decode'
import styles from './ProjectPage.module.scss'

import { getLists, createList } from '../../redux/reducers/listsReducer'
import { getProjectById } from '../../redux/reducers/projectsReducer'
import { setToggled } from '../../redux/reducers/navPanelReducer'
import ListCard from '../listCard/ListCard'
import InvitatationModal from '../invitationModal/InvitationModal'

const ProjectPage = ({ projectId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const toggled = useSelector((state) => state.navPanel.toggled)
    const project = useSelector((state) => state.getProjectById.project)
    const userId = jwtDecode(useSelector((state) => state.login.token)).userId
    const lists = project ? project.lists : []

    const [isCreatingList, setIsCreatingList] = useState(false)
    const [newListTitle, setnewListTitle] = useState('')
    const [isInvitationModalOpen, setInvitationModalOpen] = useState(false)

    const toggleCreateList = () => {
        setnewListTitle('')
        setIsCreatingList(!isCreatingList)
    }

    const onChangeInput = (e) => {
        setnewListTitle(e.target.value)
    }

    const handleCreateList = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createList([projectId, newListTitle])))
        setnewListTitle('')
        toggleCreateList()
    }

    const handleOpenInvitationModal = () => {
        setInvitationModalOpen(true)
    }

    const handleCloseInvitationModal = () => {
        setInvitationModalOpen(false)
    }

    useEffect(() => {
        doDispatch(getLists(projectId))
        doDispatch(getProjectById(projectId))
    }, [dispatch, isCreatingList, projectId])

    return (
        <>
            <div className="w-100">
                <div className={styles.header}>
                    <div className={styles.title}>
                        <Button variant="secondary" className={styles.btn_toggler}>
                            <FaBars onClick={() => doDispatch(setToggled(!toggled))} />
                        </Button>
                        {project.title}
                    </div>
                    {project.createdBy && userId === project.createdBy._id && (
                        <div className={styles.btn_invite} onClick={handleOpenInvitationModal}>
                            <FaUserPlus />
                            Invite new member
                        </div>
                    )}
                </div>
                <div className={styles.body}>
                    {isCreatingList ? (
                        <Form onSubmit={handleCreateList} className={styles.card}>
                            <Form.Control
                                type="text"
                                autoFocus
                                onChange={onChangeInput}
                                // onBlur={toggleCreateList}
                                placeholder="Insert title..."
                                value={newListTitle}
                            />

                            <div className={styles.btn_save} onClick={handleCreateList}>
                                <FaFloppyDisk />
                            </div>
                            <div className={styles.btn_discard} onClick={toggleCreateList}>
                                <FaXmark />
                            </div>
                        </Form>
                    ) : (
                        <div className={styles.btn_create} onClick={toggleCreateList}>
                            <FaPlus className={styles.fa_plus} />
                            Add new List
                        </div>
                    )}

                {lists && (
                    <div className={styles.lists}>
                        {lists.map((list) => (
                            <ListCard key={list._id} listObject={list} projectId={projectId} />
                        ))}
                    </div>
                )}
                </div>
            </div>

            {project && (
                <InvitatationModal
                    isOpen={isInvitationModalOpen}
                    onClose={handleCloseInvitationModal}
                    project={project}
                />
            )}
        </>
    )
}

export default ProjectPage
