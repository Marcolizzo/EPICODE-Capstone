import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { loginUser } from "../../redux/reducers/loginReducer";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from '../projectCard/ProjectCard'

const HomePage = () => {
  const dispatch = useDispatch();
  const userFirstName = localStorage.getItem('userFirstName')

  return (
    <Container>
      <h1 className="text-center">Welcome {userFirstName}!</h1>
      <ProjectCard></ProjectCard>
    </Container>
  );
};

export default HomePage;
