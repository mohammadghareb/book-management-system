import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { AuthProvider } from "./Helpers/AuthProvider";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import AppRouter from "../src/Components/AppRoute";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <AppRouter/>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
