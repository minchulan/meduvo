import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, useParams } from "react-router-dom";

const initialAppointmentState = {
  name: "",
  date: "",
  location: "",
  category: "",
  description: "",
};

const NewAppointment = ({ submitButtonStyle }) => {
  const { addAppointment } = useContext(UserContext);
  const [newAppointmentFormData, setNewAppointmentFormData] = useState(
    initialAppointmentState
  );

  const { patientId } = useParams();
  console.log(patientId);

  const { name, category, location, date, description } =
    newAppointmentFormData;

  const navigate = useNavigate();

  const handleSubmitNewAppointment = (e) => {
    e.preventDefault();
    const appointmentData = {...newAppointmentFormData};

    addAppointment(patientId, appointmentData);
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setNewAppointmentFormData({
      ...newAppointmentFormData,
      [key]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    navigate(`/patients/${patientId}`);
  };

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

  return (
    <div className="new-appointment-container">
      <br />
      <h2>New Appointment</h2>
      <form onSubmit={handleSubmitNewAppointment} className="appointment-form">
        {/* Remove this hidden input, it's not needed */}
        {/* <input type="hidden" name="appointment[patient_id]" value={patientId} /> */}

        <input
          type="text"
          id="name"
          placeholder="Name of appointment"
          value={name}
          onChange={handleChange}
        />
        <select id="category" value={category} onChange={handleChange}>
          <option value="disabled"> All Categories</option>
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
        />
        <input
          type="text"
          id="location"
          placeholder="Location"
          value={location}
          onChange={handleChange}
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
        />
        <button type="submit" style={submitButtonStyle}>
          Add Appointment
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          style={cancelButtonStyle}
        >
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

export default NewAppointment;
