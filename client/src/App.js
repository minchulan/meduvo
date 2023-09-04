import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
// import AppointmentList from "./AppointmentList";
import AppointmentDetails from "./AppointmentDetails";
import NewAppointmentForm from "./NewAppointmentForm";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Faqs from "./Faqs";
import Feature1 from "./Feature1";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
import Terms from "./Terms";
import Profile from "./Profile";
import NotFound from "./NotFound";
import EditAppointmentForm from "./EditAppointmentForm";

const App = ({ onDelete, appointments }) => {
  const { deletePatient } = useContext(UserContext);

  const handleDeleteClick = (id) => {
    deletePatient(id);
  };

  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/patients" element={<PatientList />} />
        <Route
          exact
          path="/patients/:id"
          element={<PatientDetails appointments={appointments} onDelete={handleDeleteClick} />}
        />
        <Route
          exact
          path="/patients/:patientId/appointments/new"
          element={<NewAppointmentForm />}
        />
        <Route
          exact
          path="/appointments/:appointmentId"
          element={<AppointmentDetails />}
        />
        {/* <Route exact path="/appointments" element={<AppointmentList />} /> */}
        <Route
          exact
          path="/appointments/:appointmentId/edit"
          element={<EditAppointmentForm />}
        />
        <Route path="/me" element={<Profile />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/faqs" element={<Faqs />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/feature1" element={<Feature1 />} />
        <Route exact path="/feature2" element={<Feature2 />} />
        <Route exact path="/feature3" element={<Feature3 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
