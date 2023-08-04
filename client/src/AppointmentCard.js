import React from "react";

const AppointmentCard = ({ appointment }) => {


  const renderCategory = (category) => {
    switch (category) {
      case "MTM":
        return <span className="category-mtm">MTM</span>;
      case "MSC":
        return <span className="category-msc">MSC</span>;
      case "IMMUNIZATIONS":
        return <span className="category-immunizations">Immunizations</span>;
      default:
        return <span>{category}</span>;
    }
  };

  return (
    <div className="appointment-card">
      <h3>{appointment.name}</h3>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
      <p>Location: {appointment.location}</p>
      <p>Category: {renderCategory(appointment.category)}</p>
    </div>
  );
};

export default AppointmentCard;
