import React, { useState, useEffect, useContext } from "react";
import { db } from "../../Configuration/Firebase";
import { Link } from "react-router-dom";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import EditBook from "../EditBook";
import { useNavigate, useParams } from "react-router-dom";
import BookInfo from "./BookInfo";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState();
  const [editMode, setEditMode] = useState(false);
  const history = useNavigate();

  let { id } = useParams();
  const docBooksRef = doc(db, "books", id);
  useEffect(() => {
    if (!user) {
      history("/");
    }
    const unsubscribe = onSnapshot(docBooksRef, function (doc) {
      setBook(doc.data());
    });

    return () => unsubscribe();
  }, [user, history, id]);

  const deleteBook = () => {
    if (window.confirm("Are you sure to delete this book?")) {
      deleteDoc(docBooksRef)
        .then(function () {
          history("/books");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    } else {
      return;
    }
  };
  const editBook = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="container">
      {editMode ? null : (
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>Back to dashboard
        </Link>
      )}
      {book ? (
        editMode ? (
          <EditBook book={book} id={id} setEditMode={setEditMode} />
        ) : (
          <BookInfo
            book={book}
            editMode={editMode}
            deleteBook={deleteBook}
            editBook={editBook}
          />
        )
      ) : (
        <div className="spinner">
          <img src={spinner} alt="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default BookDetails;
