import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { NavLink } from "react-router-dom"; // Import NavLink

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setOpen(false);
  };

  // NavLink active class
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-semibold"
      : "text-gray-700 hover:text-red-600";

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-red-600">BloodCare</span>
          </NavLink>

          {/* Menu */}
          <div className="flex items-center gap-6">
            <NavLink to="/donation-requests" className={navLinkClass}>
              Donation Requests
            </NavLink>

            {!user ? (
              <NavLink
                to="/login"
                className="btn font-bold flex justify-end hover:btn-secondary hover:text-white"
              >
                Login
              </NavLink>
            ) : (
              <>
                <NavLink to="/funding" className={navLinkClass}>
                  Funding
                </NavLink>

                {/* User Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="focus:outline-none"
                  >
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/9N0V0Yt/avatar.png"
                      }
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-red-500"
                    />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg p-2">
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </NavLink>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left p-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
