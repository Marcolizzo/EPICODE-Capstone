import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Button, ListGroup, Image } from 'react-bootstrap'
import { FaPowerOff, FaCircleXmark } from 'react-icons/fa6'
import { HiOutlineHome, HiOutlineFolder } from 'react-icons/hi'
import { IoMailUnreadOutline } from 'react-icons/io5'
import styles from './NavPanel.module.scss'

import UserModal from '../userModal/UserModal'
import InvitatationModal from '../invitationModal/InvitationModal'
import { getProjects } from '../../redux/reducers/projectsReducer'
import { getUserById } from '../../redux/reducers/usersReducer'
import { logout } from '../../redux/reducers/loginReducer'
import { setToggled, setBroken } from '../../redux/reducers/navPanelReducer'

const NavPanel = () => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const navigate = useNavigate()

    const projects = useSelector((state) => state.getProjects.projects)
    const isProjectsLoading = useSelector((state) => state.getProjects.isLoading)
    const userId = jwtDecode(useSelector((state) => state.login.token)).userId
    const user = useSelector((state) => state.getUserById.user)
    const toggled = useSelector((state) => state.navPanel.toggled)
    const broken = useSelector((state) => state.navPanel.broken)

    const invitations = user ? user.invitations : []
    const [modalInvitation, setModalInvitation] = useState()

    const [isUserModalOpen, setUserModalOpen] = useState(false)
    const [isInvitationModalOpen, setInvitationModalOpen] = useState(false)

    const getFullName = (firstName, lastName) => {
        return firstName + ' ' + lastName
    }

    const handleOpenUserModal = () => {
        setUserModalOpen(true)
    }
    const handleCloseUserModal = () => {
        setUserModalOpen(false)
    }

    const handleLogout = () => {
        doDispatch(logout())
        navigate('/login')
    }

    const handleNavigateToHome = () => {
        navigate('/home')
        doDispatch(setToggled(!toggled))
    }

    const handleNavigateToProject = (projectId) => {
        navigate(`../projects/${projectId}`, { replace: true })
        doDispatch(setToggled(!toggled))
    }

    const handleOpenInvitationModal = async (invitation) => {
        await setModalInvitation(invitation)
        setInvitationModalOpen(true)
    }

    const handleCloseInvitationModal = () => {
        setInvitationModalOpen(false)
    }

    useEffect(() => {
        doDispatch(getUserById(userId))
        doDispatch(getProjects())
    }, [dispatch])

    return (
        <>
            <Sidebar
                backgroundColor="rgb(0, 0, 0, 0)"
                className={styles.sidebar}
                width="300px"
                breakPoint="lg"
                toggled={toggled}
                onBreakPoint={() => doDispatch(setBroken)}
                onBackdropClick={() => doDispatch(setToggled(false))}
            >
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <Image
                            src={process.env.REACT_APP_LOGO_URL}
                            className={styles.logo}
                            onClick={handleNavigateToHome}
                        />
                    </div>
                    <div style={{ flex: 1, marginBottom: '32px' }}>
                        <Menu>
                            <Button variant="secondary" className={styles.btn_items} onClick={handleNavigateToHome}>
                                <HiOutlineHome />
                                Home
                            </Button>
                        </Menu>
                        <Menu>
                            <Button variant="secondary" className={styles.btn_items} onClick={handleOpenUserModal}>
                                <Image src={user ? user.profileImg : ''} roundedCircle className={styles.image} />
                                {user ? getFullName(user.firstName, user.lastName) : 'Your Profile'}
                            </Button>
                        </Menu>
                        <div>
                            <div className={styles.listTitle}>Projects</div>
                            {projects ? (
                                <ListGroup>
                                    {projects.map((project) => (
                                        <ListGroup.Item
                                            key={project._id}
                                            onClick={() => handleNavigateToProject(project._id)}
                                            className={styles.listItem}
                                        >
                                            <HiOutlineFolder />
                                            {project.title}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <div className={styles.emptyList}>You have no projects... </div>
                            )}
                        </div>

                        <div>
                            <div className={styles.listTitle}>Invitations</div>
                            {invitations.length > 0 ? (
                                <ListGroup>
                                    {invitations.map((invitation) => (
                                        <ListGroup.Item
                                            key={invitation._id}
                                            onClick={() => handleOpenInvitationModal(invitation)}
                                            className={styles.listItemInvitation}
                                        >
                                            <IoMailUnreadOutline />
                                            New invitation from {invitation.sender.username}!
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <div className={styles.emptyList}>You have no invitation... </div>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        disabled={isProjectsLoading}
                        className={styles.btn_logout}
                        onClick={handleLogout}
                    >
                        <FaPowerOff className={styles.powerOff} />
                        Log out
                    </Button>
                </div>
            </Sidebar>

            {user && (
                <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} userObject={user} userId={userId} />
            )}

            {modalInvitation && (
                <InvitatationModal
                    isOpen={isInvitationModalOpen}
                    onClose={handleCloseInvitationModal}
                    invitation={modalInvitation}
                />
            )}
        </>
    )
}

export default NavPanel
