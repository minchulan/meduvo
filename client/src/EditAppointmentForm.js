import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";

const EditAppointmentForm = ({ appointment, setIsEditing }) => {
  // Create a state variable to hold the edited appointment data
  const [editedAppointment, setEditedAppointment] = useState(appointment);
  const { updateAppointment } = useContext(UserContext);

  // Use useEffect to update the editedAppointment state when the appointment prop changes
  useEffect(() => {
    setEditedAppointment(appointment);
  }, [appointment]);

  const handleInputChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;

    // Update the editedAppointment state with the changed value
    setEditedAppointment({
      ...editedAppointment,
      [key]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    // Update the editedAppointment state with the changed category
    setEditedAppointment({
      ...editedAppointment,
      category,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the updateAppointment function over in UserContext with the updated data
    updateAppointment(
      editedAppointment.patientId,
      editedAppointment.id,
      editedAppointment
    ).then((data) => {
      // Handle success
      setIsEditing(false);
    });
  };

  return (
    <div className="edit-appointment-container">
      <h2>Edit Appointment</h2>
      <form className="edit-appointment-form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={editedAppointment.category}
            onChange={handleCategoryChange}
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
            required
          />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default EditAppointmentForm;

/*
This component contains the form for editing appointment details 
The EditAppointment component handles input changes, saving changes, and canceling the edit. 
    // Format the date as 'mm/dd/yyyy' before sending it to the server
    // const formattedDate = editedAppointment.date.split("-").reverse().join("/");
    // const updatedAppointment = { ...editedAppointment, date: formattedDate };
    // const updatedAppointment = { ...editedAppointment };

*/
