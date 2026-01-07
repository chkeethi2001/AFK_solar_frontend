import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  /* ------------------- LOAD USER FROM LOCALSTORAGE ------------------- */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);

      setPreview(
        storedUser.avatar
          ? `https://afk-solar-backend-5.onrender.com/uploads/${storedUser.avatar}`
          : null
      );
    }
  }, []);

  /* ------------------- HANDLE AVATAR SELECT ------------------- */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ------------------- UPDATE AVATAR ------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !storedUser.id) {
      toast.error("User ID missing. Please login again.");
      return;
    }

    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await axios.put(
        `https://afk-solar-backend-5.onrender.com/api/update/${storedUser.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Avatar updated!");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">

        <h2 className="text-2xl font-bold text-center text-[#004225] mb-4">
          My Profile
        </h2>

        {/* Avatar Upload */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">

          </div>

         
        </form>

        {/* Read-only Details */}
        <div className="space-y-3">

          <div>
            <p className="font-semibold text-gray-700">First Name</p>
            <p className="bg-gray-200 p-2 rounded">{user.firstName}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Last Name</p>
            <p className="bg-gray-200 p-2 rounded">{user.lastName}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Mobile Number</p>
            <p className="bg-gray-200 p-2 rounded">{user.mobile}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Email</p>
            <p className="bg-gray-200 p-2 rounded">{user.email}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
