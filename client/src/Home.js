import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);

  const capitalizeUsername =
    user && user.username
      ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
      : user && user.email;

  if (loggedIn) {
    return (
      <div className="home">
        <h1>Welcome, {capitalizeUsername}</h1>
        <p>Optimize your patient schedules and get the most out of Meduvo</p>
        <div className="home-buttons">
          <Link to="/patients">
            <button className="home-button">My Account</button>
          </Link>
          <Link to="/appointments">
            <button className="home-button">Create New Event Type</button>
          </Link>
        </div>
        <hr />
      </div>
    );
  } else {
    return (
      <div className="home-section">
        <h1 className="fun-heading">
          Easy <span className="accent-color">patient-care</span> scheduling
          ahead
        </h1>
        <h2>
          Meduvo is your scheduling management platform for patient care
          excellence — and so much more.
        </h2>
        <Link to="/signup">
          <button className="large-button">Start now</button>
        </Link>
        <br />
        <br />
        <br />
        <hr />
        <div className="features-section">
          <h1>Make the most of your Meduvo experience</h1>
          <div className="clickable-boxes">
            <Link to="/feature1" className="box-link">
              <div className="box">
                <h3>Feature 1</h3>
                <p>Explore Feature 1</p>
              </div>
            </Link>
            <Link to="/feature2" className="box-link">
              <div className="box">
                <h3>Feature 2</h3>
                <p>Discover Feature 2</p>
              </div>
            </Link>
            <Link to="/feature3" className="box-link">
              <div className="box">
                <h3>Feature 3</h3>
                <p>Experience Feature 3</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="landing-page">
          <h2>Get started in seconds</h2>
          <p>
            Meduvo is easy for all healthcare professionals to use, so you can
            keep your patients on track to better health.
          </p>
          <Link to="/signup">
            <button className="button">Sign up for free</button>
          </Link>
        </div>
        <br />
        <hr />
        <div className="easy-ahead-section">
          <h1>
            Easy <span className="accent-color">Ahead</span>
          </h1>
          <p>We take the admin work out so you can accomplish more.</p>
          <br />
          <Link to="/login">
            <button className="small-button">Set up my access</button>
          </Link>
        </div>
        <br />
        <br />
      </div>
    );
  }
};

export default Home;

//---------------------------
/*
This defines a functional component named Home. This code sets up a basic kanban board template with a "To Do", "Doing", and "Done" columns, and patientCards that can be dragged and dropped.

useContext is used to access the UserContext and retrieve the user and loggedIn values.

DragDropContext, Droppable, and Draggable from the "react-beautiful-dnd" package: These components are used to implement drag and drop functionality.

Use the useState hook to define the patientCards state variable. It is initialized with an empty array of patientCards. These essentially represent the tasks present in the sprint board.

Define the handleDragEnd function. This function is called when a draggable item is dropped. It receives a result object containing information about the drag and drop operation. It checks if there is a valid destination for the 'task' and updates the patientCards state accordingly.

Return the JSX code that represents the kanban board template:
The kanban board is wrapped in a div with a class name of "kanban-board".

The DragDropContext component is used to wrap the entire kanban board and provide the drag and drop context. It receives the handleDragEnd function as a prop.

Inside the DragDropContext, there is a div representing a column with a class name of "kanban-column".
Each column has a heading representing its status, such as "To Do".

Inside each column, there is a Droppable component representing the task list. It receives a unique droppableId prop, such as "todo". It also receives a render prop function that provides the necessary props for handling the drop operation.

Inside the Droppable, there is a div with a class name of "kanban-column__tasks" that represents the list of tasks.

*/
