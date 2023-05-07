import React from "react";

import { CW_LOGIN_SIGNIN, CW_LOGIN_RESET } from "../../Constants";

const Buttons = ({ handleEmail, handlePassword }) => {
  return (
    <div className="card-action center">
      <button
        className="waves-effect waves-light btn"
        style={{ margin: "18px" }}
        type="submit"
      >
        {CW_LOGIN_SIGNIN}
        <i className="material-icons right">add_circle_outline</i>
      </button>
      <button
        className="waves-effect waves-light btn red"
        type="reset"
        onClick={() => {
          handleEmail("");
          handlePassword("");
        }}
      >
        {CW_LOGIN_RESET} <i className="material-icons right">cancel</i>
      </button>
    </div>
  );
};

export default Buttons;
