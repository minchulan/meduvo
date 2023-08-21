import React from "react";
import { NavLink } from "react-router-dom";

const AppointmentCard = ({ appointment, onDelete, onUpdate }) => {
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
        <p>{renderCategory(appointment.category)}</p>
        <h3>{appointment.name}</h3>
        <p>Date: {appointment.date}</p>
        <p>Location: {appointment.location}</p>
        <p>Details: {appointment.description}</p>
        <div className="card-actions">
          <button className="edit-button" onClick={() => onUpdate(appointment.id)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(appointment.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
