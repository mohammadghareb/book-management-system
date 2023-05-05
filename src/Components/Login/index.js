import React, { useState, useEffect, useContext } from "react";
import firebase from "../../Configuration/Firebase";
import M from "materialize-css";
import { AuthContext } from "../../Helpers/AuthProvider";
import Buttons from "./Buttons";
import {
  CW_LOGIN_TITLE,
  CW_LOGIN_EMAIL,
  CW_LOGIN_PASSWORD,
} from "../../Constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (user) {
      history("/books");
    }
  }, [user, history]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (user) {
        history("/books");
      }
    } catch (error) {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
