import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import EditPatient from "./EditPatientForm";
import AppointmentCard from "./AppointmentCard";

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  const {
    currentUser,
    deletePatient,
    updatePatient,
    setAppointments,
    errors,
    setErrors,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    //GET to '/patients/:id'
    fetch(`/patients/${id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPatient(data);
          setAppointments(data.appointments);
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.errors);
          const timeoutId = setTimeout(() => {
            setErrors([]);
          }, 3000);

          // Cleanup function to clear the timeout when the component unmounts
          return () => clearTimeout(timeoutId);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setPatient, setAppointments, setErrors]);

  // DELETE PATIENT
  const handleDeletePatient = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeletePatient = () => {
    deletePatient(id);
    setConfirmDelete(false);
  };


  const handleEditPatient = () => {
    setIsEditing(true);
  };

  // UPDATE PATIENT 
  const handlePatientUpdate = (updatedPatient) => {
    updatePatient(updatedPatient.id, updatedPatient).then(() => {
      setIsEditing(false);

      // Pass the updated patient information to the PatientCard component
      if (patient.id === updatedPatient.id) {
        setPatient(updatedPatient);
      }
    });
  };

  // ADD APPOINTMENT => navigates to `NewAppointmentForm` component.
  const handleCreateAppointment = () => {
    navigate(`/patients/${id}/appointments/new`);
  };

  // DELETE APPOINTMENT
  const handleAppointmentDelete = () => {
    // render logic to delete appointment
  };

  // // UPDATE APPOINTMENT
  // const handleAppointmentUpdate = (updatedAppointment) => {
  //   // Call the updateAppointment function with the updated appointment
  //   updateAppointment(patient.id, updatedAppointment.id, updatedAppointment)
  // };


  const goBack = () => {
    navigate(`/patients`);
  };

  if (patient && currentUser) {
    return (
      <div className="patient-details">
        {isEditing ? (
          <EditPatient patient={patient} onUpdate={handlePatientUpdate} />
        ) : (
          <div>
            <h2>
              {patient.first_name} {patient.last_name}
            </h2>
            <h3>{patient.dob}</h3>
            <div className="patient-info">
              <strong>Phone: </strong>
              {patient.phone}
            </div>
            <div className="patient-info">
              <strong>Email: </strong>
              {patient.email}
            </div>
            <div className="patient-info">
              <strong>Guardian (if applicable): </strong>
              {patient.guardian}
            </div>
            <div className="patient-info">
              <strong>Allergies: </strong>
              {patient.allergies}
            </div>
            <div className="patient-info">
              <strong>Home Address: </strong>
              {patient.address}
            </div>
            <div className="patient-info">
              <strong>Language Preferences: </strong>
              {patient.language_preferences}
            </div>
            <div className="patient-info">
              <strong>Viewed Notice of Privacy Practices: </strong>
              {patient.viewed_notice_of_privacy_practices}
            </div>
            <div className="patient-info">
              <strong>Notes: </strong>
              {patient.notes}
            </div>
            <br />
            <ul>
              <b>Providers:</b>
              {patient.unique_provider_emails &&
              patient.unique_provider_emails.length > 0 ? (
                patient.unique_provider_emails.map((email) => (
                  <li key={email}>
                    <div>
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
            <br />
            <button className="edit-button" onClick={handleEditPatient}>
              📝 Edit Patient
            </button>
            {confirmDelete ? (
              <div>
                <p>Are you sure you want to delete this patient?</p>
                <button
                  className="delete-confirm"
                  onClick={handleConfirmDeletePatient}
                >
                  Confirm
                </button>
                <button
                  className="delete-cancel"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="delete-button" onClick={handleDeletePatient}>
                🗑️ Delete
              </button>
            )}
            <hr />

            <h2>Appointment(s)</h2>
            <ul>
              {currentUser && patient && patient.appointments ? (
                patient.appointments.map((appointment) => (
                  <li key={appointment.id}>
                    <AppointmentCard
                      appointment={appointment}
                      onDelete={handleAppointmentDelete}
                    />
                  </li>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </ul>
            <br />
            <button className="small-button" onClick={handleCreateAppointment}>
              Create Appointment
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
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default PatientDetails;


//--------------------------------
/*
setPatient(updatedPatient) is used to update the patient state in the PatientDetails component with the newly updated information. This change will trigger a re-render of the PatientCard component, and it will display the updated first name and last name.
*/
