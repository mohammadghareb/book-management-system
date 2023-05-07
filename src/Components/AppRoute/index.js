import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import AddBook from "../AddBook";
import BookDetails from "../BookDetails";

import { Fragment } from "react";
import ResetPassword from "../ResetPassword";
import Register from "../Register";
const AppRouter = () => {
  return (
    <Fragment>
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<Dashboard />} />
          <Route path="/add/book" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Fragment>
  );
};
export default AppRouter;
