import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  // GET '/me', to: 'users#show'
  useEffect(() => {
    fetch("/me", {
      method: "GET",
      credentials: "include",
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          fetchPatients();
        });
      } else {
        setCurrentUser(null);
        setLoggedIn(false);
        setErrors(["Authentication failed. Please login."]);
      }
    });
  }, [setPatients]);

  // GET ALL PATIENTS
  const fetchPatients = () => {
    fetch("/patients").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPatients(data);
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.error);
        });
      }
    });
  };

  // LOGIN
  const login = (user) => {
    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
          fetchPatients();
          navigate("/me");
        });
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  // LOGOUT
  const logout = () => {
    fetch(`/logout`, {
      method: "DELETE",
    }).then(() => {
      setCurrentUser(null);
      setLoggedIn(false);
    });
  };

  // SIGNUP
  const signup = (user) => {
    fetch(`/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          navigate(`/me`);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
          setShowForm(true);
        });
      }
    });
  };

  // ADD A PATIENT
  const addPatient = (patient) => {
    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPatients((patients) => [...patients, data]);
          navigate(`/patients/${data.id}`);
        });
      } else {
        resp.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => `${e[0]} ${e[1]}`));
        });
      }
    });
  };

  // UPDATE A PATIENT
  const updatePatient = (id, formData) => {
    fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setPatients((patients) =>
            patients.map((patient) =>
              patient.id === id ? { ...patient, data } : patient
            )
          );
          return data;
        });
      } else {
        res.json().then((data) => {
          setErrors(
            Object.entries(data.errors).map(
              (error) => `${error[0]} ${error[1]}`
            )
          );
        });
      }
    });
  };

  // DELETE A PATIENT
  const deletePatient = (id) => {
    fetch(`/patients/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== id)
        );
        fetchPatients();
        navigate(`/patients`);
      } else {
        res.json().then((data) => {
          setErrors([data.errors]);
        });
      }
    });
  };

  // ADD AN APPOINTMENT
  const addAppointment = (id, appointmentData) => {
    fetch(`/patients/${id}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          // Update the patient's appointments
          setPatients((prevPatients) =>
            prevPatients.map((patient) =>
              patient.id === id
                ? { ...patient, appointments: [...patient.appointments, data] }
                : patient
            )
          );

          // navigate to patient details page
          navigate(`/patients/${id}`);
        });
      } else {
        res.json().then((data) => {
          setErrors(Object.entries(data.errors).map((e) => `${e[0]} ${e[1]}`));
        });
      }
    });
  };

  // UPDATE AN APPOINTMENT
  const updateAppointment = (patientId, appointmentId, appointmentData) => {
    return fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // Update state with the new data
          setPatients((prevPatients) =>
            prevPatients.map((patient) => {
              if (patient.id === patientId) {
                // Find the appointment to update
                const updatedAppointments = patient.appointments.map(
                  (appointment) =>
                    appointment.id === appointmentId
                      ? { ...appointment, ...data }
                      : appointment
                );
                // Return the patient with the updated appointments
                return { ...patient, appointments: updatedAppointments };
              }
              return patient;
            })
          );
          return data;
        });
      } else {
        return res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  // DELETE AN APPOINTMENT
  const deleteAppointment = (appointmentId) => {
    fetch(`/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setPatients((prevPatients) =>
            prevPatients.map((patient) => ({
              ...patient,
              appointments: patient.appointments.filter(
                (appointment) => appointment.id !== appointmentId
              ),
            }))
          );
        } else {
          res.json().then((data) => {
            setErrors(data.errors);
          });
        }
      })
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        loggedIn,
        patients,
        setPatients,
        addPatient,
        updatePatient,
        deletePatient,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        errors,
        setErrors,
        showForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };