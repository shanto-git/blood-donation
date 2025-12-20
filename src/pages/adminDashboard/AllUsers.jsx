import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ShieldCheck, UserCheck, Ban, Unlock } from "lucide-react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/all-users?status=${filter}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/users/status/${id}`, { status: newStatus });
      Swal.fire("Success", `User is now ${newStatus}`, "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleMakeRole = async (id, newRole) => {
    try {
      await axios.patch(`http://localhost:5000/users/role/${_id}`, { role: newRole });
      Swal.fire("Success", `User is now an ${newRole}`, "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage All Users</h2>
        
        {/* Filtering Dropdown */}
        <select 
          className="select select-bordered w-full max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 uppercase text-xs">
              <th>Avatar</th>
              <th>Details</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id} className="hover">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user?.photoURL} alt={user?.name} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </td>
                <td>
                  <span className={`badge badge-sm ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-sm ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                    {user.status || 'active'}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 justify-center">
                  {/* Block/Unblock Button */}
                  {user.status === "active" || !user.status ? (
                    <button onClick={() => handleUpdateStatus(user._id, "blocked")} className="btn btn-xs btn-error text-white"><Ban size={14} className="mr-1"/> Block</button>
                  ) : (
                    <button onClick={() => handleUpdateStatus(user._id, "active")} className="btn btn-xs btn-success text-white"><Unlock size={14} className="mr-1"/> Unblock</button>
                  )}

                  {/* Role Management Buttons */}
                  {user.role !== "volunteer" && user.role !== "admin" && (
                    <button onClick={() => handleMakeRole(user._id, "volunteer")} className="btn btn-xs btn-outline btn-info"><UserCheck size={14} className="mr-1"/> Make Volunteer</button>
                  )}
                  {user.role !== "admin" && (
                    <button onClick={() => handleMakeRole(user._id, "admin")} className="btn btn-xs btn-outline btn-warning"><ShieldCheck size={14} className="mr-1"/> Make Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;