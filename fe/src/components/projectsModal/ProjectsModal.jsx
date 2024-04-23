import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createProject,
  getProjects,
} from "../../redux/reducers/projectsReducer";

const ProjectModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const error = useSelector((state) => state.createProject.error);
  const isLoading = useSelector((state) => state.createProject.isLoading);
  const project = useSelector((state) => state.createProject.project);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProject(formData)).then(() => {
      if (!error) {
        onClose();
      }
    });
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, project]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Modal
        size="sm"
        show={isOpen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                onChange={onChangeInput}
                name="title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                rows={3}
                as="textarea"
                placeholder="Description"
                autoFocus
                onChange={onChangeInput}
                name="description"
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" variant="success" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
              </Button>
              <Button variant="danger" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectModal;
