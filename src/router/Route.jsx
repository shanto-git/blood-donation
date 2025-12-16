import React, { Component } from "react";
import MainLayout from "../components/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AuthLayout from "../components/layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../auth/PrivateRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Profile from "../pages/dashboard/Profile";

const Route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default Route;
