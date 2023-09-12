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

  // FETCH USER DATA & UPDATE CURRENT USER STATE
  const fetchUserData = () => {
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
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
          console.log("Updated patient data:", data);
          // Update the patient in the patients array with the new data
          setPatients((patients) =>
            patients.map((patient) =>
              patient.id === id ? { ...patient, ...data } : patient
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          const updatedPatients = patients.map((patient) => {
            if (patient.id === id) {
              return {
                ...patient,
                appointments: [...patient.appointments, data],
              };
            }
            return patient;
          });
          setPatients(updatedPatients);
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.errors);
        });
      }
      fetchPatients();
    });
  };

  // UPDATE AN APPOINTMENT
  const updateAppointment = (
    patientId,
    appointmentId,
    updatedAppointmentData
  ) => {
    return fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAppointmentData),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then((data) => {
          const updatedPatients = patients.map((patient) => {
            if (patient.id === patientId) {
              return {
                ...patient,
                appointments: patient.appointments.map((appointment) => {
                  if (appointment.id === appointmentId) {
                    return { ...appointment, ...data };
                  }
                  return appointment;
                }),
              };
            }
            return patient;
          });
          setPatients(updatedPatients);
        });
      } else {
        resp.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  // DELETE AN APPOINTMENT
  const deleteAppointment = (appointmentId) => {
    fetch(`/appointments/${appointmentId}`, {
      method: "DELETE",
    }).then((res) => {
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
    });
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
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };