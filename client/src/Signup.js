import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

const initialFormDataSignUp = {
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialFormDataSignUp);
  const { signup, showForm, errors, setErrors } = useContext(UserContext);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    signup(user);
  };

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setTimeout(() => {
        setErrors([]); // Clear the errors after 5 seconds
      }, 3000);
    }
  };

  ephemeralErrors();

  return (
    <div className="signup">
      {showForm && (
        <>
          <h2>You're one click away from less busywork</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email: <span className="required-field">*</span>
              </label>
              <input
                onChange={handleChange}
                value={email}
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password: <span className="required-field">*</span>
              </label>
              <input
                onChange={handleChange}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <button className="btn" type="submit">
              Sign up
            </button>
          </form>
          <small>
            <b>
              By clicking on sign-up, you agree to Meduvo's{" "}
              <NavLink to="/terms">Terms and Conditions of Use</NavLink>.
            </b>
          </small>
          <br />
          <br />
          <small>
            <b>Have an account already?</b>{" "}
            <u>
              <NavLink to="/login">Log in</NavLink>
            </u>
          </small>
          <hr />
          {errors && errors.length > 0 && (
            <div className="error-container">{errors}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Signup;

/*
signup flow: user fills out the form and submits. we call signup over in context, where it sends a fetch request to our server (post request). if everything goes good, we get our user back. 

our current user is keeping track of our newly created user.
*/