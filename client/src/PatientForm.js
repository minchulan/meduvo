import React from 'react';

const PatientForm = () => {
    return (
      <div>

        <h2>Patient Form</h2>
      </div>
    );
}

export default PatientForm

/*
controlled form. 
react handles the dom. 
server-side and client-side validations. 

single form object vs. multiple pieces of state 
form object has all of the patient attributes that we want when making a new patient 
form in each of the inputs has value attribute, which references the formData. W/e value is in formData populates on form. 
this means we can put a handleChange on this input which will update the form value in state. 

HandleChange method grabs the target value and sets it to state automatically.

onSubmit method for forms, natural default is to send request. we stop that default behavior with e.preventDefault(). POST request sent to endpoint '/patients'

this is what we need to communicate from frontend to backend!
function onSubmit(e){
    e.preventDefault()
    // POST '/patients'
    fetch('/patients', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)  <---take the formData and stringify it. 
    })
    .then(res => console.log(res))
}

*/