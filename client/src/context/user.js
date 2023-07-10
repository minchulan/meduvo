import React, { useState, useEffect, createContext } from "react";

// Create Context
const UserContext = createContext();

// Create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
        .then((data) => {
        setUser(data);
        setLoggedIn(!!data);
      })
      .catch((error) => {
        setError(error);
        setLoggedIn(false);
      });
  }, []);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        loggedIn,
      }}
    >
      {error ? <h2>{error}</h2> : children}
    </UserContext.Provider>
  );
}

// Export
export { UserContext, UserProvider };

/*
This code sets up a user context with state management and provides functions to handle user login, logout, and signup. It also manages a list of patients, allowing components wrapped within the UserProvider to access and modify this data:

1] Import the necessary dependencies - useState, useEffect, createContext - from react.
2] Create new context using the `createContext` function.
3] Define `UserProvider` component, which serves as the provider for the user context and wraps around the components that need access to the context. 
4] Export the `UserContext` and `UserProvider` so that they can be used in other components.


Pro-tips: 
    [] include fetch calls in the same component as your top level state.
*/
