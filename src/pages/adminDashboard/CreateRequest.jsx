import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateRequest = () => {
  const { user } = useContext(AuthContext);
  const [recipientName, setRecipientName] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upozilas, setUpozilas] = useState([]);
  const [selectedUpozila, setSelectedUpozila] = useState("");
  const [filteredUpozilas, setFilteredUpozilas] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationTime, setDonationTime] = useState("");
  const [units, setUnits] = useState(1);
  const [hospital, setHospital] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/upozilas.json")
      .then((res) => res.json())
      .then((data) => setUpozilas(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedDistrict) return setFilteredUpozilas([]);

    const district = districts.find((d) => d.name === selectedDistrict);
    if (!district) return setFilteredUpozilas([]);

    const filtered = upozilas.filter((u) => u.district_id === district.id);
    setFilteredUpozilas(filtered);
  }, [selectedDistrict, districts, upozilas]);

  const axiosSecure = useAxiosSecure()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !recipientName ||
      !bloodGroup ||
      !units ||
      !selectedDistrict ||
      !selectedUpozila ||
      !address ||
      !hospital ||
      !notes
    ) {
      return setError("Please fill in all required fields");
    }

    try {
      setLoading(true);
      const response = await axiosSecure.post("/requests", {
        recipientName,
        requesterName: user?.displayName,
        requesterEmail: user?.email,
        bloodGroup,
        selectedDistrict,
        selectedUpozila,
        address,
        units,
        hospital,
        donationDate,
        donationTime,
        notes,
        status: "pending",
      });

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Donation request created successfully.",
          icon: "success",
          confirmButtonText: "Okay",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Donation Request</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="">Name</label>
          <input
            type="name"
            value={user?.displayName}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="">Email</label>
          <input
            type="name"
            value={user?.email}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="">Recipient Name</label>
          <input
            type="name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter Recipient Name"
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Donation Date</label>
            <input
              type="date"
              value={donationDate}
              onChange={(e) => setDonationDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Donation Time</label>
            <input
              type="time"
              value={donationTime}
              onChange={(e) => setDonationTime(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">District</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Upazila</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedUpozila}
            onChange={(e) => setSelectedUpozila(e.target.value)}
            disabled={!selectedDistrict}
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpozilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Units</label>
          <input
            type="number"
            min="1"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Hospital</label>
          <input
            type="text"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            placeholder="Enter Your Hospital Name"
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Full Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your Full Address"
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-outline btn-secondary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
