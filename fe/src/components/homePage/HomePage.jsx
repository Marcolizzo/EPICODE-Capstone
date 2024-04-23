import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import ProjectCard from "../projectCard/ProjectCard";
import { getProjects } from "../../redux/reducers/projectsReducer";
import { getUserById } from "../../redux/reducers/usersReducer";

const HomePage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.getProjects.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <Container>
      <h1 className="text-center">Welcome !</h1>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          title={project.title}
          description={project.description}
          createdBy={project.createdBy}
        />
      ))}
    </Container>
  );
};

export default HomePage;
