import React from "react";
import { CW_NAVBAR_LOGIN } from "../../Constants";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const history = useNavigate();
  return (
    <div style={{ float: "right", marginRight: "20px" }}>
      <button
        className="btn white black-text waves-effect waves-teal"
        onClick={() => history("/login")}
      >
        {CW_NAVBAR_LOGIN}
      </button>
    </div>
  );
};

export default LoginButton;
