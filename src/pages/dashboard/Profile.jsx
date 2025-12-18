import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/profile/${user._id}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);


  const handleChange = (e) => {
    setProfile({ ...user, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => { 
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/users/profile/${user._id}`,
        profile
      );
      setIsEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">

        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="btn btn-outline btn-secondary"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        )}
      </div>
      <div className="flex justify-center mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/placeholder.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full border"
        />
      </div>
      <h2 className="text-2xl text-center font-bold">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user?.displayName || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (NOT editable) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={user.bloodGroup || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            value={user?.role || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
            value={user.district || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={user?.upazilas || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
