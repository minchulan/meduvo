import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAppointment = ({ appointment, onUpdate }) => {
  const [editedAppointment, setEditedAppointment] = useState({
    ...appointment,
  });
  const navigate = useNavigate();
  const { patientId } = useParams();
  console.log({ patientId });

  const handleInputChange = (e) => {
    const key = e.target.id;
    setEditedAppointment({
      ...editedAppointment,
      [key]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setEditedAppointment({
      ...editedAppointment,
      category: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedAppointment);
    navigate(`/patients/${patientId}/appointments/${appointment.id}`);
  };

  const handleCancelClick = () => {
    navigate(`/patients/${patientId}/appointments`);
  };

  return (
    <div className="edit-appointment-container">
      <h2>Edit Appointment</h2>
      <form className="edit-appointment-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={editedAppointment.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">All Categories</option>
            <option value="mtm">MTM</option>
            <option value="msc">MSC</option>
            <option value="immunization">Immunization</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedAppointment.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={editedAppointment.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={editedAppointment.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={editedAppointment.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
        <button
          type="button"
          onClick={handleCancelClick}
          style={cancelButtonStyle}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const cancelButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#333333",
  border: "none",
  borderRadius: "3px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  marginLeft: "10px",
};

export default EditAppointment;
