import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import EditPatient from "./EditPatient";
import AppointmentCard from "./AppointmentCard";

const PatientDetails = ({ onDelete }) => {
  const [patient, setPatient] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const { currentUser, setAppointments, updatePatient, updateAppointment, errors, setErrors } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //GET to '/patients/:id'
    fetch(`/patients/${id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log(data);
          setPatient(data);
          setAppointments(data.appointments);
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.errors); // Set errors using setErrors from UserContext
        });
      }
    });
  }, [id, setPatient, setAppointments, setErrors]);

  const handleEditPatient = () => {
    setIsEditing(true);
  };

  const handleDeletePatient = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeletePatient = () => {
    onDelete(id);
    setConfirmDelete(false);
  };

  const handlePatientUpdate = (updatedPatient) => {
    updatePatient(updatedPatient.id, updatedPatient)
    setIsEditing(false);
  };

  const handleAppointmentUpdate = (appointmentId, updatedData) => {
    updateAppointment(patient.id, appointmentId, updatedData)
    setIsEditing(false);
  };

  const handleAppointmentDelete = () => {

  };

  const goBack = () => {
    navigate(`/patients`);
  };

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setTimeout(() => {
        setErrors([]); // Clear the errors after 5 seconds
      }, 3000);
    }
  };

  ephemeralErrors();

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
              {patient.unique_provider_emails.length > 0 ? (
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
              {patient && patient.appointments ? (
                patient.appointments.map((appointment) => (
                  <li key={appointment.id}>
                    <AppointmentCard
                      appointment={appointment}
                      onDelete={handleAppointmentDelete}
                      onUpdate={handleAppointmentUpdate}
                    />
                  </li>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </ul>
            <br />
            <button
              className="small-button"
              onClick={() => navigate(`/patients/${id}/appointments/new`)}
            >
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
        {errors && errors.length > 0 && (
          <div className="error-container">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default PatientDetails;
