import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user";


const PatientCard = ({ patient }) => {
  const { deletePatient } = useContext(UserContext);
  const { id, full_name, dob } = patient;

  const handleDeleteClick = () => {
    // Call the deletePatient function from the context to delete the patient
    deletePatient(id);
  };

  if (patient) {
    return (
      <div className="patient-card">
        <NavLink to={`/patients/${id}`} className="patient-link">
          <h3 className="patient-name">{full_name}</h3>
        </NavLink>
        <div className="patient-info">
          <strong>Date of Birth: </strong>
          {dob}
        </div>
        <div className="actions">
          <button className="delete-button" onClick={handleDeleteClick}>
            🗑️ Delete
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PatientCard;

//-----------
/*
PatientCard is where we will handle updates and deletes to our patients.

*/
