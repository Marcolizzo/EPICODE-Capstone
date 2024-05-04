import { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FaXmark, FaPaperPlane, FaCheck, FaBan } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import styles from './InvitationModal.module.scss'

import { createInvitation, deleteInvitation, updateInvitation } from '../../redux/reducers/invitationsReducer'
import { getUserById } from '../../redux/reducers/usersReducer'
import { getProjects } from '../../redux/reducers/projectsReducer'

const InvitatationModal = ({ isOpen, onClose, project, invitation }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()

    const [formData, setFormData] = useState({})
    const error = useSelector((state) => state.createInvitation.error)

    const handleSendInvitation = async (e) => {
        e.preventDefault()
        setDispatch(await doDispatch(createInvitation([project._id, formData])))
        if (!error) {
            setFormData({})
            onClose()
        }
    }

    const closeModal = () => {
        setFormData({})
        onClose()
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleDeleteInvitation = async () => {
        await doDispatch(deleteInvitation(invitation._id))
        doDispatch(getUserById([invitation.recipient._id]))
        onClose()
    }

    const handleAcceptInvitation = async () => {
        await doDispatch(updateInvitation([invitation._id, invitation.project._id, true, true]))
        doDispatch(getUserById([invitation.recipient._id]))
        doDispatch(getProjects(invitation.recipient._id))
        onClose()
    }

    return (
        <>
            {!invitation ? (
                <Modal show={isOpen} onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Send invitation for {`"${project.title}"`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSendInvitation}>
                            <Form.Group className="mb-3">
                                <Form.Label>Send invitation to:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    autoFocus
                                    onChange={onChangeInput}
                                    name="recipientEmail"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    rows={3}
                                    as="textarea"
                                    placeholder="Insert your message..."
                                    onChange={onChangeInput}
                                    name="message"
                                />
                            </Form.Group>

                            <div className={styles.footer}>
                                <div className={styles.btn_save}>
                                    <FaPaperPlane onClick={handleSendInvitation} />
                                </div>
                                <div className={styles.btn_discard}>
                                    <FaXmark onClick={closeModal} />
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            ) : (
                <Modal show={isOpen} onHide={onClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Invitation from {`${invitation.sender.username}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="mb-4">
                                You have been invited by{' '}
                                <span>{invitation.sender.firstName + ' ' + invitation.sender.lastName}</span> to join
                                the project <span>"{invitation.project.title}"</span>.
                            </div>
                            <div>
                                The following message has been included:
                                <div className={styles.message}>{invitation.message}</div>
                            </div>
                            <div>Would you like to accept the invitation and become a member of the project?</div>
                        </div>

                        <div className="mt-3 d-flex gap-2">
                            <Button className={styles.btn_accept} onClick={handleAcceptInvitation}>
                                <FaCheck />
                                Accept
                            </Button>
                            <Button className={styles.btn_decline} variant="danger" onClick={handleDeleteInvitation}>
                                <FaBan />
                                Decline
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default InvitatationModal
