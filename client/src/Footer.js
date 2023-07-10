import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="category">
          <h4>Meduvo</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Meduvo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
