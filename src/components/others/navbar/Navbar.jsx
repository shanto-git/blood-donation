import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-2">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-red-600">
              BloodCare
            </span>
          </a>

          {/* Menu */}
            <a
              href="/donation-requests"
              className="text-gray-700 hover:text-blue-600 hover:underline"
            >
              Donation Requests
            </a>
          <div className="flex items-center gap-6">

            {!user ? (
              <a
                href="/login"
                className="btn font-bold flex justify-end hover:btn-secondary hover:text-white"
              >
                Login
              </a>
            ) : (
              <>
                <a
                  href="/funding"
                  className="text-gray-700 hover:text-red-600"
                >
                  Funding
                </a>

                {/* User Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user?.photoURL || "https://i.ibb.co/9N0V0Yt/avatar.png"}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-red-500"
                    />
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg p-2">
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </a>

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
