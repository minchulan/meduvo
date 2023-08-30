import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import EditAppointment from "./EditAppointment";

const AppointmentCard = ({ appointment, onDelete, onUpdate }) => {
  const { currentUser, updateAppointment } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const { patient_id } = appointment;

  const handleAppointmentEditFlag = () => {
    setIsEditing(true);
    const updatedData = {
      ...appointment,
    };
    updateAppointment(patient_id, appointment.id, updatedData).then(() => {
      setIsEditing(false);
    })
  };

  const isAuthorized = currentUser.appointments.some(
    (userAppointment) => userAppointment.id === appointment.id
  );

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

  const renderActions = () => {
    if (isAuthorized) {
      return (
        <div className="card-actions">
          <button className="edit-button" onClick={handleAppointmentEditFlag}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => onDelete(appointment.id)}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <article className="appointment-card">
      <div className="card-content">
        {isEditing ? (
          <EditAppointment appointment={appointment} onUpdate={onUpdate} />
        ) : (
          <>
            <h2>{renderCategory(appointment.category)}</h2>
            <h3>{appointment.name}</h3>
            <time>Date: {appointment.date}</time>
            <p>Location: {appointment.location}</p>
            <p>Details: {appointment.description}</p>
            {renderActions()}
          </>
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
