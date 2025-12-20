import React, { Component } from "react";
import MainLayout from "../components/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AuthLayout from "../components/layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../auth/PrivateRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Profile from "../pages/bloodDonor/Profile";
import CreateRequest from "../pages/bloodDonor/CreateRequest";
import MyRequests from "../pages/bloodDonor/MyRequests";
import WelcomeMsg from "../pages/bloodDonor/WelcomeMsg";
import DonationRequests from "../pages/DonationReq";
import AllUsers from "../pages/adminDashboard/AllUsers";
import AdminRequest from "../pages/adminDashboard/AdminRequest";

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
        path: "/donation-requests",
        Component: DonationRequests,
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
        path:"/dashboard",
        element:<WelcomeMsg/>
,      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "requests",
        element: <CreateRequest />,
      },
      {
        path: "my-request",
        element: <MyRequests />,
      },
      {
        path: "all-users",
        element: <AllUsers/>
      },
      {
        path: "admin-request",
        element: <AdminRequest/>
      },
    ],
  },
]);

export default Route;
