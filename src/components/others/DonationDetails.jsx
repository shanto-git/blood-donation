import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth/AuthProvider';

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext) 
    const axiosSecure = useAxiosSecure();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/donation-request/${id}`)
            .then(res => setRequest(res.data));
    }, [id, axiosSecure]);

    const handleConfirmDonation = async (e) => {
        e.preventDefault();
        const donorInfo = {
            name: user?.displayName,
            email: user?.email
        };

        const res = await axiosSecure.patch(`/donation-request/donate/${id}`, donorInfo);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "You have accepted this request.", "success");
            setRequest({ ...request, status: 'inprogress' });
            document.getElementById('donation_modal').close();
        }
    };

    if (!request) return <div className="flex justify-center items-center">
        <span className="loading loading-ghost loading-lg"></span>;
        </div>

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            <h2 className="text-3xl font-bold text-red-600 mb-6 border-b pb-2">Request Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className='flex gap-2'><strong>Requester:</strong> <p>{request.requesterName} <br /> {request.requesterEmail}</p> </div>
                <p><strong>Recipient:</strong> {request.recipientName}</p>
                <p><strong>Location:</strong> {request.selectedUpozila}, {request.selectedDistrict}</p>
                <p><strong>Hospital:</strong> {request.hospital}</p>
                <p><strong>Address:</strong> {request.address}</p>
                <p><strong>Blood Group:</strong> <span className="badge badge-error text-white">{request.bloodGroup}</span></p>
                <p><strong>Date/Time:</strong> {request.donationDate} at {request.donationTime}</p>
                <p><strong>Status:</strong> <span className="badge badge-soft badge-error uppercase font-bold">{request.status}</span></p>
                <div className="md:col-span-2 bg-gray-50 p-4 rounded italic">
                    <strong>Message:</strong> {request.notes}
                </div>
            </div>
            {request.status === 'pending' && (
                <button 
                    onClick={() => document.getElementById('donation_modal').showModal()}
                    className="btn btn-error w-full mt-8 text-white"
                >
                    Donate
                </button>
            )}

            {/* Modal */}
            <dialog id="donation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>
                    <form onSubmit={handleConfirmDonation} className="space-y-4">
                        <div>
                            <label className="label">Donor Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                        <div>
                            <label className="label">Donor Email</label>
                            <input type="text" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-success text-white">Confirm</button>
                            <button type="button" onClick={() => document.getElementById('donation_modal').close()} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;