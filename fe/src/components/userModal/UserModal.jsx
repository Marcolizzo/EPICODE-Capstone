import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal, Image, Form, Button } from 'react-bootstrap'
import styles from './UserModal.module.scss'
import { FaPenToSquare, FaTrashCan, FaRegFolderOpen, FaFloppyDisk, FaXmark, FaKey } from 'react-icons/fa6'

import {
    getUserById,
    updateUser,
    deleteUser,
    updateProfileImage,
    deleteProfileImage,
    updatePassword,
} from '../../redux/reducers/usersReducer'

import { getProjects } from '../../redux/reducers/projectsReducer'

const UserModal = ({ isOpen, onClose, userObject, userId }) => {
    const doDispatch = useDispatch()
    const [dispatch, setDispatch] = useState()
    const navigate = useNavigate()
    const user = userObject

    const updateImageStatus = useSelector((state) => state.updateProfileImage.status)
    const updateImageError = useSelector((state) => state.updateProfileImage.error)
    const deleteImageStatus = useSelector((state) => state.deleteProfileImage.status)
    const deleteImageError = useSelector((state) => state.deleteProfileImage.error)

    const updatePasswordState = useSelector((state) => state.updatePassword)

    const [formData, setFormData] = useState({
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        username: user ? user.username : '',
        email: user ? user.email : '',
    })

    const [passwordFormData, setPasswordFormData] = useState({})
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    const [newImg, setNewImg] = useState(null)
    const [previewImg, setPreviewImg] = useState(user && user.profileImg)
    const [isEditingImage, setIsEditingImage] = useState(false)

    const [isEditingForm, setIsEditingForm] = useState({
        firstName: false,
        lastName: false,
        username: false,
    })

    const toggleEditImage = () => {
        setPreviewImg(user && user.profileImg)
        setNewImg(null)
        setIsEditingImage(!isEditingImage)
    }

    const onChangeImage = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        setNewImg(e.target.files[0])
    }

    const handleUpdateImg = async () => {
        if (!newImg) return

        const fileData = new FormData()
        fileData.append('profileImage', newImg)
        const update = await doDispatch(updateProfileImage([userId, fileData]))
        setIsEditingImage(!isEditingImage)

        if (update.error) {
            const error = update.payload.message
            toast.error(error)
        } else {
            doDispatch(getUserById(userId))
            toast.success('Profile image succesfully updated!')
        }
    }

    const handleDeleteProfileImage = async () => {
        const deleteImg = await doDispatch(deleteProfileImage(userId))
        const user = await doDispatch(getUserById(userId))
        setPreviewImg(user && user.payload.profileImg)

        if (deleteImg.error) {
            const error = deleteImg.payload.message
            toast.error(error)
        } else {
            doDispatch(getUserById(userId))
            toast.success('Profile image succesfully removed!')
        }
    }

    const handleResetFormData = (field, toggleValue) => {
        setFormData({
            ...formData,
            [field]: user ? user[field] : '',
        })

        toggleEditForm(field, toggleValue)
    }

    const toggleEditForm = (field, toggleValue) => {
        setIsEditingForm({
            ...isEditingForm,
            [field]: toggleValue,
        })
    }

    const handleUpdateUserData = async (e) => {
        e.preventDefault()
        const update = await doDispatch(updateUser([userId, formData]))
        setIsEditingForm({ firstName: false, lastName: false, username: false })

        if (update.error) {
            if (update.payload.errors && update.payload.message) {
                const errors = update.payload.errors
                const error = update.payload.message

                errors.forEach((error) => {
                    toast.error(error.msg)
                })
                toast.error(error)
            } else if (update.payload.errors) {
                const errors = update.payload.errors
                errors.forEach((error) => {
                    toast.error(error.msg)
                })
            } else if (update.payload.message) {
                const error = update.payload.message
                toast.error(error)
            }

            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            })
        } else {
            toast.success('Your profile has been successfully updated!')
        }
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const toggleEditPassword = () => {
        setIsEditingPassword(!isEditingPassword)
    }

    const onChangeInputPassword = (e) => {
        const { name, value } = e.target
        setPasswordFormData({
            ...passwordFormData,
            [name]: value,
        })
    }

    const handleUpdatePassword = async () => {
        const update = await doDispatch(updatePassword([userId, passwordFormData]))
        console.log(update)

        if (update.error) {
            if (update.payload.errors && update.payload.message) {
                const errors = update.payload.errors
                const error = update.payload.message

                errors.forEach((error) => {
                    toast.error(error.msg)
                })
                toast.error(error)
            } else if (update.payload.errors) {
                const errors = update.payload.errors
                errors.forEach((error) => {
                    toast.error(error.msg)
                })
            } else if (update.payload.message) {
                const error = update.payload.message
                toast.error(error)
            }

            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            })
        } else {
            toast.success('Your profile has been successfully updated!')
        }

        setPasswordFormData({})
        toggleEditPassword()
    }

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm('Are you sure?')

        if (confirmDelete) {
            setDispatch(await doDispatch(deleteUser(userId)))
            navigate('/login')
        }
    }

    useEffect(() => {
        doDispatch(getUserById(userId))
        doDispatch(getProjects())
    }, [dispatch])

    return (
        <>
            <Modal show={isOpen} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100">Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className={styles.image_div}>
                            <Image src={previewImg} className={styles.image} />
                            <FaPenToSquare className={styles.btn_editImg} onClick={toggleEditImage} />
                            <FaTrashCan className={styles.btn_remove} onClick={handleDeleteProfileImage} />
                        </div>

                        {isEditingImage && (
                            <div className={styles.container}>
                                <label htmlFor="inputImg" className="d-flex">
                                    <input id="inputImg" type="file" onChange={onChangeImage} hidden />
                                    <div className={styles.input_icon}>
                                        <FaRegFolderOpen />
                                    </div>
                                    <input
                                        type="text"
                                        readOnly
                                        value={newImg ? newImg.name : 'Select a file...'}
                                        className={styles.input_fileName}
                                    />
                                </label>
                                <div className="d-flex gap-1">
                                    <div className={styles.btn_save}>
                                        <FaFloppyDisk onClick={handleUpdateImg} />
                                    </div>
                                    <div className={styles.btn_discard}>
                                        <FaXmark onClick={toggleEditImage} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Form onSubmit={handleUpdateUserData}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="m-0">Email address:</Form.Label>
                            <Form.Control
                                onChange={onChangeInput}
                                type="text"
                                disabled={true}
                                value={formData.email}
                                className={styles.form_control}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label className="m-0">First Name:</Form.Label>
                            <div className={styles.form_control}>
                                {isEditingForm.firstName ? (
                                    <div className="d-flex gap-1">
                                        <div className={styles.btn_save}>
                                            <FaFloppyDisk onClick={handleUpdateUserData} />
                                        </div>
                                        <div className={styles.btn_discard}>
                                            <FaXmark onClick={() => handleResetFormData('firstName', !isEditingForm)} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.btn_editForm}>
                                        <FaPenToSquare onClick={() => toggleEditForm('firstName', true)} />
                                    </div>
                                )}

                                <Form.Control
                                    onChange={onChangeInput}
                                    type="text"
                                    name="firstName"
                                    disabled={!isEditingForm.firstName}
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                            <Form.Label className="m-0">Last Name:</Form.Label>
                            <div className={styles.form_control}>
                                {isEditingForm.lastName ? (
                                    <div className="d-flex gap-1">
                                        <div className={styles.btn_save}>
                                            <FaFloppyDisk onClick={handleUpdateUserData} />
                                        </div>
                                        <div className={styles.btn_discard}>
                                            <FaXmark onClick={() => handleResetFormData('lastName', !isEditingForm)} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.btn_editForm}>
                                        <FaPenToSquare onClick={() => toggleEditForm('lastName', true)} />
                                    </div>
                                )}

                                <Form.Control
                                    onChange={onChangeInput}
                                    type="text"
                                    name="lastName"
                                    disabled={!isEditingForm.lastName}
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label className="m-0">Username:</Form.Label>
                            <div className={styles.form_control}>
                                {isEditingForm.username ? (
                                    <div className="d-flex gap-1">
                                        <div className={styles.btn_save}>
                                            <FaFloppyDisk onClick={handleUpdateUserData} />
                                        </div>
                                        <div className={styles.btn_discard}>
                                            <FaXmark onClick={() => handleResetFormData('username', !isEditingForm)} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.btn_editForm}>
                                        <FaPenToSquare onClick={() => toggleEditForm('username', true)} />
                                    </div>
                                )}

                                <Form.Control
                                    onChange={onChangeInput}
                                    type="text"
                                    name="username"
                                    disabled={!isEditingForm.username}
                                    placeholder="Enter Username"
                                    value={formData.username}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            {/* {updatePasswordState ? (
                                updatePasswordState.status === 'succeeded' ? (
                                    <div className="alert alert-success" role="alert">
                                        You've successfully changed your password!
                                    </div>
                                ) : (
                                    <div className="alert alert-success" role="alert">
                                        {updatePasswordState.error}
                                    </div>
                                )
                            ) : null} */}

                            {isEditingPassword ? (
                                <div>
                                    <Form.Group>
                                        <Form.Label className="m-0">Current password:</Form.Label>
                                        <Form.Control
                                            className={styles.form_control}
                                            type="password"
                                            name="currentPassword"
                                            placeholder="Insert your current password..."
                                            onChange={onChangeInputPassword}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="m-0">New password:</Form.Label>
                                        <Form.Control
                                            className={styles.form_control}
                                            type="password"
                                            name="newPassword"
                                            placeholder="Insert your new password..."
                                            onChange={onChangeInputPassword}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="m-0">Confirm new password:</Form.Label>
                                        <Form.Control
                                            className={styles.form_control}
                                            type="password"
                                            name="confirmNewPassword"
                                            placeholder="Confirm your new password..."
                                            onChange={onChangeInputPassword}
                                        />
                                    </Form.Group>

                                    <div className="d-flex gap-1">
                                        <div className={styles.btn_save}>
                                            <FaFloppyDisk onClick={handleUpdatePassword} />
                                        </div>
                                        <div className={styles.btn_discard}>
                                            <FaXmark onClick={toggleEditPassword} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className={styles.btn_changePass} onClick={toggleEditPassword}>
                                        <FaKey />
                                        Change Password
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                    <div className={styles.btn_deleteAccount} onClick={handleDeleteUser}>
                        <FaTrashCan />
                        Delete account
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserModal
