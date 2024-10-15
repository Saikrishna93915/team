import React, { useState } from "react";
import { motion } from "framer-motion";

const PersonalDetails = ({ nextStep, handleChange, formData }) => {
  const [emailError, setEmailError] = useState(""); // State for email error

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format regex
    return emailRegex.test(email);
  };

  const continueForm = (e) => {
    e.preventDefault();

    // Validate the email before proceeding
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // If email is valid, clear the error and proceed to the next step
    setEmailError("");
    nextStep();
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('/1page.jpg')` }} // Update with the correct path
    >
      <motion.div
        className="container max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
          Enter Your Personal Details
        </h2>

        <form className="space-y-6">
          {/* Name Input */}
          <label className="block text-xl font-semibold text-green-700">Name:</label>
          <input
            type="text"
            className="border-2 border-green-400 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-200 transition-transform transform focus:scale-105"
            placeholder="Enter your name"
            onChange={handleChange("name")}
            value={formData.name}
          />

          {/* Email Input */}
          <label className="block text-xl font-semibold text-green-700">Email:</label>
          <input
            type="email"
            className="border-2 border-green-400 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-green-200 transition-transform transform focus:scale-105"
            placeholder="Enter your email"
            onChange={handleChange("email")}
            value={formData.email}
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-2">{emailError}</p>
          )}

          {/* Next Button */}
          <button
            onClick={continueForm}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Next
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalDetails;
