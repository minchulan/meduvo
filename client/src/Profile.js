import React, { useContext,useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/user";

function Profile() {
  const { currentUser, logout, setErrors } = useContext(UserContext);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  // Filter appointments when categorySearchQuery or currentUser.appointments change
  const filteredAppointments = useMemo(() => {
    if (!currentUser) return []; 
    const normalizedCategorySearchQuery = categorySearchQuery.toLowerCase(); 
    if (!normalizedCategorySearchQuery) return currentUser.appointments; 
    return currentUser.appointments.filter(
      (appointment) =>
        appointment.category.toLowerCase() === normalizedCategorySearchQuery
    );
  }, [categorySearchQuery, currentUser]);

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
            setErrors(["Account deletion failed."]);
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };

  return (
    <div className="user-page-container">
      <h2>My Appointments</h2>
      <div>
        <label htmlFor="category-search">
          Search By Category:{" "}
          <select
            id="category-search"
            value={categorySearchQuery}
            onChange={(e) => setCategorySearchQuery(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="msc">MSC</option>
            <option value="Immunization">Immunization</option>
            <option value="mtm">MTM</option>
          </select>
        </label>
        <hr />
      </div>
      <ul className="appointments-list">
        {currentUser && currentUser.appointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <li className="appointment-card" key={appointment.id}>
              <Link
                to={`/appointments/${appointment.id}`}
                className="appointment-link"
              >
                <div className="appointment-details">
                  <p>
                    <span className="patient-name">
                      {appointment.patient.full_name}
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
