import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

const initialFormDataSignUp = {
  email: "",
  password: ""
};
const Signup = () => {
  const [formData, setFormData] = useState(initialFormDataSignUp);
  const { signup } = useContext(UserContext);
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.password);
    const user = {
      email: formData.email,
      password: formData.password,
    }
    signup(user);
  };

  if (errors) {
    setErrors(errors)
  };

  return (
    <div className="signup">
      <h2>You're one click away from less busywork</h2>
      <form onSubmit={handleSubmit}>
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
      <small>
        <p>
          By clicking on sign-up, you agree to Meduvo's{" "}
          <NavLink>Terms and Conditions of Use</NavLink>.
        </p>
      </small>
      <br />
      <>
        <small>
          <b>Have an account already?</b>{" "}
          <u>
            <NavLink to="/login">Log in</NavLink>
          </u>
        </small>
      </>
      <hr />
      {errors}
    </div>
  );
};

export default Signup; 



//-----------------------------------
/*

handleSubmit:
    user fills out the form and submits, signup() method is called (over in user context), which makes a fetch POST request to our server there. if everything goes good, we get our user back. Then we're going to update our user in state [user] with the setter callback function [setUser] and pass in the user (setUser(data)). Our user (aka current user) keeps track of the newly created user. We have access now the current user in the backend and mimicking that in the frontend. 

   
  // informed the backend of the new user, then checks to see if any errors. If no errors, calls signup user over in context which setsLoggedIn(true), navigates to homepage; else setErrors(data.errors)


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
