import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaBars, FaUsers } from "react-icons/fa";
import { useContext, useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { CiMemoPad } from "react-icons/ci";
import { AuthContext } from "../../auth/AuthProvider";

const DashboardLayout = () => {
  const {role}= useContext(AuthContext)
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 bg-white w-64 min-h-screen shadow-md transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-2 border-b-1 font-bold text-xl text-center">
          Dashboard
        </div>

        <nav className="p-4 space-y-2">

          
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>
          {
            role == "donor" && (<NavLink
            to="/dashboard/requests"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <IoIosCreate /> Create Request
          </NavLink>)
          }
          {
            role == "donor" && (<NavLink
            to="my-request"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <CiMemoPad /> My Request
          </NavLink>)
          }
          {
            role == "admin" && (<NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <FaUsers /> All Users
          </NavLink>)
          }
          <NavLink
            to="/dashboard/all-donation"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "btn btn-secondary" : "hover:bg-red-50"
              }`
            }
          >
            <CiMemoPad /> All Blood Donation
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden flex items-center gap-4 p-4 bg-white shadow">
          <button onClick={() => setOpen(!open)}>
            <FaBars size={20} />
          </button>
          <h2 className="font-semibold">Dashboard</h2>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
