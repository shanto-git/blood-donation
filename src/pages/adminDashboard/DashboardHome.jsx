import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Users, DollarSign, Droplets } from "lucide-react";
import axios from "axios";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://backend11-ashy.vercel.app/admin-stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <section className="bg-white p-8 rounded-xl shadow-sm mb-8 border-l-8 border-secondary">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back,{" "}
          <span className="text-secondary">{user?.displayName || "User"}</span>!
        </h1>
        <p className="text-gray-600 mt-2">
          Here is what’s happening with the blood donation network today.
        </p>
      </section>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Donors */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-b-4 border-blue-500">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Users size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">
              Total Donors
            </p>
            <h3 className="text-2xl font-bold">{stats.totalDonors}</h3>
          </div>
        </div>

        {/* Card 2: Total Funding */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-b-4 border-green-500">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">
              Total Funding
            </p>
            <h3 className="text-2xl font-bold">${stats.totalFunding}</h3>
          </div>
        </div>

        {/* Card 3: Blood Donation Requests */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-b-4 border-red-500">
          <div className="p-4 bg-red-100 rounded-full text-red-600">
            <Droplets size={32} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase">
              Donation Requests
            </p>
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
