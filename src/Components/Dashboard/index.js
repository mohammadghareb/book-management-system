import React, { useState, useEffect, useContext } from "react";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import { CW_SEARCH_BY_AUTHOR } from "../../Constants";
import Books from "./Books";
import { db } from "../../Configuration/Firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AddButton from "./AddButton";
const Dashboard = () => {
  const { user, isAnonymous, setIsAnonymous } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState("");
  const booksRef = collection(db, "/books");

  const history = useNavigate();

  useEffect(() => {
    if (!user) {
      setIsAnonymous(true);
    }
    setIsLoading(true);
    const publishedBooksQuery = user
      ? query(booksRef, where("userId", "==", user.uid))
      : query(booksRef, where("status_published", "==", true));
    const unsubscribe = onSnapshot(
      publishedBooksQuery,
      (snapshot) => {
        const allPublishedBooks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(allPublishedBooks);
        setIsLoading(false);
      },
      function (error) {
        console.log("error", error);
      }
    );
    return () => unsubscribe();
  }, [user, history]);

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner" />
    </div>
  ) : (
    <div className="row">
      {!isAnonymous ? <AddButton /> : null}

      <div style={{ float: "left", marginTop: "15px" }}>
        <div className="search">
          <input
            disableUnderline={true}
            id="author"
            type="search"
            className="search"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            placeholder={CW_SEARCH_BY_AUTHOR}
          />
        </div>
      </div>

      <Books books={books} searchAuthor={searchAuthor} />
    </div>
  );
};

export default Dashboard;
