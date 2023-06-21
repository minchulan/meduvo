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
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          signup(data)
          navigate('/')
        } else {
          setErrors(data.errors)
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setErrors(["An error occurred during signup. Please try again."]);
      });
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

// sign user in and redirect to their show page

// line 33: inform backend of new user, then check to see if any errors. if no errors, call signup(user) back over in context, which puts that user into context and sets the loggedIn user to true, then navigates to home page.
// const signup = (user) => {
    //setUser(user)
   //setLoggedIn(true)
// }
// Else, it clears the page, shows the errors and sets the errors into the errorsList so that it shows on the page 