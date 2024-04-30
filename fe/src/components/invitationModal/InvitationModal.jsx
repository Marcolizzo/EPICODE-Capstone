import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  createInvitation,
  deleteInvitation,
  updateInvitation,
} from "../../redux/reducers/invitationsReducer";
import { getUserById } from "../../redux/reducers/usersReducer";
import { getProjects } from "../../redux/reducers/projectsReducer";

const InvitatationModal = ({ isOpen, onClose, project, invitation }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const [formData, setFormData] = useState({});
  const error = useSelector((state) => state.createInvitation.error);

  const handleSendInvitation = async (e) => {
    e.preventDefault();
    setDispatch(await doDispatch(createInvitation([project._id, formData])));
    if (!error) {
      setFormData({});
      onClose();
    }
  };

  const closeModal = () => {
    setFormData({});
    onClose();
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteInvitation = async () => {
    await doDispatch(deleteInvitation(invitation._id));
    doDispatch(getUserById(invitation.recipient._id));
    onClose();
  };

  const handleAcceptInvitation = async () => {
    await doDispatch(
      updateInvitation([invitation._id, invitation.project._id, true, true])
    );
    doDispatch(getUserById(invitation.recipient._id));
    doDispatch(getProjects(invitation.recipient._id));
    onClose();
  };

  return (
    <>
      {!invitation ? (
        <Modal
          size="lg"
          show={isOpen}
          onHide={onClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Send invitation for {`"${project.title}"`}
            </Modal.Title>
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
              <div className="mt-3 d-flex gap-2">
                <Button onClick={handleSendInvitation} variant={"success"}>
                  Send
                </Button>
                <Button variant="danger" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal
          size="lg"
          show={isOpen}
          onHide={onClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Invitation from {`${invitation.sender.username}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                You have been invited by{" "}
                {invitation.sender.firstName + " " + invitation.sender.lastName}{" "}
                to join the project "{invitation.project.title}".
              </p>
              <p>
                The following message has been included:
                <Form.Control
                  type="text"
                  disabled={true}
                  value={invitation.message}
                />
              </p>
              <p className="mt-5">
                Would you like to accept the invitation and become a member of
                the project?
              </p>
            </div>

            <div className="mt-2 d-flex gap-2">
              <Button variant="success" onClick={handleAcceptInvitation}>
                Accept
              </Button>
              <Button variant="danger" onClick={handleDeleteInvitation}>
                Decline
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default InvitatationModal;
