import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const { user } = useContext(UserContext);

  const deletePatient = (id) => {
    // Persist changes on server
    // Then use OnDeletePatient to remove patient from state
  };

  const updatePatient = () => {
    // Persist changes on server
    // Then use onUpdatePatient to update patient in state
  };

  if (patient) {
    return (
      <div className="patient-card">
        <Link to={`/patients/${patient.id}`} className="patient-link">
          <h3 className="patient-name">
            {patient.first_name} {patient.last_name}
          </h3>
        </Link>
        <div className="patient-actions">
          <button
            className="update-button"
            onClick={() => updatePatient(patient.id)}
          >
            ✏️ Update
          </button>
          <button
            className="delete-button"
            onClick={() => deletePatient(patient.id)}
          >
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
