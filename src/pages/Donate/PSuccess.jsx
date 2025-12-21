import { CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PSuccess = () => {

    const [searchParams]= useSearchParams();
    const sessionId = searchParams.get('session_id')

    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        axiosSecure.post(`/payment-success?session_id=${sessionId}`)
        .then(res=>
            console.log(res)
        )
    },[axiosSecure, sessionId])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center border-t-8 border-green-500">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your generous contribution. Your support helps us continue our mission to save lives.
                </p>

                <div className="bg-green-50 p-4 rounded-lg mb-8 border border-green-100">
                    <p className="text-sm text-green-700">
                        A confirmation email has been sent to your registered address.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/donation-funds" className="btn btn-success text-white w-full">
                        View Funding History
                    </Link>
                    <Link to="/" className="btn btn-outline w-full">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PSuccess;