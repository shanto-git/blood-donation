import React from 'react';
import Navbar from '../others/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../others/footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;