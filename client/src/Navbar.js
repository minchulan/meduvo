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