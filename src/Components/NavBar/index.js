import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CW_NAVBAR_TITLE, CW_NAVBAR_LOGOUT } from "../../Constants";
import { AuthContext } from "../../Helpers/AuthProvider";
import { logout } from "../../Configuration/Firebase";
const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar-fixed">
      <nav className="blue-grey darken-2">
        {user !== null ? (
          <div style={{ float: "right", marginRight: "20px" }}>
            <button
              className="btn white black-text waves-effect waves-teal"
              onClick={() => logout()}
            >
              {CW_NAVBAR_LOGOUT}
            </button>
          </div>
        ) : null}
        <div class="header--title">
          <Link to="/books">
            <span className="brand-logo">{CW_NAVBAR_TITLE}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
