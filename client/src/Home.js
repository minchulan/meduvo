import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser, loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <div className="home">
        <h3>Home</h3>
        {currentUser && (
          <h5 className="signed-in-user">
            Signed in: <em>{currentUser.email}</em>
          </h5>
        )}
        <br />
        <div className="home-buttons">
          <Link to="/patients">
            <button className="home-button">Patients</button>
          </Link>
          <Link to="/me">
            <button>Profile</button>
          </Link>
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div className="home-section">
        <h1 className="fun-heading">
          Easy <span className="accent-color">patient-care</span> scheduling
          ahead
        </h1>
        <h2>
          Meduvo is your scheduling management platform for patient care
          excellence — and so much more.
        </h2>
        <Link to="/signup">
          <button className="large-button">Start now</button>
        </Link>
        <br />
        <br />
        <br />
        <hr />
        <div className="features-section">
          <h1>Make the most of your Meduvo experience</h1>
          <div className="clickable-boxes">
            <Link to="/feature1" className="box-link">
              <div className="box">
                <h3>Feature 1</h3>
                <p>Explore Feature 1</p>
              </div>
            </Link>
            <Link to="/feature2" className="box-link">
              <div className="box">
                <h3>Feature 2</h3>
                <p>Discover Feature 2</p>
              </div>
            </Link>
            <Link to="/feature3" className="box-link">
              <div className="box">
                <h3>Feature 3</h3>
                <p>Experience Feature 3</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="landing-page">
          <h2>Get started in seconds</h2>
          <p>
            Meduvo is easy for all healthcare professionals to use, so you can
            keep your patients on track to better health.
          </p>
          <Link to="/signup">
            <button className="button">Sign up for free</button>
          </Link>
        </div>
        <br />
        <hr />
        <div className="easy-ahead-section">
          <h1>
            Easy <span className="accent-color">Ahead</span>
          </h1>
          <p>We take the admin work out so you can accomplish more.</p>
          <br />
          <Link to="/login">
            <button className="small-button">Set up my access</button>
          </Link>
        </div>
        <br />
        <br />
      </div>
    );
  }
};

export default Home;

//---------------------------------------------------

/*
Home page is an instructional landing page 
Click `Patients` button to get all of the patients.
Click `Profile` to get to your Appointments portfolio.

*/