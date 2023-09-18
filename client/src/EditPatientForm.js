import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

const EditPatientForm = ({ patient, onUpdate, setIsEditing }) => {

  // Format DOB to "YYYY-MM-DD"
  const formattedDOB = patient.dob
    ? new Date(patient.dob).toISOString().substring(0, 10)
    : "";
  const [formData, setFormData] = useState({ ...patient, dob: formattedDOB })
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { errors, setErrors } = useContext(UserContext);

  const handleChange = (e) => {
    setErrors([]);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdate(formData)
    navigate(`/patients/${patient.id}`);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="edit-patient">
      <form onSubmit={handleSubmit}>
        {errors && errors.length > 0 && (
          <div className="error-container">
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <br />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <label htmlFor="first_name">First Name: </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="last_name">Last Name: </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="dob">Date of Birth: </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="allergies">Allergies: </label>
            <input
              type="text"
              name="allergies"
              id="allergies"
              value={formData.allergies}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="phone">Phone Number: </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="address">Address: </label>
            <textarea
              type="text"
              name="address"
              id="address"
              value={formData.address || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <br />
            <label htmlFor="notes">Notes: </label>
            <textarea
              type="text"
              name="notes"
              id="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </>
        )}
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

export default EditPatientForm;