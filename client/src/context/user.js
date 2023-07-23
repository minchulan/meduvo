import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [patients, setPatients] = useState([]);

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
        } else {
          setLoggedIn(true);
          fetchPatients()
          // setPatients(data.patients)
        }
      });
  }, [setPatients]);

  // GET '/patients', to: 'patients#index' 
  const fetchPatients = () => {
    fetch('/patients')
      .then(res => {
        if (res.ok) {
          res.json().then(setPatients)
        } else {
          res.json().then(data => setErrors(data.error))
      }
    })
  }

  // ADD PATIENT 
  const addPatient = (patient) => {
    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPatients([...patients, data])
      })
      .catch((error) => {
        setErrors(error);
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
      method: "DELETE"
    })
      .then(() => {
        setUser(null)
        setLoggedIn(false)
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
      value={{ user, login, logout, signup, loggedIn, patients, setPatients, addPatient, errors, setErrors }}
    >
      {errors ? <h2>{errors.message}</h2> : children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };


  
  
//-----------------------------------------
/*

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
