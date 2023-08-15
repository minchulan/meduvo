import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [contextErrors, setContextErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // GET '/me', to: 'users#show'
  useEffect(() => {
    fetch("/me", {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Fetched data:", data);
        console.log("Fetched patients:", data.patients);
        console.log("Fetched appointments:", data.appointments);

        if (data.error) {
          setLoggedIn(false);
          setUser(null);
          setContextErrors(["Authentication failed. Please login."]);
        } else {
          setLoggedIn(true);
          setUser(data);
          setPatients(data.patients);
          setAppointments(data.appointments);
          setContextErrors([]);
        }
      })
      .catch((error) => {
        setContextErrors([
          "Failed to fetch user data. Please try again later.",
        ]);
        console.error("Fetching user data error:", error);
      });
  }, []);

  // LOGIN
  const login = (user) => {
    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser(data);
          setLoggedIn(true);
          navigate(`/`);
        } else {
          setContextErrors([data.errors]);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setContextErrors(["An error occurred during login. Please try again."]);
      });
  };

  // LOGOUT
  const logout = () => {
    fetch(`/logout`, {
      method: "DELETE",
    }).then(() => {
      setUser(null);
      setLoggedIn(false);
    });
  };

  // SIGNUP
  const signup = (user) => {
    fetch(`/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Signup failed");
        }
      })
      .then((data) => {
        setUser(data);
        setLoggedIn(true);
        navigate(`/`);
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setContextErrors([
          "An error occurred during signup. Please try again.",
        ]);
      });
  };

  // ADD PATIENT
  const addPatient = (patient) => {
    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to add patient.");
        }
      })
      .then((data) => {
        setPatients([...patients, data]);
      })
      .catch((error) => {
        setContextErrors([error.message]);
      });
  };

  // UPDATE PATIENT
  const updatePatient = (id, formData) => {
    console.log("Updating patient with ID:", id);
    console.log("Form data:", formData);

    return fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update patient.");
        }

        return response.json();
      })
      .then((editedPatient) => {
        setPatients((patients) =>
          patients.map((patient) =>
            patient.id === id ? { ...patient, ...editedPatient } : patient
          )
        );

        return editedPatient;
      })
      .catch((error) => {
        setContextErrors([error.message]);
        throw error;
      });
  };

  // DELETE PATIENT
  const deletePatient = (id) => {
    fetch(`/patients/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPatients((patients) =>
        patients.filter((patient) => patient.id !== id)
      );
    });
  };

  // ADD APPOINTMENT
  const addAppointment = async (patientId, appointmentData) => {
    console.log(patientId);
    console.log(appointmentData);
    try {
      const response = await fetch(`/patients/${patientId}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add appointment.");
      }

      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
      console.log("New Appointment:", newAppointment);
    } catch (error) {
      setContextErrors(["Failed to add appointment. Please try again later."]);
    }
  };

  // UPDATE APPOINTMENT
  const updateAppointment = (patientId, appointmentId, updatedData) => {
    console.log("Updating appointment with ID:", appointmentId);
    console.log("Updated appointment data:", updatedData);

    return fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to update appointment.");
        }
        return resp.json();
      })
      .then((editedAppointment) => {
        setAppointments((appointments) =>
          appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, ...editedAppointment }
              : appointment
          )
        );
        return editedAppointment;
      })
      .catch((error) => {
        setContextErrors([error.message]);
        throw error;
      });
  };

  // DELETE APPOINTMENT
  const deleteAppointment = (patientId, appointmentId) => {
    fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      method: "DELETE",
    }).then(() => {
      setAppointments((appointments) =>
        appointments.filter((appointment) => appointment.id !== appointmentId)
      );
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loggedIn,
        patients,
        setPatients,
        appointments,
        addAppointment,
        deleteAppointment,
        addPatient,
        deletePatient,
        updatePatient,
        updateAppointment,
      }}
    >
      {contextErrors && contextErrors.length > 0 ? (
        <div>
          {contextErrors.map((error, index) => (
            <h2 key={index}>{error}</h2>
          ))}
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };