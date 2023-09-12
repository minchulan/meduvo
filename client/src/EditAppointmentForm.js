import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";


const EditAppointmentForm = ({ setIsEditing, appointment, onUpdateAppointment }) => {
  const [editedAppointment, setEditedAppointment] = useState(appointment);

  const { errors } = useContext(UserContext);

  const handleInputChange = (e) => {
    const key = e.target.id;
    let value = e.target.value;

    setEditedAppointment({
      ...editedAppointment,
      [key]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setEditedAppointment({
      ...editedAppointment,
      category,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedAppointmentObj = {
      id: appointment.id,
      ...editedAppointment,
    };

    onUpdateAppointment(updatedAppointmentObj)

    setIsEditing(false);
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
appointments#update
With the EditAppointmentForm, make a PATCH request to '/patients/:patient_id/appointment/:id'

Once you have successfully saved the edited appointment on the server, find a way to update the appointment in the application as well. You should also change the AppointmentCard component state to leave 'editing' mode.

*/