import React from "react";
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
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s6">
              <input
                id="author"
                type="text"
                className="validate"
                onChange={handleChange("author")}
                value={values.author}
              />
              <label htmlFor="author">Author</label>
            </div>

            <div className="input-field col s4">
              <input
                id="date_published"
                type="date"
                className="validate"
                onChange={handleChange("date_published")}
                value={values.date_published}
              />
              <label htmlFor="date_published">Date Published</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="brief"
                className="materialize-textarea"
                onChange={handleChange("brief")}
                value={values.brief}
              ></textarea>
              <label htmlFor="brief">brief</label>
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn purple darken-4">
              <span>Upload Cover Image</span>
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
              ADD BOOK{" "}
              <i className="material-icons right">add_circle_outline</i>
            </button>
            <button
              className="waves-effect waves-light btn red"
              type="reset"
              onClick={resetForm}
            >
              Reset <i className="material-icons right">cancel</i>
            </button>
          </div>
        </form>
      </div>
      <div className="col s12 m5 center">
        <p>Cover Image</p>
        <img src={imagePreview} alt={imageName} className="responsive-img" />
      </div>
    </div>
  );
};

export default AddBookForm;
