import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./asset/logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    // DELETE '/logout'
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  };

  return (
    <div className="navbar">
      <header className="logo-container">
        <NavLink to="/">
          <img src={logo} alt="Meduvo Logo" />
        </NavLink>

      </header>
      {loggedIn ? (
        <>
          <h3>Hello, {user.username}</h3>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <div className="nav-links">

          <NavLink to="/login">
            <h5>Log In</h5>
          </NavLink>
          <NavLink to="/signup">
            <button className="small-button">Get Started</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;

// //-----------------

/*
The Navbar component:
It imports the necessary dependencies and resources, including React, the NavLink component from React Router, and a logo image.
Inside the component function, it declares the Navbar component and initializes the necessary state variables using the useState hook. These variables include menu for managing the navigation menu state, and user, logout, and loggedIn obtained from the UserContext using the useContext hook.
The logoutUser function is defined to handle the user logout functionality. It sends a DELETE request to /logout endpoint and, upon success, updates the user state using the logout function obtained from the UserContext and navigates the user to the home page.
The component renders a navigation bar with a logo, user greeting, and logout button if the user is logged in. Otherwise, it renders login and signup links/buttons.
The Navbar component is exported as the default export.
*/


// In the Navbar, I bring in user, logout, and loggedIn from context.
// I set logoutUser to hit my '/logout' route -> this takes them out of the session hash
// Then, I call logout over in context -> this sets loggedIn to false
// Finally, navigate to home.

/*
import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    // DELETE '/logout'
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        logout();
        navigate("/");
      })
  };

  return (
    <div className="highlight">
      {loggedIn ? (
        <>
          <h3>Hello, {user.username}</h3>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">
              <button>Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button>Signup</button>
          </NavLink>
          </>
      )}
    </div>
  );
};

export default Navbar;
*/
