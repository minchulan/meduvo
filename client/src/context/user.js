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
  }, [setPatients, setAppointments]);

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

  // GET ALL APPOINTMENTS 

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
        // first thing is to figure out how to retain my errors that occur: set state to an array
        resp.json().then((data) => {
          setErrors(Object.entries(data.errors).map((error) => `${error[0]} ${error[1]}`))
        });
      }
    });
  };

  // UPDATE A PATIENT
  const updatePatient = (id, formData) => {
    return fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // Update state with the new data
          setPatients((patients) =>
            patients.map((patient) =>
              patient.id === id ? { ...patient, data } : patient
            )
          );
          return data; // Return the response data
        });
      } else {
        return res.json().then((data) => {
          setErrors(
            Object.entries(data.errors).map(
              (error) => `${error[0]} ${error[1]}`
            )
          ); // Throw an error with the error message
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
        // If the delete request is successful, filter out the deleted patient
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== id)
        );
        // fetch patients again to ensure consistency (this allows me to not have to refresh page to see that the deleted patient was removed)
        fetchPatients();
        navigate(`/patients`);
      } else {
        // If the request fails, handle the error
        res.json().then((data) => {
          // Use setErrors to update the error state
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
      console.log(res);
      if (res.ok) {
        res.json().then((data) => {
          setAppointments((prevAppointments) => [...prevAppointments, data]);
          navigate(`/patients/${id}`);
        });
      } else {
        res.json().then((data) => {
          setErrors([data.errors]);
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
          setAppointments((appointments) =>
            appointments.map((appointment) =>
              appointment.id === appointmentId
                ? { ...appointment, ...data }
                : appointment
            )
          );
          return data;
        });
      } else {
        return res.json().then((data) => {
          setErrors([data.errors]);
          throw new Error("Appointment update failed.");
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
            // If the delete request is successful, filter out the deleted appointment
            setAppointments((prevAppointments) =>
              prevAppointments.filter((appointment) => appointment.id !== appointmentId)
            );
            // fetch patients again to ensure consistency (this allows me to not have to refresh page to see that the deleted patient was removed)
            navigate(`/patients`);
          } else {
            // If the request fails, handle the error
            res.json().then((data) => {
              // Use setErrors to update the error state
              setErrors([data.errors]);
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
        appointments,
        setAppointments,
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

  
  
  
//-------------------------------------------------------------------------

  // we need to create an array of errors. but we're getting an object due to our backend.
  // data
  // {errors: Array(2)}
  // data.errors
  // ["Title cant be blank", "Budget is not a number"]
  // so we can't set our errors to that object yet. We need to flatten the object first. We need to use Object.entries(data.errors): => [Array(2), Array(2)]
  // Bc we have an array, we want to produce a string of those error messages. Map over the errors, and produce a string from each one of these elements inside of the array.



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

DELETE PATIENT: The key change here is that we update the patients state immediately by filtering out the deleted patient when the response is successful (res.ok).

UPDATE PATIENT: The fetch request is made to the server to update the patient's data.
If the request is successful (res.ok is true), the new data received from the server is used to update the React state using setPatients. We use map to iterate through the current patients array, find the patient with the matching id, and merge the new data into that patient object.
If the request fails, it throws an error with the error message from the server response.
This approach ensures that the React state is updated only when the server successfully processes the update request, making it consistent with the server data.
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
