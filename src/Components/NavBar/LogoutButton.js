import React from "react";
import { CW_NAVBAR_LOGOUT } from "../../Constants";
import { logout } from "../../Configuration/Firebase";

const LoginButton = () => {
  return (
    <div style={{ float: "right", marginRight: "20px" }}>
      <button
        className="btn white black-text waves-effect waves-teal"
        onClick={() => logout()}
      >
        {CW_NAVBAR_LOGOUT}
      </button>
    </div>
  );
};

export default LoginButton;
