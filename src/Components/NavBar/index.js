import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="navbar-fixed">
        <nav className="blue-grey darken-4">
          <div className="container nav-wrapper">
           <Link to=""><span className="brand-logo">Book Management System</span></Link>
          </div>
        </nav>
      </div>
    )
}

export default NavBar;