import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../auth/AuthProvider";

const DonationRequests = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const {user}= useContext(AuthContext)

  // Load districts
  useEffect(() => {
    fetch("/district.json")
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  // Load upazilas
  useEffect(() => {
    fetch("/upozilas.json")
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

  // Filter upazilas based on district
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        upz => upz.district_id === selectedDistrict
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
    setSelectedUpazila("");
  }, [selectedDistrict, upazilas]);

  const handleSearch = e => {
    e.preventDefault();

    const searchData = {
      bloodGroup,
      district: selectedDistrict,
      upazila: selectedUpazila
    };

    console.log("Search Data:", searchData);
    // 🔥 future: API call here
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    recipientName: {},
    location: "",
    bloodGroup: "A+",
    date: "",
    time: "",
  });

  const handleView = (e) => {
    e.preventDefault();
    navigate(`/request-details`);
  };

  return (
     <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl text-center font-bold mb-4">Donation Request</h2>

      <form>
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user?.displayName || ""}
            onChange={handleChange}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div className="mb-3">
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-3">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <button
          onClick={handleView}
          className="btn btn-secondary mt-4 w-full"
        >
          View
        </button>
      </form>
    </div>
  );
};

export default DonationRequests;
