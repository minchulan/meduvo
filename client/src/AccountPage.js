import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="account-page">
      <h1>Welcome, {user.username}</h1>
      <h2>My Patients:</h2>
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

export default AccountPage;
