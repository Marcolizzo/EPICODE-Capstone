import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProject,
  getProjects,
} from "../../redux/reducers/projectsReducer";
import ProjectModal from "../projectsModal/ProjectsModal";
import { getUserById } from "../../redux/reducers/usersReducer";

const ProjectCard = ({ projectId, title, description, creatorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const creator = useSelector((state) => state.getUserById.user)

  const onDelete = async (e) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (confirmDelete) {
      setIsDeleting(true);
      await dispatch(deleteProject(projectId));
      setIsDeleting(false);
    }
  };

  const openProjectPage = () => {
    navigate(`/projects/${projectId}`);
  };

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectMOdal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getUserById(creatorId))
  }, [dispatch]);

  return (
    <>
      <div className="card text-bg-primary mb-3">
        <div className="d-flex justify-content-between">
          <div className="card-header">Created by: {creator ? creator.firstName + " " + creator.lastName : "Unknown"}</div>
          <div className="d-flex gap-2">
            <Button variant="warning" onClick={handleOpenProjectModal}>
              Edit
            </Button>
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
        <div className="card-body" onClick={openProjectPage}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectMOdal}
        projectId={projectId}
        projectTitle={title}
        projectDescription={description}
      />
    </>
  );
};

export default ProjectCard;
