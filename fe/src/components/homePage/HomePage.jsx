import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/esm/Container";

import ProjectCard from "../projectCard/ProjectCard";
import { getProjects } from "../../redux/reducers/projectsReducer";
import { loginUser } from "../../redux/reducers/loginReducer";

const HomePage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.getProjects.projects);
  const loginToken = useSelector((state) => state.login.token)

  useEffect(() => {
      dispatch(getProjects());
  });

  
  return (
    <Container>
      <h1 className="text-center">Welcome !</h1>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          title={project.title}
          description={project.description}
          createdBy="Bho"
        />
      ))}
    </Container>
  );
};

export default HomePage;
