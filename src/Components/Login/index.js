import React, { useState, useEffect, useContext } from "react";
import { logInWithEmailAndPassword } from "../../Configuration/Firebase";
import M from "materialize-css";
import { AuthContext } from "../../Helpers/AuthProvider";
import Buttons from "./Buttons";
import {
  CW_LOGIN_TITLE,
  CW_LOGIN_EMAIL,
  CW_LOGIN_PASSWORD,
  CW_LOGIN_DONT,
  CW_LOGIN_FORGET,
} from "../../Constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { user, setIsAnonymous, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (user) {
      setIsAnonymous(false);
      history("/");
    } else {
      setIsAnonymous(true);
    }
  }, [user, history]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await logInWithEmailAndPassword(email, password);
      if (user) {
        setUser(user);
        setIsAnonymous(false);

        history("/");
      }
    } catch (error) {
      setIsAnonymous(true);

      M.toast({ html: `${error.message}`, classes: "red rounded" });
    }
  };
  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card hoverable">
          <div className="card-content">
            <h5 className="center">{CW_LOGIN_TITLE}</h5>
            <form onSubmit={login}>
              <div className="row">
                <div className="input-field col s12 m8 offset-m2">
                  <i className="material-icons prefix">email</i>
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">{CW_LOGIN_EMAIL}</label>
                </div>
                <div className="input-field col s12 m8 offset-m2">
                  <i className="material-icons prefix">keyboard_hide</i>
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">{CW_LOGIN_PASSWORD}</label>
                </div>
              </div>
              <Buttons handleEmail={setEmail} handlePassword={setPassword} />
            </form>
            <div
              style={{
                marginLeft: "150px",
                display: "row",
                flexDirection: "row",
              }}
            >
              {" "}
              <div>
                <Link to="/reset">{CW_LOGIN_FORGET}</Link>
              </div>
              <div>
                {CW_LOGIN_DONT} <Link to="/register">Register</Link> now.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
