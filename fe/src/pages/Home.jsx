import React from "react";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../components/homePage/HomePage";

const Home = () => {
  return (
    <div className="d-flex">
      <MainLayout/>
      <HomePage/>
    </div>
  );
};

export default Home;
