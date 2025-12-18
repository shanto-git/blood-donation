import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setOpen(false);
  };
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "font-bold hover:border-b";

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <h2 className="text-xl font-bold flex text-red-600">Blood<span className="text-black flex">Plus<FaPlus className="mt-1" size={12} /></span></h2>
          </NavLink>
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
                        className="block p-2 text-gray-700 rounded-sm font-semibold hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </NavLink>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left p-2 rounded-sm font-semibold text-red-600 hover:bg-gray-100"
                      >
                        LogOut
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
