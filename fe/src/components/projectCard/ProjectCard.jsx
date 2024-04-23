import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./ProjectCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProject,
  getProjects,
} from "../../redux/reducers/projectsReducer";
import ProjectModal from "../projectsModal/ProjectsModal";

const ProjectCard = ({ projectId, title, description, createdBy }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const onDelete = async (e) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (confirmDelete) {
      setIsDeleting(true);
      await dispatch(deleteProject(projectId));
      setIsDeleting(false);
    }
  };

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectMOdal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, isDeleting]);

  return (
    <>
      <div className="card text-bg-primary mb-3">
        <div className="d-flex justify-content-between">
          <div className="card-header">Created by: {createdBy}</div>
          <div className="d-flex gap-2">
            <Button variant="warning" onClick={handleOpenProjectModal}>
              Edit
            </Button>
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
        <div className="card-body">
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
