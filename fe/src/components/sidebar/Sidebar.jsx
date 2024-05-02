import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Button, ListGroup, Image } from 'react-bootstrap'
import { FaPowerOff } from 'react-icons/fa'
import { HiOutlineHome, HiOutlineFolder } from 'react-icons/hi'
import {IoMailUnreadOutline} from 'react-icons/io5'
import styles from './Sidebar.module.scss'
import UserModal from '../userModal/UserModal'
import InvitatationModal from '../invitationModal/InvitationModal'

import { getProjects } from '../../redux/reducers/projectsReducer'
import { getUserById } from '../../redux/reducers/usersReducer'
import { logout } from '../../redux/reducers/loginReducer'

const NavPanel = () => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const navigate = useNavigate()

    const projects = useSelector((state) => state.getProjects.projects)
    const isProjectsLoading = useSelector((state) => state.getProjects.isLoading)
    const userId = jwtDecode(useSelector((state) => state.login.token)).userId
    const user = useSelector((state) => state.getUserById.user)
    
    const invitations = user ? user.invitations : []
    const [modalInvitation, setModalInvitation] = useState()

    const [isUserModalOpen, setUserModalOpen] = useState(false)
    const [isInvitationModalOpen, setInvitationModalOpen] = useState(false)

    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);

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
        navigate('/')
    }

    const handleNavigateToProject = (projectId) => {
        navigate(`../projects/${projectId}`, { replace: true })
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
                collapsed={collapsed}
                toggled={toggled}
                backgroundColor="rgb(0, 0, 0, 0)"
                className={styles.sidebar}
                width='300px'
                breakPoint='lg'
                onBreakPoint={setBroken}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div>Header</div>
                    <div style={{ flex: 1, marginBottom: '32px' }}>
                        <Menu>
                            <Button className={styles.btn_items} onClick={() => navigate('/home')}>
                                <HiOutlineHome />
                                Home
                            </Button>
                        </Menu>
                        <Menu>
                            <Button className={styles.btn_items} onClick={handleOpenUserModal}>
                                <Image src={user ? user.profileImg : ''} roundedCircle style={{ maxHeight: '20px' }} />
                                {user ? getFullName(user.firstName, user.lastName) : 'Your Profile'}
                            </Button>
                        </Menu>
                        <div>
                            <div className={styles.listTitle}>Projects</div>
                            {projects ? (
                                <ListGroup >
                                    {projects.map((project) => (
                                        <ListGroup.Item
                                            key={project._id}
                                            onClick={() => handleNavigateToProject(project._id)}
                                            className={styles.listItem}
                                        >
                                            <HiOutlineFolder/>
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
                            {invitations > 0 ? (
                                <ListGroup>
                                    {invitations.map((invitation) => (
                                        <ListGroup.Item
                                            key={invitation._id}
                                            onClick={() => handleOpenInvitationModal(invitation)}
                                            className={styles.listItemInvitation}
                                        >
                                            <IoMailUnreadOutline/>
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

            {user ? <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} userObject={user} /> : null}

            {modalInvitation ? (
                <InvitatationModal
                    isOpen={isInvitationModalOpen}
                    onClose={handleCloseInvitationModal}
                    invitation={modalInvitation}
                />
            ) : null}
        </>
    )
}

export default NavPanel
