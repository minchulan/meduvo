import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import EditAppointmentForm from "./EditAppointmentForm";

const AppointmentCard = ({ appointment }) => {
  const { currentUser, deleteAppointment, updateAppointment } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleAppointmentEditFlag = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleUpdatedAppointment = (updatedAppointmentData) => {
    updateAppointment(
      appointment.patient_id,
      appointment.id,
      updatedAppointmentData
    );
  };

  const handleDeleteAppointment = () => {
    deleteAppointment(appointment.id);
  };

  // Check if the current user is the owner of the appointment
  const isCurrentUser = appointment.user_id === currentUser.id;

  return (
    <article className="appointment-card">
      <div className="card-content">
        {isEditing ? (
          <EditAppointmentForm
            appointment={appointment}
            setIsEditing={setIsEditing}
            onUpdateAppointment={handleUpdatedAppointment}
          />
        ) : (
          <>
            <h2>{renderCategory(appointment.category)}</h2>
            <h3>{appointment.name}</h3>
            <time>Date: {appointment.date}</time>
            <p>Location: {appointment.location}</p>
            <p>Details: {appointment.description}</p>
          </>
        )}
        {/* Render edit & delete buttons if currentUser owns the appointment(s) */}
        {isCurrentUser ? (
          <div className="card-actions">
            <button className="edit-button" onClick={handleAppointmentEditFlag}>
              ✏️
            </button>
            <button className="delete-button" onClick={handleDeleteAppointment}>
              🗑️
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default AppointmentCard;