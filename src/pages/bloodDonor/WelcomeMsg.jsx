import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { Link } from "react-router";

const WelcomeMsg = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`/api/donation-requests?email=${user.email}&limit=3`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      });
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-lg">
        <div className="card-body text-center">
          <div className="flex justify-center gap-5 text-center">
            <h1 className="text-3xl font-bold mb-2 text-secondary">Welcome</h1>
            <h1 className="text-3xl font-bold">{user?.displayName}</h1>
          </div>
          <p className="text-gray-500 mt-2">
            Thank you for being a blood donor. Your support saves lives.
          </p>

          <div className="mt-6">
            <Link to="/" className="btn btn-secondary btn-wide">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
      {!loading && requests.length > 0 && (
        <div className="card bg-base-100 shadow">
          <div className="card-body overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">
              Your Recent Donation Requests
            </h2>

            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.recipientName}</td>
                    <td>
                      {request.recipientDistrict}, {request.recipientUpazila}
                    </td>
                    <td>{request.donationDate}</td>
                    <td>{request.donationTime}</td>
                    <td>{request.bloodGroup}</td>
                    <td>
                      <span
                        className={`badge capitalize ${
                          request.status === "pending"
                            ? "badge-warning"
                            : request.status === "inprogress"
                            ? "badge-info"
                            : request.status === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeMsg;
