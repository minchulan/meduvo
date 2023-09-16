import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import PatientCard from "./PatientCard";

const initialPatientState = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  allergies: "",
  phone: "",
  email: "",
  address: "",
  guardian: "",
  viewed_notice_of_privacy_practices: "",
  language_preferences: ""
};

const PatientList = () => {
  const [showForm, setShowForm] = useState(false);
  const [patientFormData, setPatientFormData] = useState(initialPatientState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { currentUser, patients, addPatient, errors, setErrors } = useContext(UserContext);

  const navigate = useNavigate();
  
  const { first_name, last_name, dob, address, phone, allergies, email, guardian, notes, viewed_notice_of_privacy_practices, language_preferences } = patientFormData;

  const patientCards = patients.map((patient) => (
    <PatientCard
      key={patient.id}
      patient={patient}
      appointment={patient.appointments}
    />
  ));

  const handleChange = (e) => {
    const key = e.target.id;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setPatientFormData({
      ...patientFormData,
      [key]: value,
    });
  };

  // ADD A PATIENT 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser && currentUser.admin) {
      addPatient({
        first_name,
        last_name,
        dob,
        allergies,
        address,
        email,
        phone,
        notes,
        guardian,
        language_preferences,
        viewed_notice_of_privacy_practices,
      });
      setShowConfirmation(true);
      setPatientFormData(initialPatientState);
      setShowForm(false);
      setShowError(false);
      setErrors([]);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    } else {
      setErrors(["You do not have admin permissions to create a patient."]);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setErrors([]);
      }, 5000);
    }
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      setErrors(errors);
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [errors, setErrors]);

  const goBack = () => (navigate(`/`));

  return (
    <div className="patient-list">
      {errors && errors.length > 0 && (
        <div className="error-container">
          <ul className="error-list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {showForm ? (
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="e.g., John"
            autoComplete="on"
            value={first_name}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="last_name" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Smith"
            autoComplete="on"
            value={last_name}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="guardian" className="form-label">
            Guardian's name (if applicable):
          </label>
          <input
            type="text"
            id="guardian"
            name="guardian"
            placeholder="E.g., John Smith"
            autoComplete="on"
            value={guardian}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Date of Birth"
            value={dob}
            onChange={handleChange}
            className="form-input"
            autoComplete="off"
          />
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 555 655 5656"
            autoComplete="on"
            value={phone}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@email.com"
            autoComplete="on"
            value={email}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter patient's home address"
            autoComplete="on"
            value={address}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="allergies" className="form-label">
            Allergies:
          </label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            placeholder="E.g., Rash with penicillin"
            autoComplete="on"
            value={allergies}
            onChange={handleChange}
            className="form-input"
          />
          <label>
            Viewed Notice of Privacy Protection:
            <input
              type="checkbox"
              id="viewed_notice_of_privacy_practices"
              checked={viewed_notice_of_privacy_practices}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button
            type="submit"
            className="form-submit"
            style={{ marginRight: "10px" }}
          >
            Add
          </button>
          <button
            className="form-cancel"
            onClick={() => {
              setShowForm(false);
              setPatientFormData(initialPatientState);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      ) : (
        // Conditionally render the "Add patient" button based on if admin
        currentUser &&
        currentUser.admin && (
          <button
            className="small-button"
            onClick={() => {
              setShowForm(true);
              setPatientFormData(initialPatientState);
            }}
          >
            Add patient
          </button>
        )
      )}
      <br />
      <br />
      {/* Render successful confirmation message */}
      {!showError && showConfirmation && (
        <div
          className="confirmation-message"
          style={{ fontSize: 18, color: "blue" }}
        >
          New patient added successfully!
        </div>
      )}
      <ul>{patientCards}</ul>
      <hr />
      <button className="go-back-button" onClick={goBack}>
        ◁ Go Back
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PatientList;