import React, { useState } from "react";
import { motion } from "framer-motion";

const TeamDetails = ({ nextStep, prevStep, handleChange, formData }) => {
  const [playersError, setPlayersError] = useState(""); // State for player count error

  const continueForm = (e) => {
    e.preventDefault();

    // Split the player names by commas and trim whitespace
    const playersArray = formData.players.split(",").map(player => player.trim());

    // Check if the number of players is exactly 11
    if (playersArray.length !== 11) {
      setPlayersError("You must enter exactly 11 players.");
      return;
    }

    // Clear error and proceed to the next step
    setPlayersError("");
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('/2pagepic.jpg')` }} // Update with the correct path
    >
      <motion.div
        className="container max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Enter Your Team Details
        </h2>

        <form className="space-y-6">
          <label className="block text-xl font-semibold text-blue-700">Team Name:</label>
          <input
            type="text"
            className="border-2 border-blue-400 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition-transform transform focus:scale-105"
            placeholder="Enter team name"
            onChange={handleChange("teamName")}
            value={formData.teamName}
          />

          <label className="block text-xl font-semibold text-blue-700">Players (Comma Separated):</label>
          <input
            type="text"
            className="border-2 border-blue-400 p-3 w-full rounded-lg focus:outline-none focus:ring focus:ring-blue-200 transition-transform transform focus:scale-105"
            placeholder="Enter player names"
            onChange={handleChange("players")}
            value={formData.players}
          />
          {playersError && (
            <p className="text-red-600 text-sm mt-2">{playersError}</p>
          )}

          <div className="flex justify-between">
            <button
              onClick={back}
              className="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Back
            </button>
            <button
              onClick={continueForm}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeamDetails;
