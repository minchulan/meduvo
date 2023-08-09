import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import PatientCard from "./PatientCard";

// set up form as an object, rather than having state for each input field:
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
  const { patients, user, addPatient, updatePatient } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [patientFormData, setPatientFormData] = useState(initialPatientState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate();

  // Filter the patients based on the search query
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  // we gets the patients array from context. map over patients to get individual patient cards.
  const patientCards =
    filteredPatients.length > 0 ? (
      filteredPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
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

  // add new patient form
  const handleSubmit = (e) => {
    e.preventDefault();

    // handing the patient from this form to global state (the addPatient in context) which is where the patients lives.
    addPatient({
      first_name: patientFormData.first_name,
      last_name: patientFormData.last_name,
      dob: patientFormData.dob,
      allergies: patientFormData.allergies,
      address: patientFormData.address,
      email: patientFormData.email,
      phone: patientFormData.phone,
      notes: patientFormData.notes,
      guardian: patientFormData.guardian,
      language_preferences: patientFormData.language_preferences,
      viewed_notice_of_privacy_practices:
        patientFormData.viewed_notice_of_privacy_practices,
    });

    setShowConfirmation(true); // Show the confirmation message
    setPatientFormData(initialPatientState); // Clear the form fields
    setShowForm(false); // Close the form after adding a patient

    // Reset the confirmation message after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000); // 5 seconds
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

  const handleCancel = () => {
    setShowForm(false); // Hide the form
  };


  return (
    <div className="patient-list">
      {user && (
        <h5 className="signed-in-user">
          Signed in: <em>{user.email}</em>
        </h5>
      )}
      <br />
      <h2>My Patients</h2>
      <div className="search-container">
        {/* Search input field with added CSS class "search-input" */}
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
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
            value={patientFormData.first_name}
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
            value={patientFormData.last_name}
            onChange={handleChange} // handleChange works as long as id matches key we're trying to update in patientForm object
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
            value={patientFormData.guardian}
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
            value={patientFormData.dob}
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
            value={patientFormData.phone}
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
            value={patientFormData.email}
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
            value={patientFormData.address}
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
            value={patientFormData.allergies}
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
            value={patientFormData.language_preferences}
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
            value={patientFormData.notes}
            onChange={handleChange}
            className="form-input"
          />
          <label>
            Viewed Notice of Privacy Protection:
            <input
              type="checkbox"
              id="viewed_notice_of_privacy_practices"
              checked={patientFormData.viewed_notice_of_privacy_practices}
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
            type="submit"
            className="form-cancel"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button className="small-button" onClick={() => setShowForm(true)}>
          Add patient
        </button>
      )}
      <br />
      <br />
      {showConfirmation && (
        <div className="confirmation-message" style={{ fontSize: 18, color: "blue" }}>
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



//-----------------
/*

Make sure that the patientForm state in your component has a gender property that is being updated correctly by the handleChange function. The value attribute of the select element should be set to the gender property of the patientForm state. When a user selects an option from the dropdown, the handleChange function should update the patientForm.gender value accordingly.

By ensuring that the value attribute of the select element corresponds to the state value and that the handleChange function updates the state correctly, the select input field should work as expected. It will display the currently selected option and update the state when the user selects a different option from the dropdown.


    controlled form - keeping our state object in sync with what is displayed in the DOM. 

  # edge case with checkbox type => value is e.target.checked not e.target.value 
  # code below gives you a more flexible interface so now anytime you want to add a new input field to form, just add a new key in state, and add a new input field with a correct id that matches that key in state, and reuse that handleChange rather than making a new handleChange function every time! 
  # set up your form as an object 

  function handleChange(event) {
    const key = event.target.id
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    console.log(event.target)
    setFormData({ 
      ...formData, 
      [key]: value
    })
  }

    // // Make a POST request to add the new patient 
    // fetch("/patients", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newPatient),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // Add the new patient to the list
    //     // Call the onAddPatient function passed as a prop to add the new patient
    //     console.log(data);
    //     onAddPatient(data);

    //     // Navigate to the newly created patient's details page
    //     navigate(`/patients/${patient.id}`);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error("Error adding patient:", error);
    //   });
    
    // // Reset the form fields and hide the form
    // setPatient({
    //   first_name: "",
    //   last_name: "",
    //   dob: "",
    //   phone: "",
    //   email: "",
    //   address: "",
    // });
    // setShowForm(false);

Controlled form and onSubmit, I have all of my attributes going to the user's patient object. 
Make a POST request, start with fetch "/patients" route. Add in a config object (attributes - method, headers, body) to tell our request-response cycle what data to expect. Body takes the actual patient. Stringify patient to be able to send it in the request. onSubmit, hits our patients route, which hits our create action and byebug in our create action. if you take a look at patient_params you can see the stuff from the form. 

When the NewPatient form is submitted, make a POST request to /patients, with an object in the body:

{ 
  message: {
    username: "Duane",
    body: "user input",
    created_at: "2021-01-07T09:16:50"
  }
}

You can get a timestamp for the "created_at" field by calling `new Date().toUTCString()`.

After getting a response from the POST request, add the new message to the list of messages in our app.

For each feature, think about:
- Do we need state?
    - Where should that state live?
- What props do I need?
- How can I pass data to the components that need it?
*/

// {
//   user: {
//     appointments: [],
//     patients: [],
//     username: "",
//     email: ""
//   }
// }

/*
PatientList is a child of App 
Gets array of the user's patients from UserContext
Renders each individual patient card

This code is a React component called `PatientList` that renders a list of patients and allows users to add new patients. Let's go through the code step by step:

1. The component imports necessary dependencies and other components:
   - `React` is imported from the 'react' package.
   - `useState` and `useContext` are imported from the 'react' package to define and use state variables in the functional component.
   - `UserContext` is imported from a user context file to access user data.
   - `Link` and `useNavigate` are imported from 'react-router-dom' to create links and navigate within the application.
   - `PatientCard` is imported from a file that represents an individual patient card.

2. The `PatientList` component is defined as a functional component that receives `patients` and `onAddPatient` as props.

3. Inside the component, the `user` and `setShowForm` variables are created using the `useContext` and `useState` hooks, respectively. The `user` variable is obtained from the `UserContext` using the `useContext` hook, and `setShowForm` is initialized with `false`.

4. Another state variable called `patient` is created using the `useState` hook. It contains an object representing the patient's data, with initial values for properties like `first_name`, `last_name`, `dob`, `phone`, `email`, and `address`.

5. The `navigate` variable is created using the `useNavigate` hook from 'react-router-dom'. It will be used to navigate to different routes within the application.

6. The `patientsToDisplay` variable is created based on the `user` and `patients` data. If `user` and `user.patients` exist, it maps over the `user.patients` array and renders a `Link` component for each patient, passing the patient's ID in the URL. Each patient card is displayed using the `PatientCard` component. If `user` or `user.patients` is falsy, a loading message is displayed.

7. The `goBack` function is defined, which uses the `navigate` function to go back to the previous route.

8. The `handleAddPatient` function is defined to handle the submission of the patient form. It prevents the default form submission behavior, creates a new patient object using the data from the `patient` state variable, calls the `onAddPatient` function passed as a prop with the new patient object, navigates to the patient's details page, resets the `patient` state to its initial values, and hides the form.

9. The `return` statement renders the JSX markup for the `PatientList` component. It displays the signed-in user's email if the `user` object exists. It also displays the list of patients using the `patientsToDisplay` variable.

10. If `showForm` is `true`, it renders a form to add a new patient. The form contains input fields for the patient's first name, last name, date of birth, phone number, email, address, and quick notes. The form submits the data to the `handleAddPatient` function when submitted.

11. If `showForm` is `false`, it renders a button that, when clicked, sets `showForm` to `true`, revealing the form to add a new patient.

12. After the form or button, a horizontal rule is displayed.

13. Finally, a "Go Back" button is rendered that, when clicked, triggers the `goBack` function and navigates back to the previous route.

The `PatientList` component exports as the default export of the file.

*/
