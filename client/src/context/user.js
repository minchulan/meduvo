import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
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
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setLoggedIn(false);
          setUser(null);
          setErrors("Authentication failed. Please login.");
        } else {
          setLoggedIn(true);
          fetchPatients();
          fetchAppointments();
          // setPatients(data.patients)
        }
      });
  }, []);

  // GET '/patients/:patient_id/appointments', to: 'appointments#index'
  // POST '/patients/:patient_id/appointments', to: 'appointments#create'

  const fetchAppointments = () => {
    fetch("/appointments").then((res) => {
      if (res.ok) {
        res.json().then(setAppointments);
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  };

  // GET '/patients', to: 'patients#index'
  const fetchPatients = () => {
    fetch("/patients").then((res) => {
      if (res.ok) {
        res.json().then(setPatients);
      } else {
        res.json().then((data) => setErrors(data.error));
      }
    });
  };

  // ADD APPOINTMENT
  const addAppointment = (patientId, appointment) => {
    fetch(`/patients/${patientId}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments([...appointments, data]);
      })
      .catch((error) => {
        setErrors(error);
      });
  };

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
        setErrors(error);
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
    console.log(id);
    console.log(formData);
    return fetch(`/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response);
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
        return editedPatient; // Return the updated patient data
      })
      .catch((error) => {
        setErrors(error.message);
        throw error; // Re-throw the error to handle it in the component
      });
  };

  // UPDATE APPOINTMENT
  const updateAppointment = () => {

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
          setUser(data);
          setLoggedIn(true);
          navigate(`/`);
        } else {
          setErrors(data.errors);
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
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setUser(data);
          setLoggedIn(true);
          navigate(`/`);
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrors(["An error occurred during signup. Please try again."]);
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
        addPatient,
        deletePatient,
        updatePatient,
        updateAppointment,
        errors,
        setErrors,
      }}
    >
      {errors ? <h2>{errors.message}</h2> : children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };


  
  
//-----------------------------------------
/*
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
