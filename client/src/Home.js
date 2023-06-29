import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <div className="home">
        <h1>
          {" "}
          Welcome,{" "}
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </h1>
        <p>Optimize your scheduling and get the most out of Meduvo</p>
        <div className="home-buttons">
          <Link to="/patients">
            <button className="home-button">My account</button>
          </Link>
          <Link to="/appointments">
            <button className="home-button">Create new event type</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home-section">
        <h1 className="fun-heading">
          Easy <span style={{ color: "#0000ff" }}>patient-care</span> scheduling
          ahead
        </h1>
        <p style={{ fontSize: "20px" }}>
          Meduvo is your scheduling management platform for patient care
          excellence — and so much more.
        </p>
        <Link to="/signup">
          <button className="large-button">Get Started</button>
        </Link>
        <hr />
        <>
          <h2>How it works</h2>
          <img src="" alt="ADD DEMO SCREENSHOTS" />
          <br />
          <br />
          <p>
            Meduvo is easy for all healthcare professionals to use, so you can
            keep your patients on track to better health.
          </p>
          <p>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Namhendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus
            rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae
            volutpat.Nulla aliquet porttitor venenatis. Donec a dui et dui
            fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut
            dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia
            lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui
            ac, convallis semper risus. In adipiscing ultrices tellus, in
            suscipit massa vehicula eu.”
          </p>
          <button>Learn more</button>
          <br />
          <br />
          <br />
          <hr />
        </>
        <div className="landing-page">
          <h2>Get started in seconds</h2>
          <Link to="/signup">
            <button>Sign up for free</button>
          </Link>
          <br />
          <br />
          <br />
        </div>
        <>
          <hr />
          <h1>
            <b>
              Easy <span style={{ color: "#0000ff" }}>Ahead</span>
            </b>
          </h1>
          <p style={{ fontSize: "20px" }}>
            We take the admin work out so you can accomplish more.
          </p>
        </>
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
