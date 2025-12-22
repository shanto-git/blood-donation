import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ShieldCheck, UserCheck, Ban, Unlock } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../auth/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (user) {
      axiosSecure.get("/users").then((res) => {
        setUsers(res.data);
      });
    }
  }, [axiosSecure, user]);
  console.log(users);

  const handleUpdateStatus = async (email, status) => {
    // Determine text based on action
    const actionText = status === "blocked" ? "block" : "unblock";
    const confirmButtonColor = status === "blocked" ? "#d33" : "#3085d6";

    // 1. Show Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${actionText} this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, ${actionText} them!`,
    }).then(async (result) => {
      // 2. If user clicks "Yes"
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/update/user/status?email=${email}&status=${status}`
          );

          if (res.data.modifiedCount > 0) {
            // Update UI state
            setUsers(
              users.map((u) =>
                u.email === email ? { ...u, status: status } : u
              )
            );

            Swal.fire({
              title: "Success!",
              text: `User has been ${
                status === "active" ? "unblocked" : "blocked"
              }.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  const handleMakeRole = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(
        `https://backend11-ashy.vercel.app/users/role/${id}`,
        {
          role: newRole,
        }
      );
      if (res.data.modifiedCount > 0) {
        setUsers(
          users.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        Swal.fire("Success", `User is now an ${newRole}`, "success");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage All Users</h2>
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
            {users?.map((u) => (
              <tr key={u?._id} className="hover">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={u?.photoURL} alt={u?.name} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{u.name}</div>
                  <div className="text-sm opacity-50">{u.email}</div>
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      u.role === "admin" ? "badge-warning" : "badge-success"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      u.status === "blocked" ? "badge-error" : "badge-success"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 justify-center">
                  {u.status === "active" || !u.status ? (
                    <button
                      onClick={() => handleUpdateStatus(u?.email, "blocked")}
                      className="btn btn-xs btn-error text-white"
                    >
                      <Ban size={14} className="mr-1" /> Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(u?.email, "active")}
                      className="btn btn-xs btn-success text-white"
                    >
                      <Unlock size={14} className="mr-1" /> Unblock
                    </button>
                  )}

                  {u.role !== "volunteer" && u.role !== "admin" && (
                    <button
                      onClick={() => handleMakeRole(u._id, "volunteer")}
                      className="btn btn-xs btn-outline btn-info"
                    >
                      <UserCheck size={14} className="mr-1" /> Make Volunteer
                    </button>
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
