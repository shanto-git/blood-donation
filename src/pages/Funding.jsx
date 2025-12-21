import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Funding = () => {
    const [funds, setFunds] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/all-funds')
            .then(res => setFunds(res.data));
    }, [axiosSecure]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center items-center mb-8 ">
                <h2 className="text-3xl font-bold">Organization Funds</h2>
            </div>
            <div className="flex justify-end">
                <Link to="/dashboard/give-fund">
                    <button className="btn btn-secondary">Give Fund</button>
                </Link>
            </div>

            {
                funds.length>0?(<div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Donor Name</th>
                            <th>Amount (USD)</th>
                            <th>Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund, index) => (
                            <tr key={fund._id}>
                                <td>{index + 1}</td>
                                <td>{fund.userName}</td>
                                <td className="font-bold text-green-600">${fund.amount}</td>
                                <td>{new Date(fund.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>):(<div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg ">
                    <p className="text-2xl font-semibold text-gray-500 italic">
                        No funding received yet.
                    </p>
                </div>)
            }
        </div>
    );
};

export default Funding;