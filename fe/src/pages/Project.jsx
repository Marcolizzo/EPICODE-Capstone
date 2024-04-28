import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProjectPage from "../components/projectPage/ProjectPage";

const Project = () => {
  const { projectId } = useParams();

  return (
    <div className="d-flex">
      <MainLayout/>
      <ProjectPage projectId={projectId} />
    </div>
  );
};

export default Project;
