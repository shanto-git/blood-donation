import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const { createUser, updateUser, loading, setLoading } =
    useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [filteredUpozilas, setFilteredUpozilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpozila, setSelectedUpozila] = useState("");
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

    const filtered = upozilas.filter(
      (u) => u.district_id === district.id
    );
    setFilteredUpozilas(filtered);
  }, [selectedDistrict, districts, upozilas]);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain 1 uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain 1 lowercase letter.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !selectedDistrict ||
      !selectedUpozila
    ) {
      return setError("Please fill in all required fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    const passwordError = validatePassword(password);
    if (passwordError) return setError(passwordError);

    try {
      setLoading(true);

      let photoURL = "https://i.ibb.co/placeholder.png";

      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=6aa971fc0d78649e808a57aad4ed26aa`,
          formData
        );

        photoURL = res.data.data.display_url;
      }

      await createUser(email, password);

      await updateUser({
        displayName: name,
        photoURL,
      });

      await axios.post(`http://localhost:5000/users`, {
        name,
        email,
        photoURL,
        district: selectedDistrict,
        upazilas: selectedUpozila,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Now
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">District</label>
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
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Upazila</label>
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
        <div className="mb-3">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-block btn-outline btn-secondary font-bold hover:text-white"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
