import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  // GET '/me', to: 'users#show'
  useEffect(() => {
    fetch("/me", {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setLoggedIn(false);
          setCurrentUser(null);
          setErrors(["Authentication failed. Please login."]);
        } else {
          setLoggedIn(true); // if user is loggedIn
          setCurrentUser(data); // set to state
          fetchPatients(); // grab all the patients
          setErrors([]);
        }
      })
      .catch((error) => {
        setErrors(["Failed to fetch user data. Please try again later."]);
        console.error("Fetching user data error:", error);
      });
  }, []);

  const fetchPatients = () => {
    fetch("/patients").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setPatients(data);
        });
      } else {
        resp.json().then((data) => setErrors(data.error));
      }
    });
  };

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
          setCurrentUser(data);
          setLoggedIn(true);
          navigate("/me");
        } else {
          console.log(data.errors);
          setErrors([data.errors]);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrors(["An error occurred during login. Please try again."]);
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
          if (data && data.errors) {
            // Display specific backend errors
            setErrors(data.errors);
          } else {
            // Generic error message
            setErrors(["An error occurred during signup. Please try again."]);
          }
          setShowForm(true);
        });
      }
    });
  };

  // ADD PATIENT
  const addPatient = (patient) => {
    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setPatients((patients) => [...patients, data]);
          navigate(`/patients/${data.id}`);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  // UPDATE PATIENT
  const updatePatient = (id, formData) => {
    return fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setPatients((patients) =>
            patients.map((patient) =>
              patient.id === id ? { ...patient, ...data } : patient
            )
          );
        });
      } else {
        return res.json().then((data) => {
          throw new Error(data.errors); // Throw an error with the error message
        });
      }
    });
  };

  // DELETE PATIENT
  const deletePatient = (id) => {
    fetch(`/patients/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        // Update the patients list in the context
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== id)
        );
        navigate(`/patients`);
      } else {
        res.json().then((data) => setErrors(data.errors));
      }
    });
  };

  // ADD APPOINTMENT
  const addAppointment = (id, appointmentData) => {
    // Convert date to ISO 8601 format (YYYY-MM-DD) to map date structure in Rails
    const isoDate = new Date(appointmentData.date).toISOString().split("T")[0];

    const modifiedAppointmentData = {
      ...appointmentData,
      date: isoDate,
    };

    fetch(`/patients/${id}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedAppointmentData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAppointments((appointments) => [...appointments, data]);
          navigate(`/patients/${id}`);
        });
      } else {
        res.json().then((data) => {
          setErrors(data.errors);
        });
      }
    });
  };

  // UPDATE APPOINTMENT
  const updateAppointment = (patientId, appointmentId, appointmentData) => {
    // Convert the date to ISO 8601 format (YYYY-MM-DD)
    const isoDate = new Date(appointmentData.date).toISOString().split("T")[0];
    
    const modifiedAppointmentData = {
      ...appointmentData,
      date: isoDate,
    };

    return fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      // Use the correct URL format
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifiedAppointmentData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data.errors);
        });
      }
    });
  };

  // const updateAppointment = (id, patient_id, appointmentData) => {
  //   // Convert the date to ISO 8601 format (YYYY-MM-DD)
  //   const isoDate = new Date(appointmentData.date).toISOString().split("T")[0];

  //   const modifiedAppointmentDate = {
  //     ...appointmentData,
  //     date: isoDate,
  //   };

  //   return fetch(`/appointments/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(modifiedAppointmentDate),
  //   }).then((res) => {
  //     if (res.ok) {
  //       res.json().then((updatedAppointment) => {
  //         setAppointments((prevAppointments) =>
  //           prevAppointments.map((appointment) =>
  //             appointment.id === updatedAppointment.id
  //               ? { ...appointment, ...updatedAppointment }
  //               : appointment
  //           )
  //         );
  //         navigate(`/patients/${id}`);
  //       });
  //     } else {
  //       return res.json().then((data) => {
  //         setErrors(data.errors);
  //         throw new Error("Failed to update appointment.");
  //       });
  //     }
  //   });
  // };

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
        deletePatient,
        updatePatient,
        addAppointment,
        updateAppointment,
        appointments,
        setAppointments,
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
  
//create piece of state [currentUser] that mimics what we have in the backend re: `authenticate_user`. if we do have a current user let's update this piece of state. 
// Which of the routes do we need to pass this currentUser to ? 
  // signup '/signup'
  // login '/login'
  // user page '/users/:id'

// must listen for the status... (status.ok) so frontend knows what happened in the backend. if anything is outside of 200 range, we will return something that's not okay. if outside that range, go into our errors and render our errors. 

  
    //     .then((editedPatient) => {
  //       setPatients((patients) =>
  //         patients.map((patient) =>
  //           patient.id === id ? { ...patient, ...editedPatient } : patient
  //         )
  //       );
  // const updatePatient = (id, formData) => {
  //   console.log("Updating patient with ID:", id);
  //   console.log("Form data:", formData);

  //   return fetch(`/patients/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to update patient.");
  //       }

  //       return response.json();
  //     })
  //     .then((editedPatient) => {
  //       setPatients((patients) =>
  //         patients.map((patient) =>
  //           patient.id === id ? { ...patient, ...editedPatient } : patient
  //         )
  //       );

  //       return editedPatient;
  //     })
  //     .then((editedPatient) => {
  //       navigate(`/patients/${editedPatient.id}`);
  //     })
  //     .catch((error) => {
  //       setErrors([error.message]);
  //       throw error;
  //     });
  // };

  /*
  .then(res => {
    if(res.ok){
      deletePatient(patient.id)
      navigate(`/`)
    } else {
      res.json().then(data => setErrors(data.errors))
    }
  })
  */

  // ADD APPOINTMENT
  // const addAppointment = async (patientId, appointmentData) => {
  //   console.log(patientId);
  //   console.log(appointmentData);
  //   try {
  //     const response = await fetch(`/patients/${patientId}/appointments`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(appointmentData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add appointment.");
  //     }

  //     const newAppointment = await response.json();
  //     setAppointments([...appointments, newAppointment]);
  //     console.log("New Appointment:", newAppointment);
  //   } catch (error) {
  //     setErrors(["Failed to add appointment. Please try again later."]);
  //   }
  // };

  // UPDATE APPOINTMENT
  // const updateAppointment = (patientId, appointmentId, updatedData) => {
  //   console.log("Updating appointment with ID:", appointmentId);
  //   console.log("Updated appointment data:", updatedData);

  //   return fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updatedData),
  //   })
  //     .then((resp) => {
  //       if (!resp.ok) {
  //         throw new Error("Failed to update appointment.");
  //       }
  //       return resp.json();
  //     })
  //     .then((editedAppointment) => {
  //       setAppointments((appointments) =>
  //         appointments.map((appointment) =>
  //           appointment.id === appointmentId
  //             ? { ...appointment, ...editedAppointment }
  //             : appointment
  //         )
  //       );
  //       return editedAppointment;
  //     })
  //     .catch((error) => {
  //       setErrors([error.message]);
  //       throw error;
  //     });
  // };

  // DELETE APPOINTMENT
  // const deleteAppointment = (patientId, appointmentId) => {
  //   fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
  //     method: "DELETE",
  //   }).then(() => {
  //     setAppointments((appointments) =>
  //       appointments.filter((appointment) => appointment.id !== appointmentId)
  //     );
  //   });
  // };

          // addAppointment,
        // deleteAppointment,
        // updateAppointment,