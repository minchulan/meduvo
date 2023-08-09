import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [contextErrors, setContextErrors] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  // GET '/me', to: 'users#show'
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Fetched data: ", data);
        console.log(data.patients);
        console.log(data.appointments);

        if (data.error) {
          setLoggedIn(false);
          setUser(null);
          setContextErrors("Authentication failed. Please login.");
        } else {
          setLoggedIn(true);
          setUser(data);

          await Promise.all([fetchPatients(), fetchAppointments()]);
        }
      } catch (error) {
        setContextErrors("Failed to fetch user data. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  // GET ALL APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await fetch("/appointments");

      if (res.ok) {
        const data = await res.json();
        // Filter the appointments to include only those associated with the current user's patients
        const userAppointments = data.filter((appointment) =>
          patients.some((patient) => patient.id === appointment.patient_id)
        );

        setAppointments(userAppointments);
        return data;
      } else {
        const data = await res.json();
        setContextErrors(data.error);
      }
    } catch (error) {
      setContextErrors(error.message);
    }
  };

  // GET ALL PATIENTS
  const fetchPatients = async () => {
    try {
      const res = await fetch("/patients");
      if (res.ok) {
        const data = await res.json();

        // // Filter the patients to include only those associated with the current user
        // const userPatients = data.filter(
        //   (patient) => patient.user_id === user.id
        // );

        setPatients(data);
        return data;
      } else {
        const data = await res.json();
        setContextErrors(data.error);
      }
    } catch (error) {
      setContextErrors(error.message);
    }
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
          // Update user state and set as logged in
          setUser(data);
          setLoggedIn(true);

          // Redirect to home page
          navigate(`/`);
        } else {
          // Set errors in the context
          setContextErrors(data.errors);
        }
      })
      .catch((error) => {
        // Handle login error and set error message
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
        if (res.ok) {
          return res.json(); // Return the JSON response if successful
        } else {
          throw new Error("Signup failed"); // Throw an error if signup fails
        }
      })
      .then((data) => {
        // Handle successful signup
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

  // CRUD HELPER METHODS - PATIENT & APPOINTMENT
  // ADD PATIENT
  const addPatient = (patient) => {
    // 1. persist on server
    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      // 2. add patient to state
      .then((data) => {
        setPatients([...patients, data]);
      })
      .catch((error) => {
        setContextErrors(error);
      });
  };

  // DELETE PATIENT
  const deletePatient = (id) => {
    // persist changes on server
    fetch(`/patients/${id}`, {
      method: "DELETE",
    }).then(() => {
      // shorten the list of patients - remove patient from state
      setPatients((patients) =>
        patients.filter((patient) => patient.id !== id)
      );
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
        console.log("Response from server:", response);

        if (!response.ok) {
          throw new Error("Failed to update patient.");
        }

        return response.json();
      })
      .then((editedPatient) => {
        // Update the patients state with the edited patient data
        setPatients((patients) =>
          patients.map((patient) =>
            patient.id === id ? { ...patient, ...editedPatient } : patient
          )
        );

        return editedPatient; // Return the updated patient data
      })
      .catch((error) => {
        // Handle and propagate the error to the component
        setContextErrors(error.message);
        throw error;
      });
  };

  // ADD APPOINTMENT
  const addAppointment = async (patientId, appointmentData) => {
    try {
      const response = await fetch(`/patients/${patientId}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to add appointment.");
      }

      const newAppointment = await response.json();
      setAppointments([...appointments, newAppointment]);
    } catch (error) {
      setContextErrors("Failed to add appointment. Please try again later.");
    }
  };

  // UPDATE APPOINTMENT
  const updateAppointment = async (patientId, appointmentId, updatedData) => {
    try {
      const response = await fetch(
        `/patients/${patientId}/appointments/${appointmentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointment: updatedData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update appointment.");
      }
      const editedAppointment = await response.json();
      // Update the appointments state with the edited appointment data
      setAppointments((appointments) =>
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, ...editedAppointment }
            : appointment
        )
      );
      return editedAppointment;
    } catch (error) {
      // Handle and propagate the error to the component
      setContextErrors(error.message);
      throw error;
    }
  };

  // DELETE APPOINTMENT
  const deleteAppointment = (patientId, appointmentId) => {
    // persist changes on server
    fetch(`/patients/${patientId}/appointments/${appointmentId}`, {
      method: "DELETE",
    }).then(() => {
      // Update appointments state to remove the deleted appointment
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
        contextErrors,
        setContextErrors,
      }}
    >
      {contextErrors ? <h2>{contextErrors.message}</h2> : children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };

  
//-----------------------------------------
/*
Thank you for providing the complete `UserProvider` component code. It appears to be the context provider that manages user-related data and interactions in your React application. Based on the code you've shared, I can confirm that you are setting up a `UserContext` which provides various functions and state variables to handle user authentication, patient, and appointment data. The context values are then consumed by components within your application to perform actions like signing up, logging in, managing patients, appointments, and more.

Here's a summary of what the `UserProvider` component does:

1. **State Variables:**
   - `user`: Stores user data once logged in or signed up.
   - `contextErrors`: Stores any errors encountered during context operations.
   - `loggedIn`: Indicates whether a user is logged in.
   - `patients`: Stores an array of patient data.
   - `appointments`: Stores an array of appointment data.

2. **Context Functions:**
   - `login`: Sends a POST request to log in a user, updating the `user` and `loggedIn` state variables.
   - `logout`: Sends a DELETE request to log out a user, resetting the `user` and `loggedIn` state variables.
   - `signup`: Sends a POST request to sign up a new user, updating the `user` and `loggedIn` state variables.
   - `addPatient`: Sends a POST request to add a new patient, updating the `patients` state.
   - `deletePatient`: Sends a DELETE request to delete a patient, updating the `patients` state.
   - `updatePatient`: Sends a PATCH request to update a patient's information, updating the `patients` state.
   - `addAppointment`: Sends a POST request to add a new appointment, updating the `appointments` state.
   - `deleteAppointment`: Sends a DELETE request to delete an appointment, updating the `appointments` state.

3. **Fetching Data:**
   - The `useEffect` hook fetches user data on component mount. If authenticated, it also fetches patients and appointments data.

4. **Context Provider:**
   - Provides the values and functions to the rest of the application using the `UserContext.Provider`.

5. **Error Handling:**
   - If `contextErrors` has a value, it displays the error message at the top level of the application.

6. **Usage of `navigate`:**
   - The `navigate` function from the `react-router-dom` is used to redirect users after successful login or signup.

This context provider is integral for managing user authentication and controlling access to patient and appointment data. However, for ensuring access control, you need to ensure that you correctly utilize these context values and functions within your components. Components that require authentication should check `loggedIn` before displaying sensitive information, and you should implement proper authorization checks based on user roles and permissions when fetching or manipulating patient and appointment data.

Remember, access control and security are complex topics. It's crucial to thoroughly test your application, consider different edge cases, and ensure that both frontend and backend are properly secured to prevent unauthorized access to sensitive data.

utilizing the useEffect hook to fetch user-related data and perform authentication when the component mounts.

well-structured functions for managing patients, appointments, login, logout, signup, and error handling.

  // const updatePatient = (id, formData) => {
  //   return fetch(`/patients/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((editedPatient) => {
  //       setPatients((patients) =>
  //         patients.map((patient) =>
  //           patient.id === id ? { ...patient, ...editedPatient } : patient
  //         )
  //       );
  //       return editedPatient; // Return the updated patient data
  //     })
  //     .catch((error) => {
  //       setErrors(error.message);
  //       throw error; // Re-throw the error to handle it in the component
  //     });
  // };

  // const updatePatient = async (id, formData) => {
  //   try {
  //     const response = await fetch(`/patients/${id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update patient.");
  //     }

  //     const editedPatient = await response.json();

  //     // Update the patients state with the edited patient
  //     setPatients((patients) =>
  //       patients.map((patient) =>
  //         patient.id === id ? { ...patient, ...editedPatient } : patient
  //       )
  //     );

  //     return editedPatient; // Return the updated patient data
  //   } catch (error) {
  //     setErrors(error.message);
  //     throw error; // Re-throw the error to handle it in the component
  //   }
  // };


updatePatient function: 

1. iterate over the elements in our array
2. check if the ID matches
3. If it does, return an updated object
4. Otherwise, return the original object 


The provided code for updating a patient's data is already quite concise and efficient. However, if you want to simplify it further, you can use `async/await` syntax to handle the asynchronous operations more cleanly. Additionally, you can use the `try/catch` block to handle errors in a more readable way. Here's the simplified version using `async/await`:

```jsx
const updatePatient = async (id, patientEdits) => {
  try {
    // 1. Persist changes on server
    const response = await fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientEdits),
    });

    if (!response.ok) {
      throw new Error("Failed to update patient data.");
    }

    // 2. Update patient in state
    const updatedPatient = await response.json();
    setPatients((patients) =>
      patients.map((patient) =>
        patient.id === id ? { ...patient, ...updatedPatient } : patient
      )
    );
  } catch (error) {
    setErrors(error.message);
  }
};
```

In this version, we use `async/await` to make the code more readable and handle the promise-based asynchronous operations. The `await` keyword is used to wait for the fetch operation to complete and receive the response. We then check if the response is successful (status code 200-299), and if not, we throw an error to be caught in the `catch` block.

Keep in mind that error handling and status checking are essential in real-world applications, so always include proper error handling in your code to handle various scenarios effectively.



general logic to UPDATE an array - use map function
  - iterate over the elements in our todo array
  - check if the ID matches
  - if it does, return an updated todo object
  - otherwise, return the original todo


 // `nfn` shortcut =->>  const first = (second) => { third }

// GET '/me', to: 'users#show'
  def show
    if current_user
      render json: current_user, status: :ok
    else
      render_unauthorized
    end
  end

// ApplicationController 
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) #memoization 
  end

  const [user, setUser] = useState(null); 
  //create piece of state that mimics what we have in backend of the current user. set to null or false for error handling conditional. If we do have our current user, then lets update this value, this piece of state, so that it has our currently logged in user and we're tracking of them also. 

All fetches that hit the backend can sit in your global state (i.e., fetches for login and signup )
This code sets up a user context with state management and provides functions to handle user login, logout, and signup. It also manages a list of patients, allowing components wrapped within the UserProvider to access and modify this data:

1] Import the necessary dependencies - useState, useEffect, createContext - from react.
2] Create new context using the `createContext` function.
3] Define `UserProvider` component, which serves as the provider for the user context and wraps around the components that need access to the context. 
4] Export the `UserContext` and `UserProvider` so that they can be used in other components.


Pro-tips: 
    [] include fetch calls in the same component as your top level state.


// Make a POST request to add the new patient
// in addPatient im taking in a patient because it's coming in from some form.
// fetching to '/patients' again but this time need a config object to send a POST request. Only strings can be sent across the internet. Need to give it this patient that has been given to me via form. The data is sending me back the one that was created. It gave me back one patient.  Were going to setPatients with the pre-existing data and adding that newly created data.
  // taking in the patient from the form in PatientList, posting it after I stringify it, and then adding it to the existing ones. 


  // get '/me' route => hits users#show to see if there's a user in the session hash. if yes, setUser(data) and setLoggedIn(true); otherwise catch error & setLoggedIn(false)
  // useEffect(() => {
  //   fetch("/me", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //       setLoggedIn(true);
  //       fetchPatients();
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoggedIn(false);
  //     });
  // }, []);
*/
