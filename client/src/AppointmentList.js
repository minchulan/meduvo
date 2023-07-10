import React from 'react';
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
    const navigate = useNavigate();

    const goBack = () => {
    navigate(-1); // Navigate back to the previous page
    };

    return (
      <div>
        <h2>AppointmentList</h2>
        <hr />
        <br />
        <button
          className="go-back-button"
          onClick={goBack}
          style={{
            backgroundColor: "#ffffff",
            color: "#333333",
            border: "1px solid #cccccc",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ◁ Go Back
        </button>
      </div>
    );
}

export default AppointmentList