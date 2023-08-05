import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";

const NewAppointment = () => {
    const { addAppointment } = useContext(UserContext);
    const [newAppointmentFormData, setNewAppointmentFormData] = useState({
        name: "",
        date: "",
        location: "",
        category: "",
        description: "",
    });

    const handleSubmitNewAppointment = (e) => {
        e.preventDefault();

        // Code for adding a new appointment
        addAppointment({

        });
    
      
    };
    
    return (
        <div className="new-appointment-container">
            <h2>New Appointment</h2>
            <form onSubmit={handleSubmitNewAppointment}
                className="appointment-form">
                {/* Your form inputs */}
                <button type="submit" style={submitButtonStyle}>
                    Add Appointment
                </button>
            </form>
        </div> 
    );  
};

const submitButtonStyle = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "3px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default NewAppointment;

//--------------------------------
/*
NewAppointment component is associated with the route `/patients/:patientId/appointments/new`. This is where you can create a new appointment.

/patients/:patientId/appointments/new: This route is for creating a new appointment for a specific patient, using the NewAppointment component.
*/
