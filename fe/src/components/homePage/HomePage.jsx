import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

import ProjectCard from "../projectCard/ProjectCard";
import { getProjects } from "../../redux/reducers/projectsReducer";
import { getUserById } from "../../redux/reducers/usersReducer";


const HomePage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.getProjects.projects);
  const userId = jwtDecode(useSelector((state)=> state.login.token)).userId
  const user = useSelector((state)=> state.getUserById.user)
  const username = user ? user.username : ''

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getUserById(userId))
  }, [dispatch, userId]);

  return (
    <Container>
      <h1 className="text-center">Welcome !</h1>
      {projects.map((project) => (
        <ProjectCard
          projectId={project._id}
          title={project.title}
          description={project.description}
          createdBy={username}
        />
      ))}
    </Container>
  );
};

export default HomePage;
