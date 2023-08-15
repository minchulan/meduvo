import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink } from "react-router-dom";

const initialFormDataState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormDataState);
  const { login } = useContext(UserContext);
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    login(user);
  };

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
      {/* <p style={{ fontSize: "14px", color: "red" }}>{errors}</p> */}
    </div>
  );
};

export default Login;