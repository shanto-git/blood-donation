import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import axios from "axios";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateUser({
        displayName: name,
        photoURL,
      });

      await axios.patch("http://localhost:5000/api/users/profile", {
        name,
        photoURL,
      });

      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white p-6 rounded shadow">

      {!edit && (
          <div className="space-y-4 flex flex-col items-center justify-center">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full"
          />
            <h2 className="text-xl font-bold mb-4">My Profile</h2>

          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <button
            onClick={() => setEdit(true)}
            className="btn btn-outline btn-primary"
          >
            Edit Profile
          </button>
        </div>
      )}
      {edit && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Photo URL</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEdit(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
