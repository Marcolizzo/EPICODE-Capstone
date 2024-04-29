import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Image, Form, Button } from "react-bootstrap";

import {
  getUserById,
  updateUser,
  updateProfileImage,
  deleteProfileImage,
  updatePassword,
} from "../../redux/reducers/usersReducer";

const UserModal = ({ isOpen, onClose, userObject }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const user = userObject;
  const updatePasswordState = useSelector((state) => state.updatePassword);

  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    username: user ? user.username : "",
    email: user ? user.email : "",
  });

  const [passwordFormData, setPasswordFormData] = useState({});
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newImg, setNewImg] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const [isEditingForm, setIsEditingForm] = useState({
    firstName: false,
    lastName: false,
    username: false,
  });

  const toggleEditImage = () => {
    setIsEditingImage(!isEditingImage);
  };

  const onChangeImage = (e) => {
    setNewImg(e.target.files[0]);
  };

  const handleUpdateImg = async () => {
    if (!newImg) return;

    const fileData = new FormData();
    fileData.append("profileImage", newImg);
    setDispatch(await doDispatch(updateProfileImage([user._id, fileData])));
  };

  const handleDeleteProfileImage = async () => {
    setDispatch(await doDispatch(deleteProfileImage(user._id)));
  };

  const toggleEditForm = (field, toggleValue) => {
    setIsEditingForm({
      ...isEditingForm,
      [field]: toggleValue,
    });
  };

  const handleUpdateUserData = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(updateUser([user._id, formData])));
    setIsEditingForm({ firstName: false, lastName: false, username: false });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const onChangeInputPassword = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
  };

  const handleUpdatePassword = async () => {
    setDispatch(await doDispatch(updatePassword([user._id, passwordFormData])));
    setPasswordFormData({});
    toggleEditPassword();
  };

  useEffect(() => {
    if (user) doDispatch(getUserById(user._id));
  }, [dispatch]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title className="w-100">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div>
              <Image
                src={user ? user.profileImg : ""}
                roundedCircle
                style={{ maxHeight: "200px" }}
              />
            </div>

            {isEditingImage ? (
              <div>
                <Form.Control type="file" onChange={onChangeImage} />
                <a href="#" onClick={handleDeleteProfileImage}>
                  Remove Profile image
                </a>
                <div className="d-flex gap-3 justify-content-center">
                  <a href="#" onClick={handleUpdateImg}>
                    Save
                  </a>
                  <a href="#" onClick={toggleEditImage}>
                    Discard changes
                  </a>
                </div>
              </div>
            ) : (
              <a href="#" onClick={toggleEditImage}>
                Edit
              </a>
            )}
          </div>

          <Form onSubmit={handleUpdateUserData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address:</Form.Label>
              <Form.Control
                onChange={onChangeInput}
                type="text"
                disabled={true}
                value={formData.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="text-center">First Name:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="firstName"
                  disabled={!isEditingForm.firstName}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                />
                {isEditingForm.firstName ? (
                  <div className="d-flex gap-2">
                    <a href="#" onClick={handleUpdateUserData}>
                      Save
                    </a>
                    <a
                      href="#"
                      onClick={() =>
                        toggleEditForm("firstName", !isEditingForm)
                      }
                    >
                      Cancel
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href="#"
                      className="ms-5"
                      onClick={() => toggleEditForm("firstName", true)}
                    >
                      Edit
                    </a>
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-center">Last Name:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="lastName"
                  disabled={!isEditingForm.lastName}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                />
                {isEditingForm.lastName ? (
                  <div className="d-flex gap-2">
                    <a href="#" onClick={handleUpdateUserData}>
                      Save
                    </a>
                    <a
                      href="#"
                      onClick={() => toggleEditForm("lastName", !isEditingForm)}
                    >
                      Cancel
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href="#"
                      className="ms-5"
                      onClick={() => toggleEditForm("lastName", true)}
                    >
                      Edit
                    </a>
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="text-center">Username:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="username"
                  disabled={!isEditingForm.username}
                  placeholder="Enter Username"
                  value={formData.username}
                />
                {isEditingForm.username ? (
                  <div className="d-flex gap-2">
                    <a href="#" onClick={handleUpdateUserData}>
                      Save
                    </a>
                    <a
                      href="#"
                      onClick={() => toggleEditForm("username", !isEditingForm)}
                    >
                      Cancel
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href="#"
                      className="ms-5"
                      onClick={() => toggleEditForm("username", true)}
                    >
                      Edit
                    </a>
                  </div>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-center">Password:</Form.Label>

              {/* {updatePasswordState ? (
                updatePasswordState.status === "succeeded" ? (
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
                    <Form.Label className="text-center">
                      Current password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      placeholder="Insert your current password..."
                      onChange={onChangeInputPassword}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-center">
                      New password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      placeholder="Insert your new password..."
                      onChange={onChangeInputPassword}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-center">
                      Confirm new password:
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Confirm your new password..."
                      onChange={onChangeInputPassword}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2 mt-3">
                    <Button variant="success" onClick={handleUpdatePassword}>
                      Save
                    </Button>
                    <Button variant="danger" onClick={toggleEditPassword}>
                      Discard changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Button onClick={toggleEditPassword}>Change Password</Button>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
