import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user"; 
import EditAppointment from "./EditAppointment";

function AppointmentDetails({ appointment: app, patient }) {
  const { appointmentId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, setErrors } = useContext(UserContext);
  const [appointment, setAppointment] = useState([]);
  const navigate = useNavigate();

  console.log("Patient's appointments:", patient.appointments);
  console.log("Patient info:", patient);

  useEffect(() => {
    // Make sure patient and appointments data are available
    if (patient && patient.appointments && appointmentId) {
      const appointmentToShow = patient.appointments.find(
        (appointment) => appointment.id === Number(appointmentId)
      );

      if (appointmentToShow) {
        setAppointment(appointmentToShow);
      } else {
        setAppointment(null);
      }
    }
  }, [patient, appointmentId]);

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const handleAppointmentUpdate = (updatedAppointment) => {
  //   updateAppointment(
  //     Number(appointment.patient_id),
  //     Number(appointment.id),
  //     updatedAppointment
  //   )
  //     .then((updated) => {
  //       setAppointment(updated);
  //       setIsEditing(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating appointment:", error);
  //     });
  // };
  // ADD NEW APPOINTMENT
  const handleCreateAppointment = () => {
    fetch(`/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_id: patient.id, user_id: currentUser.id }),
    }).then((res) => {
      if (res.ok) {
        navigate("/me");
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  return (
    <div>
      <h2>Appointment Details</h2>
      {isEditing ? (
        <EditAppointment appointment={appointment} />
      ) : (
        <div>
          <p>{appointment.category}</p>
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
          <button className="edit-button" onClick={handleCreateAppointment}>
            🗓️ Create Appointment
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentDetails;