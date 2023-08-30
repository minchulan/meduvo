import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, useParams } from "react-router-dom";

const EditAppointmentForm = ({ appointment, onUpdate }) => {
  const [editedAppointment, setEditedAppointment] = useState({ ...appointment });
  const { setErrors } = useContext(UserContext);
  const navigate = useNavigate();
  const { patientId } = useParams();

  const handleInputChange = (e) => {
    setErrors([]);
    const key = e.target.id;
    setEditedAppointment({
      ...editedAppointment,
      [key]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setErrors([]);
    setEditedAppointment({
      ...editedAppointment,
      category: e.target.value,
    });
  };

  const handleSaveClick = () => {
    onUpdate(editedAppointment); // Pass the updated data to the parent component for handling
    navigate(`/patients/${patientId}`);
  };

  const handleCancelClick = () => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="edit-appointment-container">
      <h2>Edit Appointment</h2>
      <form className="edit-appointment-form">
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
        <button type="button" onClick={handleSaveClick}>
          Save Changes
        </button>
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

export default EditAppointmentForm;


/*
This component contains the form for editing appointment details 
The EditAppointment component handles input changes, saving changes, and canceling the edit. 
*/
