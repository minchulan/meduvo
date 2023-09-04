import React from "react";
import { NavLink } from "react-router-dom";


const PatientCard = ({ patient }) => {
  const { id, first_name, last_name, dob } = patient;

  if (patient) {
    return (
      <div className="patient-card">
        <NavLink to={`/patients/${id}`} className="patient-link">
          <h3 className="patient-name">
            {first_name} {last_name}
          </h3>
        </NavLink>
        <div className="patient-info">
          <strong>Date of Birth: </strong>
          {dob}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientCard;
