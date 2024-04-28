import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  ButtonGroup,
  Image,
} from "react-bootstrap";

import { updateProfileImage } from "../../redux/reducers/usersReducer";


const UserModal = ({ isOpen, onClose, user }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    username: user ? user.username : "",
    email: user ? user.email : "",
  });

  const [newImg, setNewImg] = useState(null);

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    username: false,
  });

  const onChangeImage = (e) => {
    setNewImg(e.target.files[0]);
  };

  const handleUpdateImg = () => {
    if(!newImg) return;

    const fileData = new FormData();
    fileData.append('profileImage', newImg)
    doDispatch(updateProfileImage([user._id, fileData]))
  }

// const handleUpdateImg = () => {
//     if(!newImg) return;

//     const fileData = new FormData();
//     fileData.append('profileImage', newImg)
//     // doDispatch(updateProfileImage([user._id, fileData]))

//     axios.post(`/users/${user._id}/updateProfileImage`, fileData, {
//         headers: {
//             "Content-Type": "multipart/form-data"
//         },
//     })
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((e) => {
//         console.log(e)
//     })

//   }

  //   const handleToggleEdit = (field, toggleValue) => {
  //     setIsEditing({
  //       ...isEditing,
  //       [field]: toggleValue,
  //     });
  //   };

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     // doDispatch(signupUser(formData));
  //   };

  //   const onChangeInput = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };


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
            <input type="file" onChange={onChangeImage} />
            <div className="d-flex gap-3 justify-content-center">
              <a href="#" onClick={handleUpdateImg}>Save</a>
              <a href="#">Discard changes</a>
            </div>
          </div>

          {/* <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="text-center">First Name:</Form.Label>
              {isEditing.firstName ? (
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="firstName"
                  disabled={!isEditing.firstName}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                />
              ) : (
                <div>
                  {formData.firstName}
                  <a href="#" className="ms-5" onClick={setIsEditing()}>
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-center">Last Name:</Form.Label>
              {isEditing.lastName ? (
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="lastName"
                  disabled={!isEditing.lastName}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                />
              ) : (
                <div>
                  {formData.lastName}
                  <a href="#" className="ms-5" onClick={setIsEditing()}>
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="text-center">Username:</Form.Label>
              {isEditing.username ? (
                <Form.Control
                  onChange={onChangeInput}
                  type="text"
                  name="username"
                  disabled={!isEditing.username}
                  placeholder="Enter Username"
                  value={formData.username}
                />
              ) : (
                <div>
                  {formData.username}
                  <a href="#" className="ms-5" onClick={setIsEditing()}>
                    Edit
                  </a>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-center">Email address:</Form.Label>
              <div>{formData.email}</div>
            </Form.Group>
          </Form> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
