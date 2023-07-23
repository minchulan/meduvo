import React from "react";
import { NavLink } from "react-router-dom";

const PatientCard = ({ patient, onDeletePatient }) => {
  const { id, full_name } = patient;

  const deletePatient = () => {
    // Persist changes on server
    fetch(`/patients/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          onDeletePatient(id);
        } else {
          res.json().then((error) => {
            console.error("Error deleting patient:", error);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  const updatePatient = () => {
    // Persist changes on server
    fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( )
    })
    // Then use onUpdatePatient to update patient in state
  };

  if (patient) {
    return (
      <div className="patient-card">
        <NavLink to={`/patients/${id}`} className="patient-link">
          <h3 className="patient-name">
            {full_name}
          </h3>
        </NavLink>
        <div className="patient-actions">
          <button
            className="update-button"
            onClick={updatePatient}
          >
            ✏️ Update
          </button>
          <button
            className="delete-button"
            onClick={deletePatient}
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
