import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../../Configuration/Firebase";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import AddBookForm from "./AddBookForm";
import canPublishBook from "../../Helpers/date";
import { CW_ADD_BOOK_NEW, CW_ADD_BOOK_BACK } from "../../Constants";
const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    title: "",
    author: "",
    date_published: "",
    brief: "",
    status_published: false,
  });
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { title, author, date_published, brief, status_published } = values;
  const history = useNavigate();

  useEffect(() => {
    if (!user) {
      history("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
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
      "image/png",
    ];
    if (!validImageTypes.includes(fileType)) {
      alert("Not a valid file. Please choose an image.");
      return;
    }
    setIsLoading(true);
    // Check publish time if its greater than the current time, to change upon the status(draft/publish)
    const isReadyToPublishDate = canPublishBook(date_published);
    const storageRef = ref(storage, `images/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
          const newBook = {
            title,
            author,
            date_published,
            brief,
            imageURL,
            status_published: isReadyToPublishDate,
          };

          addDoc(collection(db, "books"), newBook)
            .then(() => {
              M.toast({
                html: "Book added succesfully",
                classes: "green darken-1 rounded",
              });
              setIsLoading(false);
              resetForm();
              setImage("");
            })
            .catch(() => {
              M.toast({
                html: "Something went wrong. Please try again.",
                classes: "red darken-1 rounded",
              });
              setIsLoading(false);
            });
          history("/books");
        });
      }
    );
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    if (!imageFile) {
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
      brief: "",
      status_published: false,
    });
    setImage("");
  };

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="loading-spinner" />
    </div>
  ) : (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>
          {CW_ADD_BOOK_BACK}
        </Link>

        <div className="card">
          <div className="card-content">
            <h5 className="card-title center">{CW_ADD_BOOK_NEW}</h5>
            <AddBookForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              uploadImage={uploadImage}
              resetForm={resetForm}
              imagePreview={imagePreview}
              imageName={imageName}
              values={values}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
