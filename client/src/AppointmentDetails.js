import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";
import EditAppointment from "./EditAppointmentForm";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const foundAppointment = currentUser.appointments.find(
        (appointment) => appointment.id === parseInt(appointmentId)
      );
      setAppointment(foundAppointment);
    }
  }, [currentUser, appointmentId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!currentUser) {
    return <div>Loading user data...</div>;
  }

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  console.log({appointment})

  return (
    <div className="appointment-details-container">
      <h2>Appointment Details</h2>
      <div className="appointment-detail">
        {isEditing ? (
          <EditAppointment
            appointment={appointment}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p>Category: {appointment.category}</p>
            <p>Name: {appointment.name}</p>
            <p>Date: {appointment.date}</p>
            <p>Location: {appointment.location}</p>
            <p>Description: {appointment.description}</p>
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