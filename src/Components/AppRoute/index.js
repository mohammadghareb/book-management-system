import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import AddBook from "../AddBook";
import BookDetails from "../BookDetails";

import { Fragment } from "react";

const AppRouter = () => {
  return (
    <Fragment>
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/books" element={<Dashboard />} />
          <Route path="/add/book" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Fragment>
  );
};
export default AppRouter;
