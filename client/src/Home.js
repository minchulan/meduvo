import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <div className="container">
        <h3>{user.username}'s Home Page</h3>
        <p>Welcome back, {user.username}! We're glad to have you here.</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>The ideal platform for cross-functional patient scheduling</h1>
        <p>
          Want to drive operational efficiency? Meduvo is flexible and easy for
          all healthcare professionals to use, so you can deliver quality
          patient care together, faster.
        </p>
        <NavLink to="/signup">
          <button className="large-button">Get Started</button>
        </NavLink>
        <hr />
        <div className="feature-section">
          <p>STREAMLINE YOUR PATIENTS AND APPOINTMENTS</p>
        </div>
      </div>
    );
  }
};

export default Home;