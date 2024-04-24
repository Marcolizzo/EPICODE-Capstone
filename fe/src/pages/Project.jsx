import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProjectPage from "../components/projectPage/ProjectPage";

const Project = () => {
  const { projectId } = useParams();

  return (
    <MainLayout>
      <ProjectPage projectId={projectId} />
    </MainLayout>
  );
};

export default Project;
