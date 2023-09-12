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

const NewAppointmentForm = ({ submitButtonStyle, onAddAppointment }) => {
  const [patient, setPatient] = useState(null);
  const { patients, errors, setErrors } = useContext(UserContext);
  const [newAppointmentFormData, setNewAppointmentFormData] = useState(
    initialAppointmentState
  );
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
    console.log("Patient ID:", patientId)
    const appointmentData = {
      ...newAppointmentFormData,
      patient_id: patientId,
    };

    onAddAppointment(patientId, appointmentData);
    navigate(`/patients/${patientId}`)
  };

  const handleChange = (e) => {
    setErrors([]); // clear errors when user interacts with form
    const key = e.target.id;
    setNewAppointmentFormData({
      ...newAppointmentFormData,
      [key]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    navigate(`/patients/${patientId}`)
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setNewAppointmentFormData((prevData) => ({
            ...prevData,
            location: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setErrors([]); // Clear the errors immediately on focus
    }
  };

  ephemeralErrors();

  return (
    <div className="new-appointment-container">
      <br />
      <h2>New Appointment</h2>
      {errors && errors.length > 0 && (
        <div className="error-container">
          {errors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmitNewAppointment} className="appointment-form">
        <input
          type="text"
          id="name"
          placeholder="Name of appointment"
          value={name}
          onChange={handleChange}
          onFocus={() => setErrors([])} // Clear errors on focus
          autoComplete="off"
        />
        <select id="category" value={category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="MSC">MSC</option>
          <option value="Immunization">Immunization</option>
          <option value="MTM">MTM</option>
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
        <button onClick={handleGetLocation} style={getLocationButtonStyle}>
          📍 Get Location
        </button>
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
        <button type="submit" style={submitButtonStyle}>
          Add Appointment
        </button>
        <button type="button" onClick={handleCancelClick} style={cancelButtonStyle}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const cancelButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#333333",
  border: "none",
  borderRadius: "3px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  marginLeft: "10px",
};

const getLocationButtonStyle = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "3px",
  padding: "5px 10px",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.2s, color 0.2s",
};

export default NewAppointmentForm;

/*
When the NewAppointment form is submitted, make a POST request to '/patients/:id/appointments`, with an appointment object. 

After getting a response from the POST request, add the new appointment to the (specific) patient's list of appointments. Need to update this patient's object in the array of patients in global state. 

[patientObj1, patientObj2, patientObj3]

*/
