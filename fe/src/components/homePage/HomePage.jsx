import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { Button } from 'react-bootstrap'
import { FaPlus, FaBars } from 'react-icons/fa'

import styles from './HomePage.module.scss'

import { setToggled } from '../../redux/reducers/navPanelReducer'
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
    const toggled = useSelector((state) => state.navPanel.toggled)
    const broken = useSelector((state) => state.navPanel.broken)

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
        if (userId) {
            doDispatch(getUserById(userId))
        }
    }, [dispatch, userId])

    return (
        <>
            <div className='w-100'>
                <div className={styles.header}>
                    <Button variant="secondary" className={styles.btn_toggler}>
                        <FaBars onClick={() => doDispatch(setToggled(!toggled))} />
                    </Button>
                    Home
                </div>

                <div className={styles.welcome}>
                    <div>👋 Hi {firstName}!</div>
                </div>

                <div className={styles.body}>
                    <Button variant="secondary" onClick={handleOpenProjectModal} className={styles.btn_create}>
                        <FaPlus className={styles.fa_plus} />
                        Create Project
                    </Button>
                    {projects && (
                        <div className={styles.projectContainer}>
                            {projects.map((project) => (
                                <ProjectCard key={project._id} projectObject={project} userId={userId} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ProjectModal isOpen={isProjectModalOpen} onClose={handleCloseProjectMOdal} isEditing={false} />
        </>
    )
}

export default HomePage
