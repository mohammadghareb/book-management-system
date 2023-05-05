import {  Route, Routes } from "react-router-dom";
import Login from "../../Components/Login";
import Dashboard from "../../Components/Dashboard";

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
