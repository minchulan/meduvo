import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import { UserProvider } from "./context/user";
import Login from "./Login";
import Signup from "./Signup";
import AppointmentList from "./AppointmentList";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Faqs from "./Faqs";
import Feature1 from "./Feature1";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";

const App = () => {
  const [patients, setPatients] = useState([]); // Initialize patients as an empty array
  const [appointments, setAppointments] = useState([]);

  const addPatient = (patientObj) => {
    console.log({ patients });
    const updatedPatients = [...patients, patientObj];
    setPatients(updatedPatients);
  };

  const addAppointment = (appointmentObj) => {
    setAppointments([...appointments, appointmentObj]);
  };

  return (
    <main className="App">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route
            exact
            path="/patients"
            element={
              <PatientList patients={patients} onAddPatient={addPatient} />
            }
          />
          <Route
            exact
            path="/patients/:id"
            element={<PatientDetails patients={patients} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route exact path="/feature1" element={<Feature1 />} />
          <Route exact path="/feature2" element={<Feature2 />} />
          <Route exact path="/feature3" element={<Feature3 />} />
        </Routes>
        <Footer />
      </UserProvider>
    </main>
  );
};

export default App;

//----------------------------------
/*

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
