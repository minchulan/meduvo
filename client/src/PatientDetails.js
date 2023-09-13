import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import EditPatientForm from "./EditPatientForm";
import AppointmentCard from "./AppointmentCard";

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, deletePatient, updatePatient, errors, setErrors } = useContext(UserContext);

  useEffect(() => {
    if (patients && patients.length > 0) {
      const currentPatient = patients.find((p) => p.id === parseInt(id));
      setPatient(currentPatient);
    }
  }, [id, patients]);

  if (!patient) return <h2>Loading....</h2>;

  const handleDeletePatient = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeletePatient = () => {
    deletePatient(id);
    setConfirmDelete(false);
    navigate("/patients");
  };

  const handlePatientUpdate = (updatedPatient) => {
    updatePatient(updatedPatient.id, updatedPatient);
    setIsEditing(false);
    setPatient(updatedPatient);
  };

  const handleEditPatient = () => {
    setIsEditing(true);
  };

  const appointmentCards = patient.appointments.map((appointment) => (
    <AppointmentCard
      key={appointment.id}
      appointment={appointment}
      patient={patient}
    />
  ));

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  ephemeralErrors();

  const goBack = () => {
    navigate(`/patients`);
  };

  return (
    <div className="patient-details">
      {isEditing ? (
        <EditPatientForm
          patient={patient}
          onUpdate={handlePatientUpdate}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div>
          <h2>
            {patient.first_name} {patient.last_name}
          </h2>
          <h2>{patient.dob}</h2>
          <h3>Allergies: {patient.allergies}</h3>
          <h3>Email: {patient.email}</h3>
          <h3>Phone Number: {patient.phone}</h3>
          <h3>Address: {patient.address}</h3>
          <h3>Notes: {patient.notes}</h3>
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
          <br />
          <hr />
          {/* Render a unique list of provider emails / users who own the appointment associated with patient */}
          <h2>Providers:</h2>
          <ul>
            {patient.unique_provider_emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
          <br />
          <hr />
          {errors && errors.length > 0 && (
            <div className="error-container">{errors}</div>
          )}
          <h2>Appointment(s)</h2>
          <NavLink to={`/patients/${id}/appointments/new`}>
            ✚ New Appointment
          </NavLink>
          {appointmentCards}
        </div>
      )}
      <hr />
      <button className="go-back-button" onClick={goBack}>
        ◁ Go Back
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PatientDetails;
