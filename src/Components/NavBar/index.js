import React from "react";
import { Link } from "react-router-dom";
import CW_NAVBAR from "../../Constants"

const NavBar = () => {
    return (
      <div className="navbar-fixed">
        <nav className="blue-grey darken-4">
          <div className="container nav-wrapper">
           <Link to=""><span className="brand-logo">{CW_NAVBAR}</span></Link>
          </div>
        </nav>
      </div>
    )
}

export default NavBar;