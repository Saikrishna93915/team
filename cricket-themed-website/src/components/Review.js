import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Review = ({ formData, prevStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const submitForm = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post("http://localhost:5000/submit-form", formData);
      if (response.status === 200) {
        alert("Form Submitted Successfully!");
        // Redirect to the official page after successful submission
        navigate("/official"); // Change "/official" to the correct route for your Official page
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('/3_1.jpg')` }}
    >
      <div className="container max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
          Review Your Details
        </h2>

        <ul className="text-lg space-y-4">
          <li><strong>Name:</strong> {formData.name}</li>
          <li><strong>Email:</strong> {formData.email}</li>
          <li><strong>Team Name:</strong> {formData.teamName}</li>
          <li><strong>Players:</strong> {formData.players}</li>
        </ul>

        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}

        <div className="flex justify-between mt-6">
          <button
            onClick={back}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
            onClick={submitForm}
            disabled={loading}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
