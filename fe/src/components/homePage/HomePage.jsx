import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

import { getProjects } from "../../redux/reducers/projectsReducer";
import { getUserById } from "../../redux/reducers/usersReducer";
import ProjectCard from "../projectCard/ProjectCard";
import ProjectModal from "../projectsModal/ProjectsModal";

const HomePage = () => {
  const doDispatch = useDispatch();
  const [dispatch, setDispatch] = useState();

  const projects = useSelector((state) => state.getProjects.projects);
  const userId = jwtDecode(useSelector((state) => state.login.token)).userId;
  const user = useSelector((state) => state.getUserById.user);
  
  const firstName = user ? user.firstName : "";
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectMOdal = () => {
    setProjectModalOpen(false);
  };

  useEffect(() => {
    doDispatch(getProjects());
    doDispatch(getUserById(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Container>
        <h1 className="text-center">Welcome {firstName}!</h1>
        <Button
          className="mb-2"
          variant="success"
          onClick={handleOpenProjectModal}
        >
          + Create new Project
        </Button>
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            projectObject={project}
          />
        ))}
      </Container>
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectMOdal}
        isEditing={false}
      />
    </>
  );
};

export default HomePage;
