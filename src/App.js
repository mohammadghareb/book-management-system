import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <AuthProvider>
        <NavBar />
        <Footer />
    </AuthProvider>
  
  );
};

export default App;