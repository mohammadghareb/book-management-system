import React from "react";

const BookInfo = ({ book, editMode, deleteBook, editBook }) => {
  return (
    <div className="row card">
      <div className="col m4">
        <h3 className="center" style={{ marginRight: "50px" }}>
          <img
            src={book.imageURL}
            alt={book.title}
            className="responsive-img"
          />
        </h3>
      </div>
      <div className="col m6">
        <div className="actions">
          <h4>Details</h4>
          {editMode ? null : (
            <div>
              <button
                className="btn waves-effect waves-light green"
                type="submit"
                name="action"
                style={{ marginRight: "15px" }}
                onClick={editBook}
              >
                Edit
                <i className="material-icons right">edit</i>
              </button>
              <button
                className="btn waves-effect waves-light red"
                type="submit"
                name="action"
                onClick={deleteBook}
              >
                Delete
                <i className="material-icons right">delete</i>
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col">
            <h6>
              <strong>Title: </strong>
              {book.title}
            </h6>
            <h6>
              <strong>Author: </strong>
              {book.author}
            </h6>
          </div>
          <div className="col">
            <h6>
              <strong>Date: </strong>
              {book.date_published}
            </h6>

            <h6>
              <strong>Brief: </strong>
              {book.brief}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
