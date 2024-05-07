import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Image } from 'react-bootstrap'
import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './ProjectCard.module.scss'

import { deleteProject, getProjects } from '../../redux/reducers/projectsReducer'
import ProjectModal from '../projectsModal/ProjectsModal'

const ProjectCard = ({ projectObject, userId }) => {
    const navigate = useNavigate()
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()

    const project = projectObject
    const creator = project.createdBy
    const deleteProjectErrors = useSelector((state) => state.deleteProject.error)
    const deleteProjectLoading = useSelector((state) => state.deleteProject.isLoading)

    const [isProjectModalOpen, setProjectModalOpen] = useState(false)

    const getFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }

    const onDelete = async (e) => {
        e.stopPropagation()
        const confirmDelete = window.confirm('Are you sure?')

        if (confirmDelete) {
            setDispatch(await doDispatch(deleteProject(project._id)))

            if (!deleteProjectErrors && !deleteProjectLoading) {
                toast.success('Project succesfull deleted!')
            }
        }
    }

    const openProjectPage = () => {
        navigate(`/projects/${project._id}`)
    }

    const handleOpenProjectModal = (e) => {
        e.stopPropagation()
        setProjectModalOpen(true)
    }

    const handleCloseProjectMOdal = () => {
        setProjectModalOpen(false)
    }

    useEffect(() => {
        doDispatch(getProjects())
    }, [dispatch])

    return (
        <>
            <div className={styles.card} onClick={openProjectPage}>
                <div>
                    <div className={styles.header}>
                        <div className="card-title">{project.title}</div>
                        {creator._id === userId && (
                            <div className={styles.btn_edit} onClick={handleOpenProjectModal}>
                                <FaPenToSquare />
                            </div>
                        )}
                    </div>
                </div>
                {project.description ? (
                    <div className={styles.description}>{project.description}</div>
                ) : (
                    <span className={styles.noDescription}>No description...</span>
                )}

                <div className={styles.footer}>
                    <div className={styles.creator}>
                        <Image src={creator && creator.profileImg} roundedCircle className={styles.image} />
                        {creator ? getFullName(creator.firstName, creator.lastName) : 'Unknown'}
                    </div>
                    <div className={styles.btn_discard}>
                        <FaTrashCan onClick={onDelete} />
                    </div>
                </div>
            </div>
            {project && (
                <ProjectModal
                    isOpen={isProjectModalOpen}
                    onClose={handleCloseProjectMOdal}
                    isEditing={true}
                    projectObject={project}
                />
            )}
        </>
    )
}

export default ProjectCard
