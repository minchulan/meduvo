import React, { useState, useEffect, createContext } from 'react';

// Create Context 
const UserContext = createContext();

// Create a provider component 
function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); 

    useEffect(() => {
        fetch('/me')
            .then(res => res.json())
            .then((data) => {
                setUser(data) 
                // setLoggedIn(!data.error);
                // data.error ? setLoggedIn(false) : setLoggedIn(true)
            });
    }, [])

    const login = (user) => {
        setUser(user)
        setLoggedIn(true)
    };

    const logout = () => {
        setUser(null)
        setLoggedIn(false)
    };

    const signup = (user) => {
        setUser(user)
        setLoggedIn(true)
    };

    
    return (
        <UserContext.Provider value={{user, login, logout, signup, loggedIn}}>
            {children}
        </UserContext.Provider>
    );
}

// Export 
export { UserContext, UserProvider };

    
//--------------------------------------
    // '/me' => makes a fetch to the backend to check the session hash. it checks to see if the user_id exists in sessions. if user is in sessions, continue to load app. If not, meaning no user is in session, load login.
    
    
// Here's a breakdown of the code:
// 1. Importing necessary dependencies:
//    - `React` is imported from the 'react' library.
//    - `useState` and `useEffect` are imported from the 'react' library for managing state and performing side effects.
//    - `createContext` is imported from the 'react' library for creating a new context.

// 2. Creating the UserContext:
//    - The `UserContext` is created using the `createContext()` function.

// 3. Creating the UserProvider component:
//    - The `UserProvider` component is defined. It takes `children` as a prop, which represents the nested child components.

// 4. Setting up state and effect:
//    - Inside the `UserProvider` component, two state variables are defined using the `useState` hook:
//      - `user`: Represents the user data. It is initially set to `null`.
//      - `loggedIn`: Represents the login status. It is initially set to `false`.

//    - An effect is created using the `useEffect` hook:
//      - The effect runs once, immediately after the component is mounted.
//      - It makes a GET request to the '/me' endpoint to fetch user data.
//      - The response data is parsed as JSON.
//      - If the response contains an error (`data.error` is truthy), `loggedIn` is set to `false`. Otherwise, `loggedIn` is set to `true`, indicating the user is logged in.

// 5. Defining login, logout, and signup functions:
//    - The `login`, `logout`, and `signup` functions are defined.
//    - `login` sets the `user` and `loggedIn` state to the provided user data and `true`, respectively.
//    - `logout` sets the `user` state to `null` and `loggedIn` state to `false`.
//    - `signup` sets the `user` and `loggedIn` state to the provided user data and `true`, respectively.

// 6. Providing the context value:
//    - The `UserContext.Provider` component is rendered, wrapping the `children` components.
//    - The value prop of `UserContext.Provider` is set to an object containing the `user`, `login`, `logout`, `signup`, and `loggedIn` values.
//    - This makes these values accessible to all the components that consume this context.

// 7. Exporting the UserContext and UserProvider:
//    - The `UserContext` and `UserProvider` are exported so that other components can import and use them.

// This UserContext file provides a way to manage user authentication and share user-related data and functions across different components using the `UserProvider` component and `UserContext` context.
    
    
    
// ## A CLEANER WAY TO DO USER LOGIN, LOGOUT, AND SIGNUP ##
    
// add another function to my user context - state called loggedIn
// if there's an error on the '/me' route, setLoggedIn to false, vice versa.
// Essentially, did I get a user back or did I not ?
// The minute setLoggedIn is true, pass it into context to every component that needs it.
// Now, all the component needs to do is check if user is loggedIn (true or false).
    
// Line 20: if login, setUser into context and change loggedIn to true
// Line 25: if logout, get rid of user and set loggedIn to false 
// Line 30: if signup, set the user and loggedIn to true 

// When I refresh the page, no matter where I am because it's going to hit this context, useEffect will hit the '/me' route, '/me' route checks users#show to see if there is a user in the session hash. if yes, returns user. if no, returns an error. i set the user because I need to have access to that error, and set loggedIn to true or false depending on what I get back. 