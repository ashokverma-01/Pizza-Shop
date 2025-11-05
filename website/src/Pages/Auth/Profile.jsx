import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { Camera, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowToast, Severity } from "../../utils/toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, wishlist = [], cart = [] } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Load user profile (safe for refresh)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        };

        // 3️⃣ Fetch profile from backend
        const { data } = await axios.get(
          "http://localhost:5000/api/users/profile",
          config
        );

        // 4️⃣ Merge token (important for persistence)
        const updatedUser = { ...data, token: currentUser.token };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 5️⃣ Set form data
        setUsername(data.username || "");
        setEmail(data.email || "");
        setImage(data.imageUrl || "");
      } catch (error) {
        localStorage.removeItem("user");
        navigate("/products");
      }
    };

    // Run only if user missing or incomplete
    if (!user || !user.username) {
      loadUser();
    }
  }, [user, setUser, navigate]);

  // ✅ Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      if (selectedFile) formData.append("image", selectedFile);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        config
      );

      setUser({ ...data, token: user.token }); // preserve old token manually
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, token: user.token })
      );

      ShowToast("Profile updated successfully!", Severity.SUCCESS);
    } catch (error) {
      ShowToast("Failed to update profile!", Severity.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Avatar rendering
  const renderAvatar = () =>
    image ? (
      <img
        src={image}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
      />
    ) : (
      <div className="w-32 h-32 rounded-full flex items-center justify-center bg-blue-600 text-white text-4xl font-bold border-2 border-gray-300 dark:border-gray-600">
        {username?.charAt(0).toUpperCase() || "U"}
      </div>
    );

  // ✅ Handle unauthorized user
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-200 text-lg">
          Please login to view your profile.
        </p>
      </div>
    );

  // ✅ UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 md:p-8 relative">
      <div className="flex justify-end mb-4 lg:mb-0 lg:absolute lg:top-4 lg:right-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl w-full max-w-5xl p-6 sm:p-8 flex flex-col lg:flex-row gap-6 mx-auto">
        {/* Left Side */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/2 p-6 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Profile
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4 ">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.username}
                className="w-32 h-32 rounded-full object-cover border-2  bg-blue-600 hover:bg-blue-700 mb-2"
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-white  bg-blue-600 hover:bg-blue-700  text-3xl font-bold text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 mb-2">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            Name: <span className="font-normal">{user.username}</span>
          </h3>

          {/* Email */}
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Email: <span className="font-normal">{user.email}</span>
          </p>

          {/* Wishlist */}
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-normal">{wishlist.length}</span>
          </p>

          {/* Cart */}
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <ShoppingCart className="w-5 h-5 text-blue-500" />
            <span className="font-normal">{cart.length}</span>
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 lg:w-1/2 p-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Update Profile
          </h2>

          <div className="relative w-32 h-32 mx-auto lg:mx-0">
            {renderAvatar()}
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer"
            >
              <Camera className="w-5 h-5" />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className={`w-full py-2 rounded-md font-semibold text-white transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
