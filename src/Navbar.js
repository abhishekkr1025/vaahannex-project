import React from "react";
import logo from "./Vaahannex.png";
import "./Navbar.css"; // Create a separate CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="VaahanNex Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li>About Us</li>
          <li>Services</li>
          <li>Contact Us</li>
          <li>Support</li>
        </ul>
      </nav>
      <button className="join-button">Join Us</button>
    </div>
  );
};

export default Navbar;
