import React, { Component } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/Login';

const Route = createBrowserRouter([
    {
        path:"/",
        Component: MainLayout,
        children:[
            {
                path:"/",
                Component:Home,
            },
            {
                path:"/login",
                Component: Login,
            }
        ]
    },
])

export default Route;