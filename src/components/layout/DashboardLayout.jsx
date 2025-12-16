// import { NavLink, Outlet } from "react-router-dom";
// import { FaUser, FaHome, FaBars } from "react-icons/fa";
// import { useState } from "react";

// const DashboardLayout = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static z-50 bg-white w-64 min-h-screen shadow-md transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-300`}
//       >
//         <div className="p-5 border-b font-bold text-xl text-center">
//           Dashboard
//         </div>

//         <nav className="p-4 space-y-2">

          
//           <NavLink
//             to="/"
//             className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
//           >
//             <FaHome /> Home
//           </NavLink>
//           <NavLink
//             to="/dashboard/profile"
//             className={({ isActive }) =>
//               `flex items-center gap-2 p-2 rounded ${
//                 isActive ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <FaUser /> Profile
//           </NavLink>
//         </nav>
//       </aside>

//       <div className="flex-1 lg:ml-0">
//         <div className="lg:hidden flex items-center gap-4 p-4 bg-white shadow">
//           <button onClick={() => setOpen(!open)}>
//             <FaBars size={20} />
//           </button>
//           <h2 className="font-semibold">Dashboard</h2>
//         </div>

//         <div className="p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
