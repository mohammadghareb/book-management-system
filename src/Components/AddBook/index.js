import React, { useState, useContext, useEffect } from "react";
import firebase from "../../Configuration/Firebase";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import { useNavigate } from 'react-router-dom';
import {getStorage,getDownloadURL, ref,uploadBytesResumable} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    title: "",
    author: "",
    date_published: "",
    brief: ""
  });
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    title,
    author,
    date_published,
    brief
  } = values;
  const history = useNavigate();

  useEffect(() => {
    if (!user) {
      history("/");
    }
  }, [user,history]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    M.AutoInit();
    if (!image) {
      alert("You must choose an image.");
      return;
    }
    const fileType = image["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (!validImageTypes.includes(fileType)) {
      alert("Not a valid file. Please choose an image.");
      return;
    }
    setIsLoading(true);
    // Create a root reference
const storage = getStorage();

const storageRef = ref(storage  , `images/${imageName}`)
const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      error => {
        console.log(error);
      },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then( (imageURL)  =>{
          const newBook = {
            title,
            author,
            date_published,
            brief,
            imageURL
          };

          const db = firebase.firestore();
      addDoc(collection(db, "books"), newBook)
            .then(() => {
              M.toast({
                html: "Book added succesfully",
                classes: "green darken-1 rounded"
              });
              setIsLoading(false);
              resetForm();
              setImage("");
            })
            .catch(() => {
              M.toast({
                html: "Something went wrong. Please try again.",
                classes: "red darken-1 rounded"
              });
              setIsLoading(false);
            });
            history("/books");

        });
      }
    );
  };

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const uploadImage = e => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    if(!imageFile){
      return;
    }
    setImagePreview(URL.createObjectURL(imageFile));

    setImageName(imageFile.name);
  };

  const resetForm = () => {
    setValues({
      title: "",
      author: "",
      date_published: "",
      brief: ""
    });
    setImage("");
  };

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner"/>
    </div>
  ) : (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>Back to dashboard
        </Link>

        <div className="card">
          <div className="card-content">
            <h5 className="card-title center">Add New Book</h5>
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
                        value={title}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="author"
                        type="text"
                        className="validate"
                        onChange={handleChange("author")}
                        value={author}
                      />
                      <label htmlFor="author">Author</label>
                    </div>
                  
                 
                    <div className="input-field col s4">
                      <input
                        id="date_published"
                        type="date"
                        className="validate"
                        onChange={handleChange("date_published")}
                        value={date_published}
                      />
                      <label htmlFor="date_published">Date Published</label>
                    </div>
                    <div className="input-field col s12">
                      <textarea
                        id="brief"
                        className="materialize-textarea"
                        onChange={handleChange("brief")}
                        value={brief}
                      ></textarea>
                      <label htmlFor="brief">brief</label>
                    </div>
                  </div>
                  <div className="file-field input-field">
                    <div className="btn purple darken-4">
                      <span>Upload Cover Image</span>
                      <input
                        type="file"
                        onChange={uploadImage}
                        accept="image/*"
                      />
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
                <img
                  src={imagePreview}
                  alt={imageName}
                  className="responsive-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;