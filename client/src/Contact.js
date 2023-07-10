import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { first_name, last_name, dob, address, phone, email, notes } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      first_name,
      last_name,
      dob,
      email,
      phone,
      address,
      notes,
    };

    fetch(`/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage("Form successfully sent.");
        setFormData("");
      });
  };

  return (
    <div className="contact-form">
      <h2>Talk to a healthcare professional</h2>
      <p>
        Fill out your information and a Meduvo professional will reach out to
        you. Have a simple question? Check out our <a href="/faqs">FAQs</a>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">
            First Name: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={first_name}
            type="text"
            name="first_name"
            id="first_name"
            autoComplete="on"
            placeholder="e.g., John"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            Last Name: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={last_name}
            type="text"
            name="last_name"
            id="last_name"
            autoComplete="on"
            placeholder="Smith"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">
            Date of birth: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={dob}
            type="date"
            name="dob"
            id="dob"
            autoComplete="on"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email: <span className="required-field">*</span>
          </label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            placeholder="name@example.com"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            Phone Number: <span className="required-field">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={phone}
            type="tel"
            name="phone"
            id="phone"
            autoComplete="on"
            placeholder="+1 555 655 5656"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            onChange={handleChange}
            value={address}
            type="text"
            name="address"
            id="address"
            autoComplete="on"
            placeholder="Enter your home address"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">What would you like to discuss? </label>
          <textarea
            required
            onChange={handleChange}
            value={notes}
            name="notes"
            id="notes"
            rows="4"
            autoComplete="on"
            placeholder="Tell us about yourself and provide some details about what you'd like to discuss."
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr />
    </div>
  );
};

export default Contact;
