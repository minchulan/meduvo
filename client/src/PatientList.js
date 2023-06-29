import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link, useParams } from "react-router-dom";

const PatientList = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  console.log({user})

  return (
    <div className="patient-list">
      <h2>
        <u>
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</u>
        's
        Patients:
      </h2>
      <ul>
        {user.patients.map((patient) => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>
              {patient.first_name} {patient.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
