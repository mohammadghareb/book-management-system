import React, { useState, useEffect, useRef, useContext } from "react";
import { db, storage } from "../../Configuration/Firebase";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../../Assets/Images/loadingSpinner.gif";
import { AuthContext } from "../../Helpers/AuthProvider";
import { useNavigate } from "react-router-dom";
import EditBookForm from "./EditBookForm";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import {
  CW_EDIT_TITLE,
  CW_EDIT_COVER_IMAGE,
  CW_EDIT_BOOK,
  CW_EDIT_BACK_DASHBOARD,
} from "../../Constants";

const EditBook = (props) => {
  const { user, isAnonymous, setIsAnonymous } = useContext(AuthContext);
  const { book, id, setEditMode } = props;

  const titleInput = useRef();
  const authorInput = useRef();
  const dateInput = useRef();
  const briefInput = useRef();
  const history = useNavigate();

  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!user) {
      history("/login");
    }
    M.AutoInit();
    M.updateTextFields();
  }, [user, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("You must choose an image");
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
    const modal = M.Modal.getInstance(document.getElementById("modal"));
    modal.open();

    const storageRef = ref(storage, `images/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (imageURL) => {
          const newBook = {
            title: titleInput.current.value,
            author: authorInput.current.value,
            date_published: dateInput.current.value,
            brief: briefInput.current.value,
            imageURL,
          };

          const docBooksRef = doc(db, "books", id);

          await updateDoc(docBooksRef, newBook)
            .then(() => {
              const modal = M.Modal.getInstance(
                document.getElementById("modal")
              );
              modal.close();
              M.toast({
                html: "Book was updated succesfully",
                classes: "green darken-1 rounded",
              });
            })
            .catch((error) => {
              M.toast({
                html: "Something went wrong. Please try again.",
                classes: "red darken-1 rounded",
              });
            });
          history("/");
        });
      }
    );
  };

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
    if (!e.target.files[0]) {
      alert("You must choose an image");
      return;
    }
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.files[0].name);
  };

  return isAnonymous ? null : (
    <div>
      <div id="modal" className="modal">
        <div className="modal-content center">
          <img src={spinner} alt="spinner" />
          <h4>{CW_EDIT_TITLE}</h4>
        </div>
      </div>
      <div className="row card">
        <Link to="/books" className="waves-effect waves-light btn">
          <i className="material-icons left">arrow_back</i>
          {CW_EDIT_BACK_DASHBOARD}
        </Link>
        <p className="center" style={{ fontSize: "20px" }}>
          {CW_EDIT_BOOK}
        </p>

        <EditBookForm
          handleSubmit={handleSubmit}
          book={book}
          setEditMode={setEditMode}
          uploadImage={uploadImage}
          titleInput={titleInput}
          authorInput={authorInput}
          dateInput={dateInput}
          briefInput={briefInput}
        />
        <div className="col s12 m5 center">
          <p>{CW_EDIT_COVER_IMAGE}</p>
          <img src={imagePreview} alt={imageName} className="responsive-img" />
        </div>
      </div>
    </div>
  );
};

export default EditBook;
