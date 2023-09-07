import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import EditAppointmentForm from "./EditAppointmentForm";

const AppointmentCard = ({ appointment, patient, setPatient }) => {
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

  // Handle setting the editing flag to true
  const handleAppointmentEditFlag = () => {
    setIsEditing((isEditing) => !isEditing); //toggle
  };

  // UPDATE APPOINTMENT
  const handleAppointmentUpdate = (updatedAppointment, patientId) => {
    updateAppointment(patientId, updatedAppointment.id, updatedAppointment).then(() => {
      setIsEditing(false);
      // Optionally, you can update the appointment in the state as well
      const updatedAppointments = patient.appointments.map((app) =>
        app.id === updatedAppointment.id ? updatedAppointment : app
      );
      setPatient((prevPatient) => ({
        ...prevPatient,
        appointments: updatedAppointments,
      }));
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

/*
 1) functional component called AppointmentCard. It takes three props as input: appointment, onDelete, and onUpdate.
2) accessing the current user over in UserContext. Use the useContext hook to access the `currentUser` from the `UserContext`. 
3) Initialized a state variable `isEditing` to false. Variable is used to determine whether the user is currently editing the appointment. 
4) Defined a function called `renderCategory`
    This function takes a `category` as input and returns a JSX element representing the category based on the switch statement. It's used to display the category of the appointment. 
5) Defined a function called `handleAppointmentEditFlag`, which sets `isEditing` to true when called. It handles the editing of appointments. 
6) I check to see if the current user is the owner of the appointment. If yes, display edit and delete buttons. If no, do not display anything. 
    This function returns JSX based on whether the current user is the owner of the appointment. If the user is the owner, it renders "Edit" and "Delete" buttons.
7) conditionally renders the appointment details or an editing form based on the value of isEditing. It also displays the category, name, date, location, and description of the appointment and the action buttons if the user is the owner.


  // const isAuthorized = currentUser.appointments.some(
  //   (userAppointment) => userAppointment.id === appointment.id
  // );
currentUser.appointments: This is an array of appointments belonging to the current user. Each appointment is an object with various properties, including an id.
some(...):  It's used to check if at least one element in the array satisfies a certain condition.

SOME - determines whether at least ONE item in an array meets SOME condition. 

Is the current user's appointment id equal to the appointment id ??
*/
