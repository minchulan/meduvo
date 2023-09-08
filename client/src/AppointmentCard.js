import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import EditAppointmentForm from "./EditAppointmentForm";

const AppointmentCard = ({ appointment, patient, setPatient }) => {
  const { currentUser, appointments, setAppointments, deleteAppointment, updateAppointment } = useContext(UserContext);
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

  // UPDATE APPOINTMENT
  const handleAppointmentUpdate = (updatedAppointmentData, patientId) => {
    updateAppointment(patientId, updatedAppointmentData.id, updatedAppointmentData).then(() => {
      setIsEditing(false);
      const updatedAppointments = patient.appointments.map((appointment) => {
        if (appointment.id === updatedAppointmentData.id) {
          return updatedAppointmentData;
        } else {
          return appointment;
        }
      })
      setPatient((prevPatient) => ({ ...prevPatient, appointments: updatedAppointments }));
    });
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
            onUpdate={handleAppointmentUpdate}
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