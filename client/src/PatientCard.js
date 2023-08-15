import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";

const PatientCard = ({ patient }) => {
  const { deletePatient } = useContext(UserContext);
  const { id, first_name, last_name, dob } = patient;
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    deletePatient(id);
  };

  const handleAppointmentsClick = () => {
    navigate(`/patients/${id}/appointments`);
  };

  if (patient) {
    return (
      <div className="patient-card">
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
