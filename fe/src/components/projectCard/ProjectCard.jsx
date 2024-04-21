import React from "react";
import styles from "./ProjectCard.module.css";

const ProjectCard = () => {
  return (
    <div class="card text-bg-primary mb-3">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">Primary card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
