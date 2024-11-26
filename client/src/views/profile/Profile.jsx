import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileLogic } from "../../components/profile/ProfileLogic";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import Footer from "../../components/general/Footer";

const Profile = () => {
  const { user, loading, error, editing, setEditing, updateUserProfile } =
    useProfileLogic();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && editing) {
      setFormData({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        password: "",
      });
    }
  }, [user, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (!formData.password) {
      delete updatedData.password;
    }

    const success = await updateUserProfile(updatedData);
    setEditing(false);

    if (success) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="text-center text-green-300 py-4">Loading...</div>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="text-center text-red-500 py-4 bg-blue-500">
              Error: {error}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <button
        className="absolute top-4 left-4 flex items-center text-green-400 hover:text-green-300 transition"
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Return Home
      </button>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
            User Profile
          </h1>

          {user ? (
            <>
              {!editing ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-4">
                    <p className="text-lg text-purple-300">
                      <strong className="font-semibold text-green-400">
                        Name:
                      </strong>{" "}
                      {user.firstName}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-lg text-purple-300">
                      <strong className="font-semibold text-green-400">
                        Username:
                      </strong>{" "}
                      {user.lastName}
                    </p>
                  </div>
                  <div className="mb-4">
                    {" "}
                    <p className="text-lg text-purple-300">
                      <strong className="font-semibold text-green-400">
                        Email:
                      </strong>{" "}
                      {user.email}
                    </p>
                  </div>
                  <div className="mb-4">
                    {" "}
                    <p className="text-lg text-purple-300">
                      <strong className="font-semibold text-green-400">
                        Password:
                      </strong>{" "}
                      ********
                    </p>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="mx-auto block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 w-32"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-lg font-semibold mb-2 text-green-400">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2 text-green-400">
                      Surname:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2 text-green-400">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-700 rounded-md bg-gray-700 text-green-300"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-lg font-semibold mb-2 text-green-400">
                      New Password (Optional):
                    </label>
                    <div className="flex items-center border border-gray-700 rounded-md bg-gray-700">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="w-full p-3 text-green-300 bg-transparent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="p-3 text-gray-400 hover:text-gray-300 transition"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center gap-6 mt-4">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 w-32"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 w-32"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="text-red-500">User not found</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
