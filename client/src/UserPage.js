import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/user"; 

function UserPage() {
  const { currentUser, logout } = useContext(UserContext);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmation) {
      fetch(`/users/${currentUser.id}`, {
        method: "DELETE",
      })
        .then(function (response) {
          if (response.ok) {
            setDeleteSuccess(true);
            logout();
            navigate("/");
          } else {
            console.error("Account deletion failed.");
          }
        })
        .catch(function (error) {
          console.error("Error occurred during account deletion:", error);
        });
    }
  };

  const filterAppointmentsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredAppointments =
    selectedCategory === "all"
      ? currentUser.appointments
      : currentUser.appointments.filter(
          (appointment) =>
            appointment.category.toLowerCase() === selectedCategory
        );

  if (!currentUser) <h2>Loading user data...</h2>;

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
        {filteredAppointments.map((appointment) => (
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
                  ({appointment.patient.dob})
                </p>
                <p className={`category-${appointment.category.toLowerCase()}`}>
                  {appointment.category}
                </p>
                <p>Scheduled: {appointment.date}</p>
              </div>
            </Link>
          </li>
        ))}
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

export default UserPage;


/*
  // Sort appointments by date in ascending order
  const sortedAppointments = currentUser.appointments.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  filterAppointmentsByCategory, is responsible for updating the selectedCategory state with the category that is passed as an argument when one of the filter buttons is clicked

  filteredAppointments array will be displayed based on the selected category - ternary operator to check whether the selectedCategory is "all". If it is, it simply assigns the original currentUser.appointments array to filteredAppointments, showing all appointments. If the selectedCategory is not "all", it performs a filter operation on the currentUser.appointments array. It uses the filter function to iterate through each appointment and checks if the appointment.category (converted to lowercase) matches the selectedCategory. Only appointments with a matching category will be included in the filteredAppointments array.
*/
