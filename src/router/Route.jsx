import React, { Component } from "react";
import MainLayout from "../components/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AuthLayout from "../components/layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Profile from "../pages/bloodDonor/Profile";
import CreateRequest from "../pages/adminDashboard/CreateRequest";
import MyRequests from "../pages/bloodDonor/MyRequests";
import WelcomeMsg from "../pages/bloodDonor/WelcomeMsg";
import DonationRequests from "../pages/DonationReq";
import AllUsers from "../pages/adminDashboard/AllUsers";
import Funding from "../pages/Funding";
import AllBloodDonation from "../pages/adminDashboard/AllBloodDonation";
import DonationDetails from "../components/others/DonationDetails";
import Donate from "../pages/Donate/Donate";
import PSuccess from "../pages/Donate/PSuccess";
import TotalFund from "../pages/adminDashboard/TotalFund";
import SearchItem from "../pages/Search";
import Error from "../pages/error/Error";

const Route = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error/>,
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
        path: "/donation-details/:id",
        element: <PrivateRoute><DonationDetails/></PrivateRoute>,
      },
      {
        path: "/donation-funds",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
      {
        path: "/give-fund",
        Component: Donate,
      },
      {
        path: "/payment-success",
        Component: PSuccess,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/search",
        element: <SearchItem/>,
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
    errorElement: <Error/>,
    children: [
      {
        path: "/dashboard",
        element: <WelcomeMsg />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "requests",
        element: <CreateRequest />,
      },
      {
        path: "all-donation",
        element: <AllBloodDonation/>,
      },
      {
        path: "my-request",
        element: <MyRequests />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "total-fund",
        element: <TotalFund/>,
      },
    ],
  },
]);

export default Route;
