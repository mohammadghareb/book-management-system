import React from "react";
import {
  CW_EDIT_BUTTON_TITLE,
  CW_EDIT_BUTTON_DATE,
  CW_EDIT_BUTTON_BRIEF,
  CW_EDIT_BUTTON_COVER_IMAGE,
  CW_EDIT_BUTTON_UPDATE_BOOK,
  CW_EDIT_BUTTON_CANCEL,
} from "../../Constants";
const EditBookForm = ({
  handleSubmit,
  book,
  setEditMode,
  uploadImage,
  titleInput,
  dateInput,
  briefInput,
}) => {
  return (
    <div className="col s12 m7">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="title"
              type="text"
              className="validate"
              defaultValue={book.title}
              ref={titleInput}
            />
            <label htmlFor="title">{CW_EDIT_BUTTON_TITLE}</label>
          </div>

          <div className="input-field col s4">
            <input
              id="date_published"
              type="date"
              className="validate"
              defaultValue={book.date_published}
              ref={dateInput}
            />
            <label htmlFor="date_published">{CW_EDIT_BUTTON_DATE}</label>
          </div>
          <div className="input-field col s12">
            <textarea
              id="brief"
              className="materialize-textarea"
              defaultValue={book.brief}
              ref={briefInput}
            ></textarea>
            <label htmlFor="description">{CW_EDIT_BUTTON_BRIEF}</label>
          </div>
        </div>
        <div className="file-field input-field">
          <div className="btn purple darken-4 col s12">
            <span>
              {CW_EDIT_BUTTON_COVER_IMAGE}
              <i className="material-icons right">add_circle_outline</i>
            </span>
            <input type="file" onChange={uploadImage} accept="image/*" />
          </div>

          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <div className="center">
          <button
            className="waves-effect waves-light btn"
            style={{ margin: "8px 18px" }}
            type="submit"
          >
            {CW_EDIT_BUTTON_UPDATE_BOOK}{" "}
            <i className="material-icons right">add_circle_outline</i>
          </button>
          <button
            onClick={() => setEditMode()}
            className="waves-effect waves-light btn red"
          >
            {CW_EDIT_BUTTON_CANCEL}{" "}
            <i className="material-icons right">cancel</i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
