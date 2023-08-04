import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate, NavLink } from "react-router-dom";

const PatientAppointments = () => {
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // Flag to control form visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newAppointmentFormData, setNewAppointmentFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    description: "",
  });
  const { appointments, addAppointment } = useContext(UserContext);
  const navigate = useNavigate();
  const { patientId } = useParams();

  const goBack = () => {
    navigate(`/patients`);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitNewAppointment = (e) => {
    e.preventDefault();

    addAppointment(patientId, {
      name: newAppointmentFormData.name,
      date: newAppointmentFormData.date,
      location: newAppointmentFormData.location,
      category: newAppointmentFormData.category,
      description: newAppointmentFormData.description,
    });

    setShowConfirmation(true);
    setShowAddForm(false);

    // Reset the form data after submission
    setNewAppointmentFormData({
      name: "",
      date: "",
      location: "",
      category: "",
      description: "",
    });

    // Reset the confirmation message after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000); // 5 seconds
  };

  const filteredAppointments = categorySearchQuery
    ? appointments.filter(
        (appointment) => appointment.category === categorySearchQuery
      )
    : appointments;

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
      {showAddForm ? (
        <form
          onSubmit={handleSubmitNewAppointment}
          className="appointment-form"
        >
          <label htmlFor="name">
            Appointment Name:
            <input
              type="text"
              id="name"
              value={newAppointmentFormData.name}
              onChange={(e) =>
                setNewAppointmentFormData({
                  ...newAppointmentFormData,
                  name: e.target.value,
                })
              }
            />
          </label>
          <label htmlFor="date">
            Date:
            <input
              type="date"
              id="date"
              value={newAppointmentFormData.date}
              onChange={(e) =>
                setNewAppointmentFormData({
                  ...newAppointmentFormData,
                  date: e.target.value,
                })
              }
            />
          </label>
          <label htmlFor="location">
            Location:
            <input
              type="text"
              id="location"
              value={newAppointmentFormData.location}
              onChange={(e) =>
                setNewAppointmentFormData({
                  ...newAppointmentFormData,
                  location: e.target.value,
                })
              }
            />
          </label>
          <label htmlFor="category">
            Category:
            <select
              id="category"
              value={newAppointmentFormData.category}
              onChange={(e) =>
                setNewAppointmentFormData({
                  ...newAppointmentFormData,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option value="msc">MSC</option>
              <option value="immunization">Immunization</option>
              <option value="mtm">MTM</option>
            </select>
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              value={newAppointmentFormData.description}
              onChange={(e) =>
                setNewAppointmentFormData({
                  ...newAppointmentFormData,
                  description: e.target.value,
                })
              }
            />
          </label>
          <button type="submit" style={submitButtonStyle}>
            Add Appointment
          </button>
        </form>
      ) : (
        <button className="add-appointment-button" onClick={toggleAddForm}>
          + New Appointment
        </button>
      )}
      {showConfirmation && <p>Appointment added successfully!</p>}
      <hr />
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

const submitButtonStyle = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "3px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default PatientAppointments;
