import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createProject,
  getProjects,
  updateProject,
} from "../../redux/reducers/projectsReducer";

const ProjectModal = ({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  projectDescription,
}) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.createProject.error);
  const isLoading = useSelector((state) => state.createProject.isLoading);
  const createdProject = useSelector((state) => state.createProject.project);
  const updatedProject = useSelector((state) => state.updateProject.project);
  const [formData, setFormData] = useState({
    title: projectTitle ? projectTitle : "",
    description: projectDescription ? projectDescription : "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (projectId) {
      dispatch(updateProject([formData, projectId])).then(() => {
        if (!error) {
          onClose();
        }
      });
    } else {
      dispatch(createProject(formData)).then(() => {
        if (!error) {
          onClose();
          setFormData({})
        }
      });
    }
  };

  const closeModal = () => {
    // Ripristina il titolo e la descrizione ai valori iniziali
    setFormData({
      title: projectTitle ? projectTitle : "",
      description: projectDescription ? projectDescription : "",
    });
    onClose(); // Chiudi il modale
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, createdProject, updatedProject]);

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
                value={formData.title}
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
                onChange={onChangeInput}
                name="description"
                value={formData.description}
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                type="submit"
                variant={projectId ? "warning" : "success"}
                disabled={isLoading}
              >
                {projectId
                  ? isLoading
                    ? "Editing..."
                    : "Edit"
                  : isLoading
                  ? "Creating..."
                  : "Create"}
              </Button>
              <Button variant="danger" onClick={closeModal}>
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
