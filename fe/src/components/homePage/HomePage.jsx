import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import Emoji from 'react-emoji-render'
import { Add } from 'react-ionicons'
import styles from './HomePage.module.scss'
import { jwtDecode } from 'jwt-decode'

import { getProjects } from '../../redux/reducers/projectsReducer'
import { getUserById } from '../../redux/reducers/usersReducer'
import ProjectCard from '../projectCard/ProjectCard'
import ProjectModal from '../projectsModal/ProjectsModal'

const HomePage = () => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()

    const projects = useSelector((state) => state.getProjects.projects)
    const userId = jwtDecode(useSelector((state) => state.login.token)).userId
    const user = useSelector((state) => state.getUserById.user)

    const firstName = user ? user.firstName : ''
    const [isProjectModalOpen, setProjectModalOpen] = useState(false)

    const handleOpenProjectModal = () => {
        setProjectModalOpen(true)
    }

    const handleCloseProjectMOdal = () => {
        setProjectModalOpen(false)
    }

    useEffect(() => {
        doDispatch(getProjects())
        doDispatch(getUserById(userId))
    }, [dispatch, userId])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>Home</div>

                <div className={styles.welcome}>
                    <div>👋 Hi {firstName}!</div>
                </div>

                <div className={styles.body}>
                    <Button variant='secondary' onClick={handleOpenProjectModal} className={styles.btn_create}>
                        <Add color={'#b5e67b'} height="25px" width="25px" /> Create Project
                    </Button>
                    {projects
                        ? projects.map((project) => (
                              <ProjectCard key={project._id} projectObject={project} userId={userId} />
                          ))
                        : null}
                </div>
            </div>
            <ProjectModal isOpen={isProjectModalOpen} onClose={handleCloseProjectMOdal} isEditing={false} />
        </>
    )
}

export default HomePage
