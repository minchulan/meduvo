import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { Link, useNavigate } from "react-router-dom";
import PatientCard from "./PatientCard";

const PatientList = ({ patients, onAddPatient }) => {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  // const patientsToDisplay =
  //   user && user.patients ? (
  //     user.patients.map((patient) => (
  //       <Link key={patient.id} to={`/patients/${String(patient.id)}`}>
  //         <PatientCard patient={patient} />
  //       </Link>
  //     ))
  //   ) : (
  //     <div>Loading patients...</div>
  //   );

    // const patientsToDisplay =
    //   user && user.patients ? (
    //     user.patients.map((patient) => (
    //       <Link key={patient.id} to={`/patients/${String(patient.id)}`}>
    //         <ul>
    //           <li>
    //             {patient.first_name} {patient.last_name}
    //           </li>
    //         </ul>
    //       </Link>
    //     ))
    //   ) : (
    //     <div>Loading patients...</div>
    //   );
  
  const patientsToDisplay =
    user && user.patients ? (
      user.patients.map((patient) => (
        <Link key={patient.id} to={`/patients/${patient.id}`}>
          <PatientCard patient={patient} />
        </Link>
      ))
    ) : (
      <div>Loading patients...</div>
    );


  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      first_name: patient.first_name,
      last_name: patient.last_name,
      dob: patient.dob,
      address: patient.address,
      email: patient.email,
      phone: patient.phone,
      notes: patient.notes,
    };

    // Make a POST request to add the new patient 
    fetch("/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((res) => res.json())
      .then((data) => {
        // Add the new patient to the list
        // Call the onAddPatient function passed as a prop to add the new patient
        console.log(data);
        onAddPatient(data);

        // Navigate to the newly created patient's details page
        navigate(`/patients/${patient.id}`);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding patient:", error);
      });
    
    // Reset the form fields and hide the form
    setPatient({
      first_name: "",
      last_name: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
    });
    setShowForm(false);
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
      <ul>{patientsToDisplay}</ul>
      <br />
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
            value={patient.first_name}
            onChange={(e) =>
              setPatient({ ...patient, first_name: e.target.value })
            }
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
            value={patient.last_name}
            onChange={(e) =>
              setPatient({ ...patient, last_name: e.target.value })
            }
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
            value={patient.dob}
            onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
            className="form-input"
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
            value={patient.phone}
            onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
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
            value={patient.email}
            onChange={(e) => setPatient({ ...patient, email: e.target.value })}
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
            value={patient.address}
            onChange={(e) =>
              setPatient({ ...patient, address: e.target.value })
            }
            className="form-input"
          />
          <label htmlFor="notes" className="form-label">
            Quick notes:
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add any pertinent patient information..."
            autoComplete="on"
            value={patient.notes}
            onChange={(e) => setPatient({ ...patient, notes: e.target.value })}
            className="form-input"
          />
          <br />
          <br />
          <button type="submit" className="form-submit">
            Add
          </button>
        </form>
      ) : (
        <button className="small-button" onClick={() => setShowForm(true)}>
          Add patient
        </button>
      )}
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
