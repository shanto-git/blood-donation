// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../auth/AuthProvider";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateRequest = () => {
//   const { user } = useContext(AuthContext);
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [units, setUnits] = useState(1);
//   const [hospital, setHospital] = useState("");
//   const [notes, setNotes] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!bloodGroup || !units || !hospital) {
//       return setError("Please fill in all required fields");
//     }

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5000/api/donations", {
//         donorEmail: user.email,
//         bloodGroup,
//         units,
//         hospital,
//         notes,
//         status: "pending", // default status
//       });

//       navigate("/dashboard/my-requests");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Create Donation Request</h2>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Blood Group</label>
//           <select
//             value={bloodGroup}
//             onChange={(e) => setBloodGroup(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">Select Blood Group</option>
//             {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//               <option key={bg} value={bg}>
//                 {bg}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1">Units</label>
//           <input
//             type="number"
//             min="1"
//             value={units}
//             onChange={(e) => setUnits(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Hospital</label>
//           <input
//             type="text"
//             value={hospital}
//             onChange={(e) => setHospital(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Notes</label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full border p-2 rounded"
//             rows="3"
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-outline btn-secondary w-full"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Create Request"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateRequest;
