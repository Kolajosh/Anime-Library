import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../view/DashBoard/Dashboard";
import Login from "../view/Login/Login";
import Register from "../view/Register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
