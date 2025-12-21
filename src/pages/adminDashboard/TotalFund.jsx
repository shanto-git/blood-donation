import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TotalFund = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, totalDonations: 0 });
  const axiosSecure = useAxiosSecure();
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    axiosSecure.get("/total-funding").then((res) => {
      setStats(res.data);
      const now = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setLastUpdated(now);
    });
  }, [axiosSecure]);

  return (
    <div className="grid grid-cols-6 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl shadow-xl text-center">
        <p className="text-lg font-medium opacity-90">
          Total Funding Collected
        </p>
        <h3 className="text-4xl font-bold mt-2">${stats.total}</h3>
        <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
          Updated {lastUpdated}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl text-center">
        <p className="text-lg font-medium opacity-90">Total Transactions</p>
        <h3 className="text-4xl font-bold mt-2">{stats.totalFunding}</h3>
        <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
          All successful payments
        </div>
      </div>
    </div>
  );
};

export default TotalFund;
