import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deleteProject,
  getProjects,
} from "../../redux/reducers/projectsReducer";
import ProjectModal from "../projectsModal/ProjectsModal";

const ProjectCard = ({ projectObject }) => {
  const navigate = useNavigate();
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const project = projectObject;
  const creator = project.createdBy;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const getFullName = (firstName, lastName) => {
    return firstName + " " + lastName;
  };

  const onDelete = async (e) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (confirmDelete) {
      setIsDeleting(true);
      setDispatch(await doDispatch(deleteProject(project._id)));
      setIsDeleting(false);
    }
  };

  const openProjectPage = () => {
    navigate(`/projects/${project._id}`);
  };

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectMOdal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    doDispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <div className="card text-bg-primary mb-3">
        <div className="d-flex justify-content-between">
          <div className="card-header">
            Created by:{" "}
            {creator ? getFullName(creator.firstName, creator.lastName) : "Unknown"}
          </div>
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
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
        </div>
      </div>
      {project ? (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={handleCloseProjectMOdal}
          isEditing={true}
          projectObject={project}
        />
      ) : null}
    </>
  );
};

export default ProjectCard;
