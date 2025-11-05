import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { ShowToast, Severity } from "../../utils/toast";
import axiosInstance from "../../utils/axiosUrl";

const Contact = () => {
  const { user } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";
      let body = {};

      if (user) {
        url = "/api/users/contact";
        body = { message: formData.message };
      } else {
        url = "/api/contact";
        body = {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        };
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(user && { Authorization: `Bearer ${user.token}` }),
        },
      };

      await axiosInstance.post(url, body, config);
      setFormData({ name: "", email: "", message: "" });
      ShowToast("Contact successfully", Severity.SUCCESS);
    } catch (err) {
      ShowToast("Contact error", Severity.ERROR);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8 ">
      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center pt-10 mb-10 text-gray-800 dark:text-white">
        Contact <span className="text-blue-600">Us</span>
      </h1>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col md:flex-row items-stretch justify-center gap-10 px-4 sm:px-8 pb-10"
      >
        {/* Left Image */}
        <div className="w-full md:w-1/2 h-[550px]">
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
            alt="Contact Us"
            className="w-full h-full object-cover rounded-lg shadow-md dark:shadow-gray-700"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 h-[550px] bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 p-6 sm:p-10 flex flex-col justify-center transition-colors duration-300">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center md:text-left">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 text-center md:text-left">
            Have any questions or feedback? Fill out the form below and we’ll
            get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <label className="flex flex-col">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={user?.username || formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={!!user}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Email */}
            <label className="flex flex-col">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={user?.email || formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                disabled={!!user}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Message */}
            <label className="flex flex-col">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-1">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
