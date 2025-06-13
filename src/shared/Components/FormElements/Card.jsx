import React from "react";

const Card = ({ children, className, style }) => {
  return (
    <div
      className={`card ${className || ""}`}
      style={{

        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "900px",
        margin: " ",

        
        ...style, // Allow custom styles
      }}
    >

      {children}
    </div>
  );
};

export default Card;