import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/user"; 

function UserPage() {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser.appointments)
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  // Sort appointments by date in ascending order
  const sortedAppointments = currentUser.appointments.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if(!currentUser) <h2>Loading user data...</h2>

  return (
    <div>
      <h2>My Appointments</h2>
      <ul className="appointments-list">
        {sortedAppointments.map((appointment) => (
          <li className="appointment-card" key={appointment.id}>
            <Link
              to={`/appointments/${appointment.id}`}
              className="appointment-link"
            >
              <div className="appointment-details">
                <p>
                  <span className="patient-name">
                    {appointment.patient.name}
                  </span>{" "}
                  - {appointment.patient.dob}
                </p>
                <p>
                  {appointment.name} : {appointment.category}
                </p>
                <p>Scheduled Date: {appointment.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button className="go-back-button" onClick={goBack}>
        ◁ Go Back
      </button>
    </div>
  );
}

export default UserPage;
