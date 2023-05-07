import React, { useContext, useEffect } from "react";
import { CW_NAVBAR_LOGOUT } from "../../Constants";
import { logout } from "../../Configuration/Firebase";
import { AuthContext } from "../../Helpers/AuthProvider";
const LogoutButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ float: "right", marginRight: "160px" }}>
      <div class="containerNav">
        <div class="sideNav">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="logo"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginTop: "12px",
            }}
          />
        </div>
        <div class="side side-content-centerNav">
          <div style={{ marginRight: "20px" }}>
            <p>{user?.displayName}</p>{" "}
          </div>

          <div>
            <button
              className="btn white black-text waves-effect waves-teal"
              onClick={() => logout()}
            >
              {CW_NAVBAR_LOGOUT}
            </button>{" "}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default LogoutButton;
