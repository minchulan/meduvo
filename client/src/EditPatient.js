import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPatient = ({ patient, setPatient, onUpdate }) => {
  const [formData, setFormData] = useState({...patient});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCancelClick = () => {
    navigate(`/patients`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Pass updated data to onUpdate function
    navigate(`/patients/${patient.id}`); // Redirect to patient details
  };

  return (
    <div className="edit-patient">
      <hr />
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

/*
----------------------------------------------------------------------

  // when the editPatient form is submitted, make a patch request to update the patient on the server & also update state. Call updatePatient() over in context to do this! We also need to change our component to leave the editing mode and go back to viewing mode. So when form submits, go back to viewing mode.



The formData state in your code is initialized as an empty object:

jsx
Copy code
const [formData, setFormData] = useState({});
It starts with an empty object because there is no initial data provided when defining the state. When the component mounts and the useEffect hook is triggered, it fetches the patient data and updates the formData state with the existing patient data retrieved from the server.

So, initially, formData will be an empty object until the data is fetched and the useEffect hook updates it with the patient details. Once the data is fetched and the state is updated, the form inputs will be populated with the patient data, and any changes made to the form inputs will be reflected in the formData state.

In summary, the formData state is properly initialized as an empty object, and it will be updated with the patient details fetched from the server when the component mounts.
*/