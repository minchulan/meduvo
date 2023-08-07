import React from "react";
import { NavLink } from "react-router-dom";

const AppointmentCard = ({ appointment }) => {
  const renderCategory = (category) => {
    switch (category) {
      case "mtm":
        return <span className="category-mtm">MTM</span>;
      case "msc":
        return <span className="category-msc">MSC</span>;
      case "immunization":
        return <span className="category-immunization">Immunization</span>;
      default:
        return <span className="category-common">{category}</span>;
    }
  };

  return (
    <div className="appointment-card">
      <div className="card-content">
        <h3>
          <NavLink to={`/appointments/${appointment.id}`}>{appointment.name}</NavLink>
        </h3>
        <p>Date: {appointment.date}</p>
        <p>Time: {appointment.time}</p>
        <p>Location: {appointment.location}</p>
        <p>Category: {renderCategory(appointment.category)}</p>
      </div>
    </div>
  );
};

export default AppointmentCard;
