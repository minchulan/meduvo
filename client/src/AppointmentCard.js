import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

const AppointmentCard = ({ appointment, onDelete, onUpdate }) => {
  const { currentUser, updateAppointment } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({
    // Initialize the form fields with existing data
    name: appointment.name,
    date: appointment.date,
    location: appointment.location,
    // ... add other fields as needed
  });

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateAppointment = () => {
    const updatedData = {
      ...appointment,
      ...editedAppointment,
    };
    updateAppointment(appointment.id, updatedData).then(() => {
      setIsEditing(false);
    });
  };

  // Check if the current user is authorized to edit/delete this appointment
  const isAuthorized = currentUser.appointments.some(
    (userAppointment) => userAppointment.id === appointment.id
  );

  console.log("isAuthorized:", isAuthorized)

  const renderCategory = (category) => {
    switch (category) {
      case "mtm":
        return <span className="category-mtm">MTM</span>;
      case "msc":
        return <span className="category-msc">MSC</span>;
      case "immunization":
        return <span className="category-immunization">Immunization</span>;
      default:
        return <span className="category-common">{category}</span>;
    }
  };

  return (
    <article className="appointment-card">
      <div className="card-content">
        <h2>{renderCategory(appointment.category)}</h2>
        <h3>{appointment.name}</h3>
        <time>Date: {appointment.date}</time>
        <p>Location: {appointment.location}</p>
        <p>Details: {appointment.description}</p>

        {isAuthorized && (
          <div className="card-actions">
            <button
              className="edit-button"
              onClick={handleUpdateAppointment}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(appointment.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default AppointmentCard;

/*
currentUser.appointments: This is an array of appointments belonging to the current user. Each appointment is an object with various properties, including an id.
some(...):  It's used to check if at least one element in the array satisfies a certain condition.

SOME - determines whether at least ONE item in an array meets SOME condition. 

Is the current user's appointment id equal to the appointment id ??
*/