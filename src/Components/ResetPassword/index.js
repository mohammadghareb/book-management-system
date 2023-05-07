import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../../Configuration/Firebase";
import { AuthContext } from "../../Helpers/AuthProvider";
import { CW_BACK_LOGIN } from "../../Constants";
import {
  CW_RESET_PASSWORD_TITLE,
  CW_RESET_PASSWORD_SEND_EMAIL,
} from "../../Constants";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);

  const history = useNavigate();
  useEffect(() => {
    if (user) {
      history("/");
    }
  }, [user, history]);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="container">
      <Link to="/" className="waves-effect waves-light btn">
        <i className="material-icons left">arrow_back</i>
        {CW_BACK_LOGIN}
      </Link>
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card hoverable">
            <div className="card-content">
              <h5 className="center">{CW_RESET_PASSWORD_TITLE}</h5>
              <div className="row">
                <div className="input-field col s9  offset-m2">
                  <i className="material-icons prefix">email</i>
                  <input
                    type="text"
                    className="validate"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="card-action center">
                <button
                  className="waves-effect waves-light btn"
                  style={{ margin: "18px" }}
                  onClick={() => sendPasswordReset(email)}
                >
                  {CW_RESET_PASSWORD_SEND_EMAIL}{" "}
                  <i className="material-icons right">add_circle_outline</i>
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default ResetPassword;
