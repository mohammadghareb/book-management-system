import React from "react";
import { Link } from "react-router-dom";
import { CW_ADD_BOOK } from "../../Constants";
const AddButton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        float: "left",
        marginRight: "20px",
      }}
    >
      <Link
        to="/add/book"
        className="waves-effect waves-light btn green darken-1 hoverable"
      >
        {CW_ADD_BOOK} <i className="material-icons right">add</i>
      </Link>
    </div>
  );
};

export default AddButton;
