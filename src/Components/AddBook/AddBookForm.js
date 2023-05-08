import React from "react";
import {
  CW_ADD_BUTTON_TITLE,
  CW_ADD_BUTTON_DATE,
  CW_ADD_BUTTON_BRIEF,
  CW_ADD_BUTTON_COVER_IMAGE,
  CW_ADD_BUTTON_UPLOAD_COVER_IMAGE,
  CW_ADD_BUTTON_ADD_BOOK,
  CW_ADD_BUTTON_RESET,
} from "../../Constants";
const AddBookForm = ({
  handleSubmit,
  handleChange,
  uploadImage,
  resetForm,
  imagePreview,
  imageName,
  values,
}) => {
  return (
    <div className="row">
      <div className="col s12 m7">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="title"
                type="text"
                className="validate"
                onChange={handleChange("title")}
                value={values.title}
              />
              <label htmlFor="title">{CW_ADD_BUTTON_TITLE}</label>
            </div>

            <div className="input-field col s4">
              <input
                id="date_published"
                type="date"
                className="validate"
                onChange={handleChange("date_published")}
                value={values.date_published}
              />
              <label htmlFor="date_published">{CW_ADD_BUTTON_DATE}</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="brief"
                className="materialize-textarea"
                onChange={handleChange("brief")}
                value={values.brief}
              ></textarea>
              <label htmlFor="brief">{CW_ADD_BUTTON_BRIEF}</label>
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn purple darken-4">
              <span>{CW_ADD_BUTTON_COVER_IMAGE}</span>
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
              {CW_ADD_BUTTON_ADD_BOOK}{" "}
              <i className="material-icons right">add_circle_outline</i>
            </button>
            <button
              className="waves-effect waves-light btn red"
              type="reset"
              onClick={resetForm}
            >
              {CW_ADD_BUTTON_RESET}{" "}
              <i className="material-icons right">cancel</i>
            </button>
          </div>
        </form>
      </div>
      <div className="col s12 m5 center">
        <p> {CW_ADD_BUTTON_UPLOAD_COVER_IMAGE}</p>
        <img src={imagePreview} alt={imageName} className="responsive-img" />
      </div>
    </div>
  );
};

export default AddBookForm;
