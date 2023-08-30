import React, { useState, useContext } from "react";
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

const PatientList = ({ onDelete }) => {
  const { patients, addPatient, errors } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [patientFormData, setPatientFormData] = useState(initialPatientState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const { first_name, last_name, dob, address, phone, allergies, email, guardian, notes, viewed_notice_of_privacy_practices, language_preferences } = patientFormData

  const filteredPatients = patients
    ? patients.filter((patient) => {
        const fullName =
          `${patient.first_name} ${patient.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      })
    : [];

  const patientCards = patients ? (
    filteredPatients.length > 0 ? (
      filteredPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onDelete={onDelete} />
      ))
    ) : (
        <div>Patient not found.</div>
    )
  ) : (
      <div>Loading patients...</div>
  )
    filteredPatients.length > 0 ? (
      filteredPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onDelete={onDelete} />
      ))
    ) : (
      <div>Patient not found.</div>
    );
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const goBack = () => {
    navigate(`/`);
  };

  const handleChange = (e) => {
    const key = e.target.id;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setPatientFormData({
      ...patientFormData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000); 

  };

  return (
    <div className="patient-list">
      {/* {errors && Object.keys(errors).length > 0 && (
        <div className="error-container">
          {Object.values(errors).map((errorMessages, index) => (
            <div key={index} className="error-message">
              {errorMessages.map((error, innerIndex) => (
                <div key={innerIndex}>{error}</div>
              ))}
            </div>
          ))}
        </div>
      )} */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="first_name" className="form-label">
            First Name:
          </label>
          <input
            required
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
            required
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
            required
            type="date"
            id="dob"
            name="dob"
            placeholder="Date of Birth"
            value={dob}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            required
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
            required
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
            required
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
            required
            type="text"
            id="allergies"
            name="allergies"
            placeholder="E.g., Rash with penicillin"
            autoComplete="on"
            value={allergies}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="language-preferences" className="form-label">
            Language Preferences:
          </label>
          <input
            required
            type="text"
            id="language_preferences"
            name="language_preferences"
            placeholder="E.g., Spanish"
            autoComplete="on"
            value={language_preferences}
            onChange={handleChange}
            className="form-input"
          />
          <label htmlFor="notes" className="form-label">
            Quick notes:
          </label>
          <textarea
            required
            id="notes"
            name="notes"
            placeholder="Add any pertinent patient information..."
            autoComplete="on"
            value={notes}
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
        <button
          className="small-button"
          onClick={() => {
            setShowForm(true);
            setPatientFormData(initialPatientState);
          }}
        >
          Add patient
        </button>
      )}
      <br />
      <br />
      {showConfirmation && (
        <div
          className="confirmation-message"
          style={{ fontSize: 18, color: "blue" }}
        >
          New patient added successfully!
        </div>
      )}
      <ul>{patientCards}</ul>
      <hr />
      <button
        className="go-back-button"
        onClick={goBack}
        style={{
          backgroundColor: "#ffffff",
          color: "#333333",
          border: "1px solid #cccccc",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ◁ Go Back
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PatientList;