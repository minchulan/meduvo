import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user"; 
import EditPatient from "./EditPatient";
import AppointmentCard from "./AppointmentCard";

const PatientDetails = ({onDelete}) => {
  const [patient, setPatient] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const { updatePatient, setErrors } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //GET to '/patients/:id'
    fetch(`/patients/${id}`)
      .then((resp) => { 
        if (resp.ok) {
          resp.json().then(data => { 
            console.log(data)
            setPatient(data)
          })
        } else {
          resp.json().then(data => setErrors(data.errors))
        }
      });
  }, [id, setErrors]);

  const handleEditPatientClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setConfirmDelete(false);
  };

  const handlePatientUpdate = (updatedPatient) => {
    updatePatient(updatedPatient.id, updatedPatient)
      .then(() => {
        setPatient(updatedPatient);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
      });
  };

  const goBack = () => {
    navigate(`/patients`);
  };

  if (patient === null) {
    return <div>Loading patient details...</div>;
  }

  if (patient) {
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
            <button className="edit-button" onClick={handleEditPatientClick}>
              📝 Edit Patient
            </button>
            {confirmDelete ? (
              <div>
                <p>Are you sure you want to delete this patient?</p>
                <button
                  className="delete-confirm"
                  onClick={handleConfirmDelete}
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
              <button className="delete-button" onClick={handleDeleteClick}>
                🗑️ Delete
              </button>
            )}
            <hr />
            <h2>Appointment(s)</h2>
            <ul>
              {patient.appointments.map((appointment) => (
                <li key={appointment.id}>
                  <AppointmentCard appointment={appointment} />
                </li>
              ))}
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
      </div>
    );
  }

  return <div>Loading patient details...</div>;
};

export default PatientDetails;
