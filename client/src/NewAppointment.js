import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

const NewAppointment = ({ patientId, onCancel, submitButtonStyle }) => {
  const { addAppointment, contextErrors } = useContext(UserContext);
  const [newAppointmentFormData, setNewAppointmentFormData] = useState({
    name: "",
    date: "",
    location: "",
    category: "",
    description: "",
  });

  console.log({ patientId })


  const {name, category, location, date, description} = newAppointmentFormData

  const handleSubmitNewAppointment = (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      category,
      location,
      date,
      description,
    };

    console.log("Sending appointment data:", appointmentData);


    addAppointment(patientId, appointmentData)
      .then(() => {
            setNewAppointmentFormData({
              name: "",
              date: "",
              location: "",
              category: "",
              description: "",
            });
      })
      .catch((error) => {
        console.error("Failed to add appointment:", error);
      })
  };


  const handleChange = (e) => {
    const key = e.target.id;

    setNewAppointmentFormData({
      ...newAppointmentFormData,
      [key]: e.target.value,
    });
  };
    
const handleGetLocation = () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update the location input value with the obtained coordinates
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
      {contextErrors && (
        <div className="error-message">{contextErrors.message}</div>
      )}
      <form onSubmit={handleSubmitNewAppointment} className="appointment-form">
        <input
          type="text"
          id="name"
          placeholder="Name of appointment"
          value={name}
          onChange={handleChange}
        />
        <select
          id="category"
          value={category}
          onChange={handleChange}
        >
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
        <button type="button" onClick={onCancel} style={cancelButtonStyle}>
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

//--------------------------------
/*

1. Make it a controlled form -> input fields are the new dynamic value 
    synchronize state variable to what we see in input field 
    value={state}
    onChange={e => setState(e.target.value)}

2. Set up 'POST' request when form is submitted. Need submit handler and as always preventDefault().
    put together the data that needs to be sent to server(object). look at the data we have to put together the object 

3. Then, make a FETCH request and send the config object & in the body send over the stringified object we just put together in step 2. 

4. Determine where the new object (from response) needs to go in order to render new object to the array of objects. 



NewAppointment component is associated with the route `/patients/:patientId/appointments/new`. This is where you can create a new appointment.

/patients/:patientId/appointments/new: This route is for creating a new appointment for a specific patient, using the NewAppointment component.

addAppointment().then()
It seems that you are calling the addAppointment function and immediately resetting the newAppointmentFormData state to empty values. This might cause issues since the addAppointment function is asynchronous and relies on the data in newAppointmentFormData. The reset of newAppointmentFormData should ideally be done after the addAppointment operation is complete.
*/
