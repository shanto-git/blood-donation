import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Droplet } from 'lucide-react';

const BloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/pending-requests')
            .then(res => setRequests(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Pending Donation Requests</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <div key={request._id} className="card bg-base-100 shadow-xl border-t-4 border-red-500">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold border-b pb-2">
                                {request.recipientName}
                            </h3>
                            
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-2">
                                    <Droplet className="text-red-500" size={18} />
                                    <span className="font-semibold text-lg">Blood Group: </span>
                                    <span className="badge badge-error text-white">{request.bloodGroup}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-gray-500" size={18} />
                                    <span>{request.hospitalName}, {request.fullAddress}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="text-gray-500" size={18} />
                                    <span>{request.donationDate}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock className="text-gray-500" size={18} />
                                    <span>{request.donationTime}</span>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-6">
                                <Link to={`/donation-details/${request._id}`}>
                                    <button className="btn btn-outline btn-error btn-sm w-full">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {requests.length === 0 && (
                <p className="text-center text-gray-500 mt-10 text-lg">No pending donation requests found.</p>
            )}
        </div>
    );
};

export default BloodDonationRequests;