import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

const EditPatient = ({ patient, onUpdate }) => {
  const { setErrors } = useContext(UserContext);

  // Format DOB to "YYYY-MM-DD"
  const formattedDOB = patient.dob
    ? new Date(patient.dob).toISOString().substring(0, 10)
    : "";

  const [formData, setFormData] = useState({ ...patient, dob: formattedDOB });
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(`/patients`);
  };

  const handleChange = (e) => {
    setErrors([]);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //PATCH TO `/patients/${id}`
    onUpdate(formData); // Pass updated data to onUpdate function
    navigate(`/patients/${patient.id}`); // Redirect to patient details
  };

  return (
    <div className="edit-patient">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="last_name">Last Name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="dob">Date of Birth: </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="allergies">Allergies: </label>
          <input
            type="text"
            name="allergies"
            id="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="address">Address: </label>
          <textarea
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="notes">Notes: </label>
          <textarea
            type="text"
            name="notes"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <br />
        <input type="submit" value="Update" />
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
};

export default EditPatient;

// passing patient through props...using spread operator to spread the attributes of the patient.

/*
Format DOB to "YYYY-MM-DD"
This logic is responsible for formatting the date of birth (dob) value from the patient object into a format that is compatible with the <input type="date"> element in HTML. Here's a breakdown of what each step is doing:

patient.dob: This is the date of birth value extracted from the patient object.
?: This is a ternary conditional operator. It checks if patient.dob is truthy (i.e., it exists and is not null or undefined).
new Date(patient.dob): This converts the patient.dob value into a JavaScript Date object. This step assumes that the patient.dob value is a valid date string in a format that can be parsed by the Date constructor.
.toISOString(): This method converts the Date object into an ISO 8601 string representation. An ISO 8601 date string looks like "YYYY-MM-DDTHH:MM:SSZ", where "T" is the delimiter between the date and time, and "Z" indicates that the time is in UTC.
.substring(0, 10): This extracts the first 10 characters from the ISO 8601 string. Since the ISO 8601 date string is in the format "YYYY-MM-DD", this step effectively extracts only the date portion of the string.
: "": This part of the ternary operator is the fallback value if patient.dob is falsy (e.g., if it's null or undefined). In this case, an empty string is used as the formatted date of birth.

Putting it all together, the logic takes the patient.dob value, converts it into an ISO 8601 string, extracts only the date portion, and returns this formatted date (in "YYYY-MM-DD" format) as the formattedDOB value. This formatted date can then be used to initialize the formData state, which is used to populate the <input type="date"> element for editing the date of birth.
*/