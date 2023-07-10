import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const { email, username, password } = formData;

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
      username,
      password,
    };

    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          console.log(data)
          login(data);
          navigate("/");
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrors(["An error occurred during login. Please try again."]);
      });
  };

  return (
    <div className="login">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChange}
            value={formData.username}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="input-text"
            autoComplete="on"
          />
        </div>
        <div>
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
            className="input-text"
            autoComplete="on"
          />
        </div>
        <div>
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
            className="input-text"
            autoComplete="on"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <br />
      <>
        <small>
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </small>
      </>
      <hr />
      <p style={{ fontSize: "14px", color: "red" }}>{errors}</p>
      {/* <div className="error">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div> */}
    </div>
  );
};

export default Login;

/*
This code defines the Login component, which represents the login form for the application. It handles the rendering and submission of the login form. It manages the form state, performs form validation, and communicates with the server to handle the login process: 

1] Import the necessary dependencies
2] Define the `Login` component
3] Within the Login component, do the following:
        [] Use the useState hook to define the form state (formData) with initial values for email and password.
        [] Use the useState hook to define the state for errors (errors).
        [] Use the useContext hook to access the UserContext and retrieve the login function from it.
        [] Use the useNavigate hook to get the navigation function for redirecting after successful login.
        [] Destructure email and password from the formData state.
        [] Define the handleChange function, which updates the form state (formData) when input fields change. It uses the spread operator to copy the existing formData and updates the specific field that triggered the change.
        [] Define the handleSubmit function, which handles the form submission:
                [] It prevents the default form submission behavior using e.preventDefault().
                [] It creates a user object with the email and password values from the form state.
                [] It sends a POST request to /login with the user data in the request body.
                [] It handles the response by checking if there are any errors:
                        [] If there are no errors (!data.errors), it calls the login function from the UserContext and passes the data response.
                        [] It then navigates the user to the home page (navigate("/")).
                        [] If there are errors, it sets the errors state to the received errors.
                [] If an error occurs during the request, it logs the error and sets a generic error message in the errors state.
4] Render the HTML structure for the login form:
        [] Display a heading indicating the purpose of the form.
        [] Render a form element with an onSubmit event handler set to handleSubmit.
        [] Inside the form, create two div elements for the email and password fields:
                [] Each div contains a label, an input field, and appropriate attributes and styles.
                [] The input fields are bound to the formData state and update the state using the handleChange function.
        [] Display a "Login" button to submit the form.
        [] Render a small text with a link to the signup page (/signup) for users who don't have an account.
        [] Add a horizontal line (<hr />) as a visual separator.
        [] Display any errors received during the login process.
5] Export the `Login` component so that it can be used in other parts of the app 
*/
