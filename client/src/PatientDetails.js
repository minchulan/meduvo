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
  }, [id, patients, setErrors]);

  if (!patient) return <h2>Loading....</h2>;

  const handleDeletePatient = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeletePatient = () => {
    deletePatient(id);
    setConfirmDelete(false);
    navigate("/patients"); // Redirect to the patients list after deletion
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
        setErrors([]); // Clear the errors after 5 seconds
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

export default PatientDetails;

// ADD APPOINTMENT LOGIC
/*
the PatientDetails component directly maps through the patient's appointments and renders the AppointmentCard component. This ensures that the AppointmentCard component receives the latest appointments, including the newly created ones.

App
 |--- PatientList
        |--- PatientCard
                |--- PatientDetails 
                        |--- AppointmentCard 
                                |---EditAppointmentForm
                        |--- NewAppointmentForm  : newAptObj ^ PatientCard
                        |--- EditPatientForm
*/
