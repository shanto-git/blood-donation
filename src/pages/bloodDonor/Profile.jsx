import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user?.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {
      setLoading(true);
      await axiosSecure.put(
        `/users/role/${user?.email}`,
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
          src={profile?.photoURL || "https://i.ibb.co/placeholder.png"}
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
            value={profile?.name || ""}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={profile?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={profile?.bloodGroup || "note found"}
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
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            value={profile?.role || "note found"}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">District</label>
          <input
            type="text"
            name="district"
            value={profile.district || "Not found"}
            onChange={handleChange}
            disabled={!isEdit}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={profile?.upazilas || "not found"}
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
