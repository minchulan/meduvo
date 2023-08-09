import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAppointment = ({ appointment, onUpdate }) => {
    const [editedAppointment, setEditedAppointment] = useState(appointment);
    const navigate = useNavigate();
    const { patientId } = useParams();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAppointment((prevAppointment) => ({
        ...prevAppointment,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        await onUpdate(editedAppointment);
        } catch (error) {
        console.error("Error updating appointment:", error);
        }
    };
        
        const handleCancelClick = () => {
            navigate(`/patients/${patientId}/appointments`)
        
        };
    

  return (
    <div className="edit-appointment-container">
      <h2>Edit Appointment</h2>
      <form className="edit-appointment-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={editedAppointment.category}
            onChange={handleInputChange}
            required
          />
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
        <button type="button" onClick={handleCancelClick} style={cancelButtonStyle}>
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

//--------------------------------
/*
/appointments/:id/edit: This route, associated with the EditAppointment component, indicates that you have a dedicated route for editing an appointment. The :id parameter might represent the ID of the appointment being edited.

In the EditAppointment component, you would typically fetch the appointment data based on the :id parameter from the URL and present a form or interface for users to update the appointment details. This separation of concerns makes your codebase cleaner and more maintainable.
*/
