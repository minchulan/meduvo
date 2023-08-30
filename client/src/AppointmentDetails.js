import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";
import EditAppointment from "./EditAppointment";

const AppointmentDetails = ({ onDelete }) => {
  const { appointmentId } = useParams();
  const { currentUser, updateAppointment } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);


  const appointment = currentUser.appointments.find(
    (appointment) => appointment.id === parseInt(appointmentId)
  );

  const handleUpdateAppointment = (updatedData) => {
    updateAppointment(appointment.patient_id, appointment.id, updatedData)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update appointment:", error);
        // You might also set error state here to display an error message to the user
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  return (
    <div className="appointment-details-container">
      <h2>Appointment Details</h2>
      <div className="appointment-detail">
        {isEditing ? (
          <EditAppointment
            appointment={appointment}
            onUpdate={handleUpdateAppointment}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p>Category: {appointment.category}</p>
            <p>Name: {appointment.name}</p>
            <p>Date: {appointment.date}</p>
            <p>Location: {appointment.location}</p>
            <p>Description: {appointment.description}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(appointment.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <button className="go-back-button" onClick={handleGoBack}>
        ◁ Go Back
      </button>
    </div>
  );
};

export default AppointmentDetails;

/*
This component displays the details of an appointment and allows for editing
AppointmentDetails component fetches the appointment details based on the URL param, and then passes the appointment data to the EditAppointment component for editing. 

*/
