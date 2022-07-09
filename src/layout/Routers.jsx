import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Auth Components
import AuthRequired from "../auth/AuthRequired";
import { useAuth } from "../auth/useAuth";
import { getUser } from "../utils/apiRequests";
import { isAuthenticated } from "../utils/cookieHandler";

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
import TemplateDetails from "../checklistTemplates/TemplateDetails";
import EditChecklist from "../checklists/EditChecklist";
import Profile from "../users/Profile";
import Signup from "../signup/Signup";
import Checklists from "../admin/checklists/Checklists";
import UsersList from "../admin/users/UsersList";

const Routers = () => {
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

  const getUser = (user) => {};

  return (
    <>
      {/* ERROR HANDLER */}
      <ErrorMessage error={error} />

      <Routes>
        {/* USER ROUTES */}
        <Route
          exact
          path="/user/profile/:userId"
          element={
            <AuthRequired>
              <Profile errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="/user/login"
          element={<Login errorHandler={errorHandler} />}
        />
        <Route
          exact
          path="/user/signup"
          element={<Signup errorHandler={errorHandler} />}
        />
        <Route
          exact
          path={`dashboard/:user`}
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
          path="account/checklists/create"
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

        <Route
          exact
          path="checklist-templates/:templateId/edit"
          element={
            <AuthRequired>
              <TemplateForm errorHandler={errorHandler} />
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

        {/* ADMIN ROUTES ======================================================================= */}
        <Route
          exact
          path="/admin/checklists"
          element={
            <AuthRequired>
              <Checklists errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="/admin/users"
          element={
            <AuthRequired>
              <UsersList errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          exact
          path="/account/admin/user/:userId"
          element={
            <AuthRequired>
              <Profile errorHandler={errorHandler} />
            </AuthRequired>
          }
        ></Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 - This page does not exist.</p>
            </main>
          }
        />
      </Routes>
    </>
  );
};

export default Routers;
