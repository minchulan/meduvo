import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./asset/logo.png";

const Navbar = () => {
  const { logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <nav className="logo">
        <NavLink to="/">
          <img src={logo} alt="Meduvo Logo" />
        </NavLink>
      </nav>
      {loggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className="nav-links">
          <NavLink to="/contact">
            <h5>Contact Us</h5>
          </NavLink>
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
This code defines the Navbar component, which is responsible for rendering the navigation bar of the application.

1] Import the necessary dependencies - useContext, UserContext, NavLink. 
2] Define the `Navbar` component
3] Within the Navbar component:
  [] the useContext hook accesses the UserContext and retrieves the logout and loggedIn functions/values from it.
  [] the logoutUser function is defined, which sends a DELETE request to `/logout` and calls the logout function when the request is successful.
4] Render the HTML structure for the navigation bar:
  [] the NavLink component is used to create a link to the home page with the Meduvo logo as the navigation logo.
  [] Conditionally rendering the content based on whether the user is logged in or not:
      [] If loggedIn is true, render a logout button that calls the logoutUser function when clicked.
      [] If loggedIn is false, render the navigation links:
      [] Links to the "Contact Us" page and the "Log In" page are provided using NavLink.
      [] A link to the "Signup" page is provided with a "Get Started" button.
5] Exported `Navbar` component so that it can be used in other parts of the app. 
*/
