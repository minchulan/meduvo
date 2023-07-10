import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

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

  if (patient) {
    return (
      <div className="patient-details">
        <h2>Patient Details</h2>
        <div className="patient-info">
          <strong>Name: </strong>
          {patient.first_name} {patient.last_name}
        </div>
        <div className="patient-info">
          <strong>Date of Birth: </strong>
          {patient.dob}
        </div>
        <div className="patient-info">
          <strong>Gender: </strong>
          {patient.gender}
        </div>
        <div className="patient-info">
          <strong>Phone: </strong>
          {patient.phone}
        </div>
        <div className="patient-info">
          <strong>Email: </strong>
          {patient.email}
        </div>
        <div className="patient-info">
          <strong>Guardian: </strong>
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
        {/* Render additional patient details */}
      </div>
    );
  }

  return <div>Loading patient details...</div>;
};

export default PatientDetails;
