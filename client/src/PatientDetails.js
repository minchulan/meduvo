import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import EditPatient from "./EditPatient";

const PatientDetails = () => {
  const { id } = useParams();
  const { updatePatient } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
      })
      .catch((error) => {
        console.error("Error retrieving patient details:", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handlePatientUpdate = (updatedPatient) => {
    // Call the updatePatient function from the parent component or context to update the patient on the server
    updatePatient(updatedPatient);
    console.log(updatedPatient);
  };

  const goBack = () => {
    navigate(`/patients`);
  };

  if (patient) {
    return (
      <div className="patient-details">
        {isEditing ? (
          // /* Pass the onUpdate prop to the EditPatient component */
          <EditPatient
            patient={patient}
            setPatient={setPatient}
            onUpdate={handlePatientUpdate}
          />
        ) : (
          <div>
            <h2>{patient.full_name}</h2>
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