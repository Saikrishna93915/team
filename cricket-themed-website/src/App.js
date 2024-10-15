import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalDetails from "./components/PersonalDetails";
import TeamDetails from "./components/TeamDetails";
import Review from "./components/Review";
import Official from "./components/official"; // Ensure the import path is correct

function App() {
  const [step, setStep] = useState(1); // Controls the current step of the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamName: "",
    players: "",
  });

  // Go to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle field change
  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  return (
    <Router>
      <Routes>
        {/* Routes for form steps */}
        <Route
          path="/"
          element={
            step === 1 ? (
              <PersonalDetails nextStep={nextStep} handleChange={handleChange} formData={formData} />
            ) : step === 2 ? (
              <TeamDetails nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />
            ) : step === 3 ? (
              <Review formData={formData} prevStep={prevStep} />
            ) : (
              <Official formData={formData} /> // Pass formData to Official
            )
          }
        />
        {/* Route for official page */}
        <Route path="/official" element={<Official formData={formData} />} /> {/* Pass formData to Official */}
      </Routes>
    </Router>
  );
}

export default App;
