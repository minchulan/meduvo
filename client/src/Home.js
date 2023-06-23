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

            <h3>Patients: </h3>
            {/* <ul>
          {user.patients.map((patient) => (
            <li key={patient.id}>
              {patient.first_name} {patient.last_name}
            </li>
          ))}
        </ul> */}
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>The ideal platform for patient care scheduling</h1>
        <p>
          Want to deliver patient care excellence? Meduvo is flexible and easy for
          all healthcare professionals to use, so you can stay organized throughout your patient's care.
        </p>
        <NavLink to="/signup">
          <button className="large-button">Get Started</button>
        </NavLink>
        <hr />
        <div className="how-it-works">
          <p>
            <b>How it works</b>
          </p>
        </div>
      </div>
    );
  }
};

export default Home;


//---------------------------
/*
In this updated version, the useEffect fetches the logged-in user's data, including patients and appointments, by making a request to /me. The user data is extracted from the response data.user and stored in the state.


Line 13: remove the line <p>{user.patients}</p> since user.patients is not provided in the context.
*/