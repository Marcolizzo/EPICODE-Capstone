import React, { useEffect, useState } from "react";
import {Container, Button} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ProjectModal from "../projectsModal/ProjectsModal";

const NavigationBar = () => {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false)


const handleOpenProjectModal = () => {
  setProjectModalOpen(true)
}

const handleCloseProjectMOdal = ()=> {
  setProjectModalOpen(false)
}



  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#home" className="ms-5">EPICODE-Capstone</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#features">Projects</Nav.Link>
          <Button variant="success" onClick={handleOpenProjectModal}>+ Create new Project </Button>
        </Nav>
      </Navbar>

    <ProjectModal isOpen={isProjectModalOpen} onClose={handleCloseProjectMOdal}/>
    </>
  );
};

export default NavigationBar;
