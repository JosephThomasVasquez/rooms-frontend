import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./Layout";

const Routers = () => {
  const location = useLocation();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout location={location} />}></Route>
      </Routes>
    </div>
  );
};

export default Routers;
