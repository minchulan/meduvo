import React, { useContext } from 'react';
import { UserContext } from './context/user';
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
    const { user, loggedIn } = useContext(UserContext)
    const navigate = useNavigate()
   
    if (loggedIn) {
        return (
            <div>
                <h2>My Meduvo</h2>
                <hr />
                <p>{user.patients}</p>
            </div>
        )
    } else {
        return (
           <NavLink to="/login">Log in</NavLink>
        );
    }
}


export default Home;

