import React, { useState, useEffect } from "react";

const Patient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      {patients.map((patient) => (
        <div key={patient.id}>
          <h3>{patient.name}</h3>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Patient;
