import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        notes: ""
    });

    const [successMessage, setSuccessMessage] = useState("");

    const {first_name, last_name, dob, address, phone, email, notes } = formData

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
            notes
        };

        fetch(`/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage("Form successfully sent.")
            })

        return (
          <div>
            <h2>Talk to a healthcare professional</h2>
            <p>
              Fill out your information and a Meduvo professional will reach out
              to you. Have a simple question? Check out our FAQ.
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="first_name">First Name</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.first_name}
                  type="text"
                  name="first_name"
                  placeholder="e.g., John"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.last_name}
                  type="text"
                  name="last_name"
                  placeholder="Smith"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="dob">Date of birth</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.dob}
                  type="data"
                  name="dob"
                  placeholder="YYYY-MM-DD"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  name="dob"
                  placeholder="name@email.com"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.phone}
                  type="tel"
                  name="phone"
                  placeholder="+1 555 655 5656"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.address}
                  type="text"
                  name="phone"
                  placeholder="Enter your home address"
                  className="input-text"
                />
              </div>
              <div>
                <label htmlFor="notes">What would you like to discuss?</label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.notes}
                  type="text"
                  name="notes"
                  placeholder="Tell us about yourself and provide some details about what you'd like to discuss."
                  className="input-text"
                />
              </div>
            </form>
          </div>
        );
    }
}

export default Contact