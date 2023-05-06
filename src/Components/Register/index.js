import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import M from "materialize-css/dist/js/materialize.min.js";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../Configuration/Firebase";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      history("/");
    }
  }, [user, history]);
  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();
    M.AutoInit();

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password);
    const newAuthor = {
      name,
      email,
      birthDate,
      authorBio,
    };

    addDoc(collection(db, "authors"), newAuthor)
      .then(() => {
        M.toast({
          html: "Author added succesfully",
          classes: "green darken-1 rounded",
        });
        setIsLoading(false);
      })
      .catch(() => {
        M.toast({
          html: "Something went wrong. Please try again.",
          classes: "red darken-1 rounded",
        });
        setIsLoading(false);
      });
    history("/books");
  };

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner" />
    </div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m2">
          <div className="card">
            <div className="card-content">
              <h5 className="card-title center">Register</h5>
              <div className="row">
                <form
                  encType="multipart/form-data"
                  onSubmit={registerWithEmailAndPassword}
                >
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="name"
                        type="text"
                        className="validate"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="title">Full Name</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="email"
                        type="text"
                        className="validate"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email">E-mail Address</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="Password">Password</label>
                    </div>
                    <div className="input-field col s5">
                      <input
                        id="birthDate"
                        type="date"
                        className="validate"
                        onChange={(e) => setBirthDate(e.target.value)}
                        value={birthDate}
                      />
                      <label htmlFor="birthDate">BirthDate</label>
                    </div>
                    <div className="input-field col s10">
                      <textarea
                        className="materialize-textarea"
                        id="authorBio"
                        type="date"
                        onChange={(e) => setAuthorBio(e.target.value)}
                        value={authorBio}
                      ></textarea>
                      <label htmlFor="authorBio">Author Bio</label>
                    </div>
                  </div>

                  <div className="center">
                    <button
                      className="waves-effect waves-light btn"
                      style={{ margin: "8px 18px" }}
                      type="submit"
                    >
                      Register{" "}
                      <i className="material-icons right">add_circle_outline</i>
                    </button>
                    <div>
                      Already have an account? <Link to="/">Login</Link> now.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default Register;
