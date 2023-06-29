import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <div className="home">
        <h1>Welcome back, {user.username}</h1>
        <p>Optimize your scheduling and get the most out of Meduvo</p>
        <div className="home-buttons">
          <Link to="/account">
            <button>My account</button>
          </Link>
          <Link to="/appointments">
            <button>Create new event type</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home-section">
        <h1>The ideal platform for patient care scheduling</h1>
        <p>
          Want to deliver patient care excellence? Meduvo is flexible and easy
          for all healthcare professionals to use, so you can stay organized
          throughout your patient's care.
        </p>
        <Link to="/signup">
          <button className="large-button">Get Started</button>
        </Link>
        <hr />
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
