import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";

const initialAppointmentState = {
  name: "",
  date: "",
  location: "",
  category: "",
  description: "",
};

const NewAppointmentForm = ({ onAddAppointment }) => {
  const [patient, setPatient] = useState(null);
  const { patients, errors, setErrors } = useContext(UserContext);
  const [newAppointmentFormData, setNewAppointmentFormData] = useState(initialAppointmentState);
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { name, category, location, date, description } =
    newAppointmentFormData;
  
  useEffect(() => {
    if (patients.length > 0) {
      const currentPatient = patients.find((patient) => (
        patient.id === parseInt((patientId))
      ))
      setPatient(currentPatient)
    }
  }, [patientId, patients]);

  const handleSubmitNewAppointment = (e) => {
    e.preventDefault();
    const appointmentData = {
      ...newAppointmentFormData,
      patient_id: patientId,
    };

    onAddAppointment(patientId, appointmentData);

    navigate(`/patients/${patientId}`)
  };

  const handleChange = (e) => {
    setErrors([]); 
    const key = e.target.id;
    setNewAppointmentFormData({
      ...newAppointmentFormData,
      [key]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    navigate(`/patients/${patientId}`)
  }

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setErrors([]);
    }
  };

  ephemeralErrors();

  return (
    <div className="new-appointment-container">
      <br />
      <h2>New Appointment ({patient && patient.full_name})</h2>
      {errors && errors.length > 0 && (
        <div className="error-container">
          <ul className="error-list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmitNewAppointment} className="appointment-form">
        <input
          type="text"
          id="name"
          placeholder="Name of appointment"
          value={name}
          onChange={handleChange}
          onFocus={() => setErrors([])}
          autoComplete="off"
        />
        <select id="category" value={category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="msc">MSC</option>
          <option value="Immunization">Immunization</option>
          <option value="mtm">MTM</option>
        </select>
        <input
          type="date"
          id="date"
          placeholder="Date"
          value={date}
          onChange={handleChange}
          onFocus={() => setErrors([])}
          autoComplete="off"
        />
        <input
          type="text"
          id="location"
          placeholder="Location"
          value={location}
          onChange={handleChange}
          onFocus={() => setErrors([])}
          autoComplete="off"
        />
        <br />
        <br />
        <textarea
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
          onFocus={() => setErrors([])}
          autoComplete="off"
        />
        <button type="submit">Add Appointment</button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="cancel-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewAppointmentForm;
