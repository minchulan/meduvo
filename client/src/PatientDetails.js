import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import EditPatientForm from "./EditPatientForm";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentForm from "./NewAppointmentForm";

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [creatingAppointment, setCreatingAppointment] = useState(false);

  const { id } = useParams();

  const { currentUser, deletePatient, updatePatient, patients } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedPatient = patients.find((p) => p.id == id);

    if (selectedPatient) {
      setPatient(selectedPatient);
    }
  }, [patients, id]);

  if (!patient) {
    return <h2>Loading...</h2>;
  }

  const handleDeletePatient = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDeletePatient = () => {
    deletePatient(id);
    setConfirmDelete(false);
  };

  const handlePatientUpdate = (updatedPatient) => {
    updatePatient(updatedPatient.id, updatedPatient).then(() => {
      setIsEditing(false);
      setPatient(updatedPatient);
    });
  };

  const handleEditPatient = () => {
    setIsEditing(true);
  };

  const handleCreateAppointment = () => {
    setCreatingAppointment(true);
  };

  const addNewAppointment = (newAppointment) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      appointments: [...prevPatient.appointments, newAppointment],
    }));
  };

  const handleAppointmentDelete = () => {

  };

  const goBack = () => {
    navigate(`/patients`);
  };

  if (!patient) {
    return <h2>Loading....</h2>;
  }

  if (patient && currentUser) {
    return (
      <div className="patient-details">
        {isEditing ? (
          <EditPatientForm patient={patient} onUpdate={handlePatientUpdate} />
        ) : (
          <div>
            <h2>
              {patient.first_name} {patient.last_name}
            </h2>
            <h3>{patient.dob}</h3>
            {/* ... (patient details) */}
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
              {patient &&
              patient.appointments &&
              patient.appointments.length > 0 ? (
                patient.appointments.map((appointment) => (
                  <li key={appointment.id}>
                    <AppointmentCard
                      appointment={appointment}
                      onDelete={handleAppointmentDelete}
                      patient={patient}
                      setPatient={setPatient}
                    />
                  </li>
                ))
              ) : (
                <p>No appointments available.</p>
              )}
            </ul>
            <br />
            {creatingAppointment ? (
              <NewAppointmentForm addNewAppointment={addNewAppointment} />
            ) : (
              <div>
                <button
                  className="small-button"
                  onClick={handleCreateAppointment}
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
