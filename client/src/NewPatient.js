import React, { useState } from 'react';

const NewPatient = ({patient}) => {
    const [newPatient, setNewPatient] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        notes: ""
    });
  
  console.log({patient})

    const { first_name, last_name, dob, address, phone, email, notes } = newPatient;

    const handleChange = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // persist new patient on server
        const patientObj = {
            first_name,
            last_name,
            dob,
            email,
            phone,
            address,
            notes,
        };
        // then use onAddNewPatient to add new patient to state
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            required
            onChange={handleChange}
            value={newPatient.first_name}
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
            value={newPatient.last_name}
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
            value={newPatient.dob}
            type="date"
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
            value={newPatient.email}
            type="email"
            name="email"
            placeholder="name@email.com"
            className="input-text"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            required
            onChange={handleChange}
            value={newPatient.phone}
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
            value={newPatient.address}
            type="text"
            name="address"
            placeholder="Enter your home address"
            className="input-text"
          />
        </div>
        <button type="submit">Add New Patient</button>
      </form>
    );
}

export default NewPatient;

//-----------
/*
newPatient is a child of the App component ? 
will render form 
add fetch logic to add a new patient ? 
*/
