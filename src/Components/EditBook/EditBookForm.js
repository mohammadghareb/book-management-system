import React from "react";

const EditBookForm = ({
  handleSubmit,
  book,
  setEditMode,
  uploadImage,
  titleInput,
  authorInput,
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
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field col s6">
            <input
              id="author"
              type="text"
              className="validate"
              ref={authorInput}
              defaultValue={book.author}
            />
            <label htmlFor="author">Author</label>
          </div>

          <div className="input-field col s4">
            <input
              id="date_published"
              type="date"
              className="validate"
              defaultValue={book.date_published}
              ref={dateInput}
            />
            <label htmlFor="date_published">Date Published</label>
          </div>
          <div className="input-field col s12">
            <textarea
              id="brief"
              className="materialize-textarea"
              defaultValue={book.brief}
              ref={briefInput}
            ></textarea>
            <label htmlFor="description">Brief</label>
          </div>
        </div>
        <div className="file-field input-field">
          <div className="btn purple darken-4 col s12">
            <span>
              Upload Cover Image
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
            Update BOOK{" "}
            <i className="material-icons right">add_circle_outline</i>
          </button>
          <button
            onClick={() => setEditMode()}
            className="waves-effect waves-light btn red"
          >
            Cancel <i className="material-icons right">cancel</i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
