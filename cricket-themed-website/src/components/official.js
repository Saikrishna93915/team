import React from "react";

const official = ({ formData }) => {
  const { name, email, teamName, players } = formData; // Destructure formData
  const playersList = players.split(",").map((player, index) => (
    <li key={index}>{player.trim()}</li> // Trim whitespace for each player
  ));

  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url('/Finalpic.jpg')` }} // Update the path to your background image
    >
      <div className="container max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-purple-800">Welcome to the Official Page!</h1>
        <p className="mt-4 text-lg text-center">Your form has been successfully submitted.</p>

        <h2 className="text-2xl font-semibold mt-6">Team Details:</h2>
        <p><strong>Team Name:</strong> {teamName}</p>
        <p><strong>   Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <h3 className="text-xl font-semibold">Players:</h3>
        <ul className="list-disc pl-5">
          {playersList}
        </ul>
      </div>
    </div>
  );
};

export default official;
