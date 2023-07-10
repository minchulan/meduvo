import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

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

    fetch(`/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          signup(data);
          navigate("/");
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrors(["An error occurred during signup. Please try again."]);
      });
  };


  return (
    <div className="signup">
      <h2>You're one click away from less busywork</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChange}
            value={formData.username}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="form-control"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.email}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
            autoComplete="on"
          />
        </div>
        <button className="btn" type="submit">
          Sign up
        </button>
      </form>
      <div className="error">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Signup;

/*
This code defines the Signup component, which represents the signup form for the application. It handles the rendering and submission of the signup form. It manages the form state, performs form validation, and communicates with the server to handle the signup process.

1] Import the necessary dependencies
2] Define the `Signup` component
3] Within the Signup component, do the following:
  [] Use the useState hook to define the form state (formData) with initial values for username, email, and password.
  [] Use the useState hook to define the state for errors (errors).
  [] Use the useContext hook to access the UserContext and retrieve the signup function from it.
  [] Use the useNavigate hook to get the navigation function for redirecting after successful signup.
  [] Destructure email and password from the formData state.
  [] Define the handleChange function, which updates the form state (formData) when input values change.
  [] Define the handleSubmit function, which is called when the signup form is submitted:
        [] It prevents the default formsubmission behavior using e.preventDefault().
        [] It creates a user object with the email and password values from the form state.
        [] It sends a POST request to /signup with the user data in the request body.
        [] It handles the response by checking if there are any errors:
                [] If there are no errors (!data.errors), it calls the signup function from the UserContext and passes the data response.
                [] It then navigates the user to the home page (navigate("/")).
                [] If there are errors, it sets the errors state to the received errors.
        [] If an error occurs during the request, it logs the error and sets a generic error message in the errors state.
4] Render the HTML structure for the signup form:
    [] Display a heading indicating the purpose of the form.
    [] Render a form element with an onSubmit event handler set to handleSubmit.
    [] Inside the form, create two form groups for the email and password fields:
                []Each form group contains a label, an input field, and appropriate attributes and styles.
                [] The input fields are bound to the formData state and update the state using the handleChange function.
    [] Display a "Sign up" button to submit the form.
    [] Render any errors in a separate div element.
    [] Add a horizontal line (<hr />) as a visual separator.
5] Export the `Signup` component so that it can be used in other parts of the app. 
*/
