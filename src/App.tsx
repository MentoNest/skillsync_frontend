import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; // Import Navbar if needed

function App() {
  return (
    <div>
      <Navbar />
      <Footer />

      <React router />
    </div>
  );
}

export default App;
