import {  Route, Routes } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";

import  { Fragment } from "react";

const AppRouter = (() => {
 return  (    
   <Fragment>
  <div className="content">
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/books" element={<Dashboard/>} />
  </Routes>
  </div>
  </Fragment>

   );
});
export default AppRouter;