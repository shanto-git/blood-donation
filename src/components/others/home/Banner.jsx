import { FaHeartbeat, FaShieldAlt, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="">
        <section
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-xl mx-auto flex items-center ml-3 min-h-screen">
        <div className="max-w-xl m-left">
          <h1 className="text-4xl text-red-600 md:text-5xl font-bold mb-3">
            Save a Life, Become a Blood Donor
          </h1>

          <p className=" text-lg mb-6">
            Join our community and help patients find blood donors quickly and easily.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="btn btn-outline border border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Join as a Donor
            </Link>

            <Link
              to="/search"
              className="btn btn-outline border border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Search Donors
            </Link>
          </div>
        </div>

      </div>
    </section>
     <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
            Why BloodCare Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            BloodCare connects donors and patients faster, safer, and more reliably.
            Your one donation can save up to three lives.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-red-50 shadow-sm rounded-lg hover:shadow-xl transition text-center">
            <FaUserFriends className="text-5xl mx-auto mb-4" />
            <h3 className="text-xl text-red-600 font-bold mb-3">
              Find Donors Easily
            </h3>
            <p className="text-gray-600">
              Search donors by blood group and location to get help quickly
              when it matters most.
            </p>
          </div>
          <div className="p-6 bg-red-50 shadow-sm rounded-lg hover:shadow-xl transition text-center">
            <FaHeartbeat className="text-5xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl text-red-600 font-bold mb-3">
              Save Lives
            </h3>
            <p className="text-gray-600">
              Every blood donation helps patients in emergencies, surgeries, and
              long-term treatments.
            </p>
          </div>
          <div className="p-6 bg-red-50 shadow-sm rounded-lg hover:shadow-xl transition text-center">
            <FaShieldAlt className="text-5xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl text-red-600 font-bold mb-3">
              Safe & Trusted
            </h3>
            <p className="text-gray-600">
              Verified donors, secure data handling, and transparent processes
              ensure trust for everyone.
            </p>
          </div>

        </div>

        <div className="mt-20 bg-red-50 rounded-lg p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-red-600">5,000+</h3>
            <p className="text-gray-600">Registered Donors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-600">3,200+</h3>
            <p className="text-gray-600">Successful Donations</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-red-600">1,000+</h3>
            <p className="text-gray-600">Lives Saved</p>
          </div>
        </div>

      </div>
    </section>
    </div>
  );
};

export default Banner;
