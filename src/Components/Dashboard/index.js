import React, { useState, useEffect, useContext } from "react";
 import { Link } from "react-router-dom";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import {CW_MANAGE_BOOKS,CW_ADD_BOOK,CW_SEARCH_BY_TITLE, CW_SEARCH_BY_AUTHOR} from "../../Constants"
import Books from "./Books"
import firebase from "../../Configuration/Firebase"
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const db = firebase.firestore();
  const booksRef = db.collection('books');
  const history = useNavigate();

  useEffect(() => {
    if (!user) {
      history("/");
    }
    setIsLoading(true);
    const unsubscribe = booksRef
      .onSnapshot(
        snapshot => {
          const allBooks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBooks(allBooks);
          setIsLoading(false);
        },
        function(error) {
          console.log("error");
        }
      );
    return () => unsubscribe();
  }, [user,history]);
  
  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner" />
    </div>
  ) : (
    <div className="row">
      <div className="col s12 m3 left-panel">
        <h4>{CW_MANAGE_BOOKS}</h4>
        <Link
          to="/add/book"
          className="waves-effect waves-light btn green darken-3 hoverable"
          style={{ margin: "10px 0px" }}
        >
         {CW_ADD_BOOK} <i className="material-icons right">add</i>
        </Link>

        <div className="input-field">
          <input
            id="title"
            type="text"
            className="validate"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
          />
          <label htmlFor="title">{CW_SEARCH_BY_TITLE}</label>
        </div>

        <div className="input-field">
          <input
            id="author"
            type="text"
            className="validate"
            value={searchAuthor}
            onChange={e => setSearchAuthor(e.target.value)}
          />
          <label htmlFor="author">{CW_SEARCH_BY_AUTHOR}</label>
        </div>
      </div>
         <Books books={books} searchTitle={searchTitle} searchAuthor={searchAuthor}/>
    </div>
  );
};

export default Dashboard;