import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

const PatientCard = ({ patient }) => {
  const { deletePatient } = useContext(UserContext);
  const { id, first_name, last_name, dob } = patient;
  const navigate = useNavigate();

  console.log({id})

  const handleDeleteClick = () => {
    // Call the deletePatient function from the context to delete the patient
    deletePatient(id);
  };

  const handleAppointmentsClick = () => {
    // Navigate to the patient's appointments page
    navigate(`/patients/${id}/appointments`);
  };

  if (patient) {
    return (
      <div className="patient-card">
        {/* Use NavLink to navigate to the patient details page  */}
        <NavLink to={`/patients/${id}`} className="patient-link">
          <h3 className="patient-name">{first_name} {last_name}</h3>
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
        <br />
        <button
          className="appointment-button"
          onClick={handleAppointmentsClick}
        >
          View Appointments
        </button>
        <br />
        <br />
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

In the updated PatientCard, we use the NavLink component from react-router-dom to wrap the patient's full name, and the to prop of NavLink is set to the URL path for the patient details page with the patient's id parameter. Now, when you click on the patient's full name in the patient card, it will navigate to the patient details page.
*/
