import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError(); 

    let title = "Oops! Something went wrong";
    let message = "An unexpected error has occurred.";
    let errorCode = error?.status || "Error";

    if (error?.status === 404) {
        title = "Page Not Found";
        message = "The page you are looking for doesn't exist or has been moved.";
    } else if (error?.status === 403) {
        title = "Access Denied";
        message = "You do not have permission to view this page.";
    } else if (error?.status === 500) {
        title = "Internal Server Error";
        message = "Our servers are having a moment. Please try again later.";
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5 text-center">
            <h1 className="text-9xl font-extrabold text-red-500 animate-pulse">
                {errorCode}
            </h1>
            <h2 className="text-3xl font-bold mt-4 text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2 mb-8 max-w-md mx-auto">
                {message || error?.statusText}
            </p>
            
            <div className="flex gap-4">
                <Link to="/" className="btn btn-primary px-8">
                    Go to Home
                </Link>
                <button onClick={() => window.location.reload()} className="btn btn-outline">
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default Error;