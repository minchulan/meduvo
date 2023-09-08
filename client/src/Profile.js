import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/user";

function Profile() {
  const { currentUser, logout } = useContext(UserContext);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  // tell user in context that you have a new appointment 
  
  useEffect(() => {
    setSelectedCategory("all");
  }, [currentUser]);

  const goBack = () => navigate(-1);

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmation) {
      fetch(`/users/${currentUser.id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (resp.ok) {
            setDeleteSuccess(true);
            logout();
            navigate("/");
          } else {
            console.error("Account deletion failed.");
          }
        })
        .catch((error) => {
          console.error("Error occurred during account deletion:", error);
        });
    }
  };

  const filterAppointmentsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const sortedAppointments = [...(currentUser?.appointments || [])].sort(
    (a, b) =>
      a.patient.name.toLowerCase().localeCompare(b.patient.name.toLowerCase())
  );

  const filteredAppointments =
    selectedCategory === "all"
      ? sortedAppointments
      : sortedAppointments.filter(
          (appointment) =>
            appointment.category.toLowerCase() === selectedCategory
        );

  if (!currentUser) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="user-page-container">
      <h2>My Appointments</h2>
      <div className="category-filter">
        <button
          className="filter-button"
          onClick={() => filterAppointmentsByCategory("all")}
        >
          All
        </button>
        <button
          className="filter-button"
          onClick={() => filterAppointmentsByCategory("mtm")}
        >
          MTM
        </button>
        <button
          className="filter-button"
          onClick={() => filterAppointmentsByCategory("msc")}
        >
          MSC
        </button>
        <button
          className="filter-button"
          onClick={() => filterAppointmentsByCategory("immunization")}
        >
          Immunization
        </button>
      </div>
      <ul className="appointments-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <li
              className="appointment-card"
              key={appointment.id}
            >
              <Link
                to={`/appointments/${appointment.id}`}
                className="appointment-link"
              >
                <div className="appointment-details">
                  <p>
                    <span className="patient-name">
                      {appointment.patient.name}
                    </span>{" "}
                    ({appointment.patient.dob})
                  </p>
                  <p
                    className={`category-${appointment.category.toLowerCase()}`}
                  >
                    {appointment.category}
                  </p>
                  <p>Scheduled: {appointment.date}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>No appointments available.</li>
        )}
      </ul>
      <br />
      <button className="go-back-button" onClick={goBack}>
        ◁ Go Back
      </button>
      <hr />
      <div className="delete-account-section">
        <Link to="#" onClick={handleDeleteAccount}>
          Delete Account
        </Link>
        {deleteSuccess && (
          <div className="success-message">Account deleted successfully.</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
