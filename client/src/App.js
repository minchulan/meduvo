import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import { UserProvider } from "./context/user";
import Login from './Login';
import Signup from './Signup';

const App = () => {
  // const [patients, setPatients] = useState([]);
  // const [errors, setErrors] = useState(false);

  return (
    <main className={true ? "dark-mode" : ""}>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserProvider>
    </main>
  );
}

export default App;


//-----------------------------------
// <h1>Meduvo</h1>
// <p>
//   Meduvo is your patient scheduling automation platform for
//   eliminating back-and-forth emails with your patients for finding the
//   perfect time -- and so much more.
// </p>
