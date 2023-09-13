import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

const initialFormDataState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormDataState);
  const { login, errors, setErrors } = useContext(UserContext);
  const { email, password } = formData;

  useEffect(() => {
    setErrors([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    login(user);
  };

  const ephemeralErrors = () => {
    if (errors && errors.length > 0) {
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  ephemeralErrors();

  return (
    <div className="login">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
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
          <b>Don't have an account? {"   "}</b>
          <u>
            <NavLink to="/signup">Sign up</NavLink>
          </u>
        </small>
      </>
      <hr />
      {errors && errors.length > 0 && (
        <div className="error-container">
          {errors}
        </div>
      )}
    </div>
  );
};

export default Login;