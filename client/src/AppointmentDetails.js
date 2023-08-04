import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { appointmentId, patientId } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Fetch the specific appointment using the correct URL format for nested routes
    fetch(`/patients/${patientId}/appointments/${appointmentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAppointment(data);
      })
      .catch((error) => {
        console.error("Error fetching appointment details", error);
      });
  }, [appointmentId, patientId]); // Include both IDs in the dependency array

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!appointment) {
    return <div>No Appointment Found.</div>; // You can display a loading indicator while fetching data
  }

  return (
    <div>
      <h2>Appointment Details</h2>
      <div>
        <p>
          <b>Name: </b>
          {appointment.name}
        </p>
        <p>
          <b>Date:</b> {formatDate(appointment.created_at)}
        </p>
        <p>
          <b>Description: </b> {appointment.description}
        </p>
        <p>
          <b>Location:</b> {appointment.location}
        </p>
        <button onClick={goBack}>◁ Go Back</button>
      </div>
    </div>
  );
};

export default AppointmentDetails;

//-----------------------------------------
/*


Format Date logic: 
This code defines a function named `formatDate` that takes a `dateString` as input and returns a formatted date string.

1. `const formatDate = (dateString) => {`: This line starts the definition of the `formatDate` function and declares a parameter `dateString`, which is the date you want to format.

2. `const options = { year: "numeric", month: "2-digit", day: "2-digit" };`: Here, an `options` object is created to specify how the date should be formatted. The `toLocaleDateString` function, which is used later, takes this options object to format the date.

   - `year: "numeric"`: Formats the year as a full numeric value (e.g., "2023").
   - `month: "2-digit"`: Formats the month as a two-digit number (e.g., "01" for January).
   - `day: "2-digit"`: Formats the day as a two-digit number (e.g., "05" for the 5th day).

3. `return new Date(dateString).toLocaleDateString(undefined, options);`: This line does the actual formatting of the date. Here's what happens step by step:
   - `new Date(dateString)`: Converts the input `dateString` into a JavaScript `Date` object.
   - `.toLocaleDateString(undefined, options)`: Formats the `Date` object into a string using the specified options. The `undefined` parameter means to use the user's default locale for formatting.

When you call `formatDate("2023-08-04")`, it would return a formatted string like `"08/04/2023"` based on the specified formatting options. The `toLocaleDateString` function handles the details of converting the `Date` object into the desired format using the provided options.


---------------------------------


This code assumes that your appointment IDs are unique and match the id property of each appointment in the appointments array. It uses the useParams hook to extract the appointmentId from the URL, and then it finds the corresponding appointment in the appointments array based on the extracted ID. This appointment object is then used to display the appointment details in the component.
*/