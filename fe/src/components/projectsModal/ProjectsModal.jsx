import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createProject, getProjects, updateProject } from "../../redux/reducers/projectsReducer";

const ProjectModal = ({ isOpen, onClose, projectObject, isEditing }) => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();
  const project = projectObject;

  const error = useSelector((state) => state.createProject.error);
  const isLoading = useSelector((state) => state.createProject.isLoading);

  const [formData, setFormData] = useState({
    title: isEditing ? project.title : "",
    description: isEditing ? project.description : "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    isEditing ? onUpdateProject() : onCreateProject();
  };

  const onCreateProject = async () => {
    setDispatch(await doDispatch(createProject(formData)));
    if (!error) {
      onClose();
      setFormData({});
    }
  };

  const onUpdateProject = async () => {
    setDispatch(await doDispatch(updateProject([formData, project._id])));
    if (!error) {
      onClose();
    }
  };

  const closeModal = () => {
    setFormData({
      title: isEditing ? project.title : "",
      description: isEditing ? project.description : "",
    });
    onClose();
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    doDispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <Modal
        size="sm"
        show={isOpen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                onChange={onChangeInput}
                name="title"
                value={isEditing ? formData.title : undefined}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                rows={3}
                as="textarea"
                placeholder="Description"
                onChange={onChangeInput}
                name="description"
                value={isEditing ? formData.description : undefined}
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                onClick={isEditing ? onUpdateProject : onCreateProject}
                variant={isEditing ? "warning" : "success"}
                disabled={isLoading}
              >
                {isEditing
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
