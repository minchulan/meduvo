import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import NewAppointment from "./NewAppointment";

const PatientAppointments = ({ submitButtonStyle }) => {
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const { appointments, deleteAppointment } = useContext(UserContext);
  const { patientId } = useParams();
  const navigate = useNavigate();

  // Filtering appointments based on the selected category
  const filteredAppointments = categorySearchQuery
    ? appointments.filter(
        (appointment) => appointment.category === categorySearchQuery
      )
    : appointments;

  const handleDeleteClick = (appointmentId) => {
    deleteAppointment(patientId, appointmentId);
  };

  const toggleNewAppointmentForm = () => {
    setShowNewAppointmentForm((prev) => !prev);
  };

  const handleCancel = () => {
    setShowNewAppointmentForm(false);
  };

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
      <ul className="appointments-list">
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            <NavLink
              to={`/patients/${patientId}/appointments/${appointment.id}`}
            >
              {appointment.name}
            </NavLink>
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(appointment.id)}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button className="new-button" onClick={toggleNewAppointmentForm}>
        + New
      </button>
      <br />
      {showNewAppointmentForm && (
        <NewAppointment
          patientId={patientId}
          onCancel={handleCancel}
          submitButtonStyle={submitButtonStyle}
        />
      )}
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
      <br />
      <br />
    </div>
  );
};

export default PatientAppointments;

//----------------------------------
/*

PatientAppointments renders:
  - Appointment Details
  - New Appointment `/patients/60/appointments/new

PatientAppointments component is associated with the route `/patients/:patientId/appointments`. This is where you list the existing appointments for a patient.

/patients/:patientId/appointments: This route uses the PatientAppointments component to display appointments specific to a patient. It could show a list of appointments for a particular patient.
*/
