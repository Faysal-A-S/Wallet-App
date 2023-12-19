import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import AuthCheck from "./utils/AuthCheck";
import Transaction from "./pages/Transaction";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";

import Users from "./pages/Users";
import AdminRoutes from "./utils/AdminRoutes";

function App() {
  const authChecked = AuthCheck();

  return (
    <Router>
      <div className="h-screen ">
        {authChecked && (
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Main />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoutes>
                  <Transaction />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoutes>
                  <Requests />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/users"
              element={
                <AdminRoutes>
                  <Users />
                </AdminRoutes>
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
