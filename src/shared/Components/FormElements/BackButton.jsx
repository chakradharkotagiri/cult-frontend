import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button
      className={className}
      onClick={handleBack}
      style={{ padding: "8px 16px" }}
    >
      ← Back
    </button>
  );
};

export default BackButton;
