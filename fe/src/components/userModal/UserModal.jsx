import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Image, Form } from "react-bootstrap";

import {
  getUserById,
  updateUser,
  updateProfileImage,
  deleteProfileImage,
} from "../../redux/reducers/usersReducer";

const UserModal = ({ isOpen, onClose, userObject }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const user = userObject;

  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    username: user ? user.username : "",
    email: user ? user.email : "",
  });

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
    // CLOUDINARY_DEFAULT_PROFILE_IMAGE_ID='Capstone/gkwxk0laqxes0hpbut4m'
    // CLOUDINARY_DEFAULT_PROFILE_IMAGE_URL='https://res.cloudinary.com/duo0rtksl/image/upload/v1712915588/Capstone/gkwxk0laqxes0hpbut4m.png'
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
    setIsEditingForm({firstName: false, lastName: false, username: false})
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) doDispatch(getUserById(user._id));
  }, [dispatch]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="lg" centered>
        <Modal.Header>
          <Modal.Title className="w-100"></Modal.Title>
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
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="text-center">First Name:</Form.Label>
              {isEditingForm.firstName ? (
                <div>
                  <Form.Control
                    onChange={onChangeInput}
                    type="text"
                    name="firstName"
                    disabled={!isEditingForm.firstName}
                    placeholder="Enter First Name"
                    value={formData.firstName}
                  />
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
                </div>
              ) : (
                <div>
                  {formData.firstName}
                  <a
                    href="#"
                    className="ms-5"
                    onClick={() => toggleEditForm("firstName", true)}
                  >
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-center">Last Name:</Form.Label>
              {isEditingForm.lastName ? (
                <div>
                  <Form.Control
                    onChange={onChangeInput}
                    type="text"
                    name="lastName"
                    disabled={!isEditingForm.lastName}
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                  />
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
                </div>
              ) : (
                <div>
                  {formData.lastName}
                  <a
                    href="#"
                    className="ms-5"
                    onClick={() => toggleEditForm("lastName", true)}
                  >
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="text-center">Username:</Form.Label>
              {isEditingForm.username ? (
                <div>
                  <Form.Control
                    onChange={onChangeInput}
                    type="text"
                    name="username"
                    disabled={!isEditingForm.username}
                    placeholder="Enter Username"
                    value={formData.username}
                  />
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
                </div>
              ) : (
                <div>
                  {formData.username}
                  <a
                    href="#"
                    className="ms-5"
                    onClick={() => toggleEditForm("username", true)}
                  >
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address:</Form.Label>
              <div>{formData.email}</div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
