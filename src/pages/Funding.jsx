import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Funding = () => {
    const axiosSecure = useAxiosSecure();
    const [funds, setFunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get('/all-funds')
            .then(res => setFunds(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Organization Funds</h2>
                <button 
                    onClick={() => navigate('/give-fund')} 
                    className="btn btn-secondary"
                >
                    Give Fund
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund, index) => (
                            <tr key={fund._id}>
                                <th>{index + 1}</th>
                                <td>{fund.userName}</td>
                                <td className="font-bold text-green-600">${fund.price}</td>
                                <td>{new Date(fund.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Funding;