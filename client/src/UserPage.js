import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function UserPage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    fetch(`/me`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch user data.");
        }
      })
      .then((user) => {
        console.log(user);
        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, [id]);

  const goBack = () => {
    navigate(`/`);
  };

  if (loading) return <h1>Loading...</h1>;
  if (errors) return <h1>{errors}</h1>;

  // Sort appointments by date in ascending order
  const sortedAppointments = user.appointments.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      <h1>{user.name}</h1>
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
                  {appointment.name} - {appointment.category}
                </p>
                <p>Scheduled Date: {appointment.date}</p>
                <p>Site Location: {appointment.location}</p>
                <p>Description: {appointment.description}</p>
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
