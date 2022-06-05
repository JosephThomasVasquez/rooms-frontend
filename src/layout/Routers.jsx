import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Auth Components
import AuthRequired from "../auth/AuthRequired";
import { useAuth } from "../auth/useAuth";

// Components
import Home from "./Home";
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

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route exact path="login" element={<Login />} />
      <Route
        exact
        path="dashboard"
        element={
          <AuthRequired>
            <Dashboard />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklists"
        element={
          <AuthRequired>
            <ChecklistList />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklists/:checklistDate/:checklistId"
        element={
          <AuthRequired>
            <ChecklistDetails />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklists/create"
        element={
          <AuthRequired>
            <ChecklistForm />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklists/edit/:checklistDate/:checklistId"
        element={
          <AuthRequired>
            <EditChecklist />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklist-templates/create"
        element={
          <AuthRequired>
            <TemplateForm user={auth.user} />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="checklist-templates"
        element={
          <AuthRequired>
            <ChecklistTemplates />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="rooms"
        element={
          <AuthRequired>
            <RoomsList />
          </AuthRequired>
        }
      ></Route>

      <Route
        exact
        path="buildings"
        element={
          <AuthRequired>
            <BuildingsList />
          </AuthRequired>
        }
      ></Route>

      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default Routers;
