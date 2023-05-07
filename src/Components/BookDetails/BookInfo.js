import React from "react";
import {
  CW_DETAILS_TITLE,
  CW_DETAILS_AUTHOR,
  CW_DETAILS_DATE,
  CW_DETAILS_BRIEF,
  CW_DETAILS_PAGE_TITLE,
  CW_DETAILS_EDIT,
  CW_DETAILS_DELETE,
} from "../../Constants";
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
          <h4>{CW_DETAILS_PAGE_TITLE}</h4>
          {editMode ? null : (
            <div>
              <button
                className="btn waves-effect waves-light green"
                type="submit"
                name="action"
                style={{ marginRight: "15px" }}
                onClick={editBook}
              >
                {CW_DETAILS_EDIT}
                <i className="material-icons right">edit</i>
              </button>
              <button
                className="btn waves-effect waves-light red"
                type="submit"
                name="action"
                onClick={deleteBook}
              >
                {CW_DETAILS_DELETE}
                <i className="material-icons right">delete</i>
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col">
            <h6>
              <strong>{CW_DETAILS_TITLE} </strong>
              {book.title}
            </h6>
            <h6>
              <strong>{CW_DETAILS_AUTHOR} </strong>
              {book.author}
            </h6>
          </div>
          <div className="col">
            <h6>
              <strong>{CW_DETAILS_DATE} </strong>
              {book.date_published}
            </h6>

            <h6>
              <strong>{CW_DETAILS_BRIEF} </strong>
              {book.brief}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
