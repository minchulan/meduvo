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
    }).then(() => {
      logout();
      navigate("/");
    });
  };

  return (
    <div className="navbar">
      {loggedIn ? (
        <>
          <h3>Hello, {user.username}</h3>
          <button onClick={logoutUser}>Logout</button>
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

//-----------------
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
