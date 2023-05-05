import React from "react";
import { Link } from "react-router-dom";

const Books = ({ books, searchAuthor }) => {
  return (
    <div className="col s12 m9 right-panel">
      {books.length > 0 ? (
        <div className="row" style={{ padding: "16px" }}>
          {books
            .filter((book) =>
              book.author.toLowerCase().includes(searchAuthor.toLowerCase())
            )
            .map((book) => (
              <div className="col s12 m4" key={book.id}>
                <div className="card grey lighten-5 z-depth-1 hoverable">
                  <div className="card-image">
                    <img
                      src={book.imageURL}
                      style={{ height: "250px" }}
                      alt={book.author}
                    />
                  </div>

                  <div className="card-action center">
                    <Link
                      to={`/book/${book.id}`}
                      className="btn grey darken-1 hoverable"
                    >
                      View Details{" "}
                      <i className="material-icons right">arrow_forward</i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h3>No books available</h3>
      )}
    </div>
  );
};

export default Books;
