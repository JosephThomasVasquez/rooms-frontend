import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Auth Components
import AuthRequired from "../auth/AuthRequired";
import { useAuth } from "../auth/useAuth";

// Components
import Home from "./Home";
import ErrorMessage from "../errors/ErrorMessage";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import ChecklistList from "../checklists/ChecklistList";
import ChecklistForm from "../checklists/ChecklistForm";
import RoomsList from "../directory/rooms/RoomsList";
import BuildingsList from "../directory/buildings/BuildingsList";
import ChecklistDetails from "../checklists/ChecklistDetails";
import TemplateForm from "../checklistTemplates/TemplateForm";
import ChecklistTemplates from "../checklistTemplates/ChecklistTemplates";
import EditChecklist from "../checklists/EditChecklist";

const Routers = () => {
  const location = useLocation();
  const auth = useAuth();

  // console.log("auth:", auth.user);

  const [error, setError] = useState(null);

  const errorHandler = (errorFound = null) => {
    console.log("error", errorFound);
    if (errorFound && errorFound !== "clearErrors") {
      setError(errorFound);
    } else if (errorFound === "clearErrors") {
      setError(null);
    }
  };

  return (
    <>
      {/* ERROR HANDLER */}
      <ErrorMessage error={error} />
      {/* USER ROUTES */}

      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route
          exact
          path="dashboard"
          element={
            <AuthRequired>
              <Dashboard errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        {/* CHECKLIST ROUTES */}
        <Route
          exact
          path="checklists"
          element={
            <AuthRequired>
              <ChecklistList errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="checklists/:checklistDate/:checklistId"
          element={
            <AuthRequired>
              <ChecklistDetails errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="checklists/create"
          element={
            <AuthRequired>
              <ChecklistForm errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="checklists/edit/:checklistDate/:checklistId"
          element={
            <AuthRequired>
              <EditChecklist errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        {/* CHECKLIST TEMPLATES ROUTES */}
        <Route
          exact
          path="checklist-templates/create"
          element={
            <AuthRequired>
              <TemplateForm user={auth.user} errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="checklist-templates"
          element={
            <AuthRequired>
              <ChecklistTemplates errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        {/* ROOMS ROUTES */}
        <Route
          exact
          path="rooms"
          element={
            <AuthRequired>
              <RoomsList errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        {/* BUILDINGS ROUTES */}
        <Route
          exact
          path="buildings"
          element={
            <AuthRequired>
              <BuildingsList errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Routers;
