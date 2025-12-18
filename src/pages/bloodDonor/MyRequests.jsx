import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import axios from "axios";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donations?donorEmail=${user.email}`
      );
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((r) =>
    statusFilter ? r.status === statusFilter : true
  );

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / perPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Blood Group</th>
            <th className="border p-2">Units</th>
            <th className="border p-2">Hospital</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRequests.map((r) => (
            <tr key={r._id} className="text-center">
              <td className="border p-2">{r.bloodGroup}</td>
              <td className="border p-2">{r.units}</td>
              <td className="border p-2">{r.hospital}</td>
              <td className="border p-2">{r.status}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => window.alert("Edit feature")}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => window.alert("Delete feature")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="btn btn-sm"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-2 py-1">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="btn btn-sm"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequests;
