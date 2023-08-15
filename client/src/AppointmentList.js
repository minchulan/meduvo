import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import AppointmentCard from "./AppointmentCard";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const { appointments } = useContext(UserContext);
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  if (!appointments) {
    return <div>Loading appointments...</div>;
  }

  const filteredAppointments = categoryFilter
    ? appointments.filter(
        (appointment) =>
          appointment.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    : appointments;

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>
      <div className="filter-container">
        <label htmlFor="category-filter">Filter By Category:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="MTM">MTM</option>
          <option value="MSC">MSC</option>
          <option value="IMMUNIZATION">Immunization</option>
        </select>
      </div>

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <p>
          <b>
            <em>No appointments found in this category</em>
          </b>
        </p>
      )}
      <br />
      <hr />
      <br />
      <button className="go-back-button" onClick={goBack}>
        ◁ Go Back
      </button>
    </div>
  );
};

export default AppointmentList;