import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const { login } = useContext(UserContext);
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

    fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            required
            onChange={handleChange}
            value={formData.email}
            type="text"
            name="email"
            placeholder="Email"
            className="input-text"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            required
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="input-text"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <br />
      <>
        <small>Don't have an account? <NavLink to="/signup">Sign up</NavLink></small>
      </>
    </div>
    
  );
};

export default Login;

/*
The Login component:
It imports the necessary dependencies and resources, including React, the NavLink component from React Router, and a logo image.
Inside the component function, it declares the Login component and initializes the necessary state variables using the useState hook.
The component renders a login form with input fields for username and password, and login button.
The Login component is exported as the default export.
*/
