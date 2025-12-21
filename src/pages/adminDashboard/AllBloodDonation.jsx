import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";

const AllBloodDonation = () => {
  const {role}= useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Fetch all requests
  useEffect(() => {
    axiosSecure.get("/all-donation-requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);


  const filteredRequests = statusFilter 
    ? requests.filter(r => r.status === statusFilter) 
    : requests;


  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/all-donation-requests/${id}`);
        if (res.data.deletedCount > 0) {
          setRequests(requests.filter(r => r._id !== id));
          Swal.fire("Deleted!", "Request removed.", "success");
        }
      }
    });
  };

  return (
    <div className=" p-2">
      <h2 className="text-2xl text-center font-bold mb-6">All Blood Donation Requests</h2>
      <div className="mb-4 flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div>
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className=" p-2">Recipient</th>
              <th className=" p-2">Location</th>
              <th className=" p-2">Date/Time</th>
              <th className=" p-2">Blood Group</th>
              <th className=" p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((r) => (
              <tr key={r._id} className="text-center hover">
                <td>{r.recipientName}</td>
                <td>{r.hospital}, {r.address}, <br /> {r.selectedUpozila}, {r.selectedDistrict}</td>
                <td>{r.donationDate} at {r.donationTime}</td>
                <td><span className="badge badge-error text-white font-bold">{r.bloodGroup}</span></td>
                <td>
                  <span className={`badge ${
                    r.status === 'pending' ? 'badge-warning' : 
                    r.status === 'inprogress' ? 'badge-info' : 'badge-success'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  {
                    role == "admin" && (<button onClick={() => handleDelete(r._id)} className="btn btn-xs btn-outline btn-error">
                    Delete
                  </button>)
                  }
                  <Link to={`/donation-details/${r._id}`} className="btn btn-xs btn-neutral">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="btn btn-sm btn-outline"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="btn btn-sm btn-outline"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonation;