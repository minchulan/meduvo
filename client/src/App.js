import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "./AppointmentDetails";
import NewAppointment from "./NewAppointment";
import PatientAppointments from "./PatientAppointments";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";
import EditPatient from "./EditPatient";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Faqs from "./Faqs";
import Feature1 from "./Feature1";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
import Terms from "./Terms";
import EditAppointment from "./EditAppointment";

const App = () => {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Patients Routes */}
        <Route exact path="/patients" element={<PatientList />} />
        <Route exact path="/patients/:id" element={<PatientDetails />} />
        <Route exact path="/patients/:id/edit" element={<EditPatient />} />

        {/* Nested Routes - Patient's Appointments */}
        {/* GET */}
        <Route
          path="/patients/:patientId/appointments"
          element={<PatientAppointments />}
        />
        {/* POST */}
        <Route
          path="/patients/:patientId/appointments/new"
          element={<NewAppointment />}
        />
        <Route
          path="/patients/:patientId/appointments/:appointmentId"
          element={<AppointmentDetails />}
        />
        {/* Appointments Routes */}
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/:id/edit" element={<EditAppointment />} />

        {/* Other Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/terms" element={<Terms />} />
        {/* Feature Routes */}
        <Route path="/feature1" element={<Feature1 />} />
        <Route path="/feature2" element={<Feature2 />} />
        <Route path="/feature3" element={<Feature3 />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;

//----------------------------------
/*
route definitions in both the Rails backend and the React frontend are aligned, which is crucial for smooth communication between your frontend and backend components.


The React route /patients maps to the Rails route resources :patients, only: [:index], which corresponds to fetching a list of patients.
The React route /patients/:id maps to the Rails route resources :patients, only: [:show, :update, :destroy], which corresponds to viewing, updating, and deleting a specific patient.
The React route /patients/:id/edit also maps to the Rails route resources :patients, only: [:update], but it likely represents an editing form or component in your front end.
The React route /appointments maps to the Rails route resources :appointments, only: [:index], allowing you to fetch a list of appointments.
The React route /patients/:patientId/appointments/:appointmentId maps to the Rails route resources :appointments, only: [:show, :update, :destroy], indicating operations on a specific appointment within a specific patient.
The React route /patients/:patientId/appointments maps to the Rails route resources :appointments, only: [:create] within the context of a specific patient, indicating creating a new appointment for that patient.




The nested routes will mirror the nested routes defined in your Rails backend.

# Rails -- Patients 
resources :patients, only: [:index, :show, :create, :update, :destroy] do
  resources :appointments, shallow: true
end

React -- App.js 
<Route
  path="/patients/:patientId/appointments"
  element={<PatientAppointments />}
/>


  // do not need to fetch patients upon mount because already fetching user's patients and appointments in user context. and when user logs in, we get the user's data. 
  // useEffect(() => {
  //   fetch("/patients")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPatients(data);
  //     });
  // }, []);


This code sets up the main component (App) of a React application using the react-router-dom library for routing and the UserProvider from the user context for managing user-related data [aka wraps the components with the UserProvider to provide the user context throughout the application]. The App component acts as the entry point for the application, rendering the appropriate components based on the defined routes.

1] Import the necessary dependencies 
2] Define the `App` component
3] Within the App component, render the following structure:
  []  Wrap the entire component with the UserProvider component to provide the user context to the nested components.
  [] Include the Navbar component for navigation.
  [] Use the Routes component to define the different routes and their corresponding components.
  [] Use the Route component for each route, specifying the path and the corresponding component to render when that path is matched.
  [] Include the Footer component at the end.
4] Export the `App` component so that it can be rendered in the application. 

  // // add patient using spread operator
  // const addPatient = (newPatient) => {
  //   const updatedPatients = [...patients, newPatient]
  //   setPatients(updatedPatients);
  // };

  // // delete patient using filter
  // const deletePatient = (id) => {
  //   const updatedPatients = patients.filter((patient) => patient.id !== id);
  //   setPatients(updatedPatients);
  // };

  // // update patient using map
  // const updatePatient = (id) => {
  //   const updatedPatients = patients.map((patient) => {
  //     if (patient.id === id) {
  //       return { ...patient };
  //     } else {
  //       return patient;
  //     }
  //   });
  //   setPatients(updatedPatients);
  // };
  
*/
