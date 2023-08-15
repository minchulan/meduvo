import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import EditAppointment from "./EditAppointment";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const { appointments, updateAppointment } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const appointmentToShow = appointments.find(
      (appointment) => appointment.id === Number(appointmentId)
    );

    if (appointmentToShow) {
      setAppointment(appointmentToShow);
    } else {
      setAppointment(null);
    }
  }, [appointmentId, appointments]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAppointmentUpdate = (updatedAppointment) => {
    updateAppointment(
      Number(appointment.patient_id),
      Number(appointment.id),
      updatedAppointment
    )
      .then((updated) => {
        setAppointment(updated);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };



  const goBack = () => {
    navigate(`/patients`);
  };

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  const categoryClass = `category-${appointment.category.toLowerCase()}`;

  return (
    <div>
      <h2>Appointment Details</h2>
      {isEditing ? (
        <EditAppointment
          appointment={appointment}
          onUpdate={handleAppointmentUpdate}
        />
      ) : (
        <div>
          <p className={categoryClass}>{appointment.category}</p>
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

          <br />
          <button className="edit-button" onClick={handleEditClick}>
            📝 Edit
          </button>
          <hr />
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
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;