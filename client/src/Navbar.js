import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./asset/logo.png";

const Navbar = () => {
  const { logout, loggedIn, currentUser } = useContext(UserContext);
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
      {currentUser && loggedIn ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/me">Profile</NavLink>
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

/*
protect client-side routes from unauthorized user. The nav links rendered are different based on if a user is logged in or not. 
  - If user is logged in, Navbar renders rest of our router: Home, Patients, and Profile nav links. 

  - If user is not logged in, Navbar renders Login, as well as Signup and Contact us nav links. 
*/
