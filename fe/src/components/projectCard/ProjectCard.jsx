import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ title, description, createdBy }) => {
  return (
    <div className="card text-bg-primary mb-3">
      <div className="card-header">Created by: {createdBy}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
