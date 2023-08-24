import React, { useContext } from "react";
import { UserContext } from "./context/user"; 
import { useParams, useNavigate } from "react-router-dom";

const AppointmentDetails = ({ onUpdate, onDelete }) => {
  const { appointmentId } = useParams();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Find the appointment object based on the appointmentId
  const appointment = currentUser.appointments.find(
    (appointment) => appointment.id === parseInt(appointmentId)
  );

    const goBack = () => {
      navigate(-1);
    };

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  console.log(appointment)

  return (
    <div>
      <h2>Appointment Details</h2>
      <p>
        <b>Category:</b> {appointment.category}
      </p>
      <p>
        <b>Name:</b> {appointment.name}
      </p>
      <p>
        <b>Date:</b> {appointment.date}
      </p>
      <p>
        <b>Location:</b> {appointment.location}
      </p>
      <p>
        <b>Description:</b> {appointment.description}
      </p>
      <button className="edit-button" onClick={() => onUpdate(appointment.id)}>
        Edit
      </button>
      <button
        className="delete-button"
        onClick={() => onDelete(appointment.id)}
      >
        Delete
      </button>
      <br />
      <hr />
      <br />
      <button
        className="go-back-button"
        onClick={goBack}
        style={{
          backgroundColor: "#ffffff",
          color: "#333333",
          border: "1px solid #cccccc",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ◁ Go Back
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AppointmentDetails;
