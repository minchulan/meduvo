import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useParams, NavLink, useNavigate } from "react-router-dom";

const PatientAppointments = () => {
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const { appointments } = useContext(UserContext);
  const { patientId } = useParams();
  const navigate = useNavigate();

  const filteredAppointments = categorySearchQuery
    ? appointments.filter(
        (appointment) => appointment.category === categorySearchQuery
      )
    : appointments;
  
  const goBack = () => {
    navigate(`/patients`);
  };

  return (
    <div className="patient-appointments-container">
      <h2>Patient Appointments</h2>
      <div>
        <label htmlFor="category-search">
          Search By Category:
          <select
            id="category-search"
            value={categorySearchQuery}
            onChange={(e) => setCategorySearchQuery(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="msc">MSC</option>
            <option value="immunization">Immunization</option>
            <option value="mtm">MTM</option>
          </select>
        </label>
        <hr />
      </div>
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            {/* Link to the appointment details page with the appointment ID */}
            <NavLink
              to={`/patients/${patientId}/appointments/${appointment.id}`}
            >
              {appointment.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <br />
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
      <br />
    </div>
  );
};

export default PatientAppointments;

//----------------------------------
/*
PatientAppointments component is associated with the route `/patients/:patientId/appointments`. This is where you list the existing appointments for a patient.

/patients/:patientId/appointments: This route uses the PatientAppointments component to display appointments specific to a patient. It could show a list of appointments for a particular patient.
*/
