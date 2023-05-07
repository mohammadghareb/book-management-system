import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CW_NAVBAR_TITLE } from "../../Constants";
import { AuthContext } from "../../Helpers/AuthProvider";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const NavBar = () => {
  const { isAnonymous } = useContext(AuthContext);
  const pathName = useLocation().pathname;
  console.log(pathName === "/login", "pathName");
  return (
    <div className="navbar-fixed">
      <nav className="blue-grey darken-2">
        {pathName === "/login" ? null : isAnonymous ? (
          <LoginButton />
        ) : (
          <LogoutButton />
        )}
        <div class="header--title">
          <Link to="/">
            <span className="brand-logo">{CW_NAVBAR_TITLE}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
