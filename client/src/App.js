import React from "react";
import Navbar from "./Components/Navbar/Navbar.js";
import TestNavbar from "./Components/Navbar/testNavbar.js"
import Home from "./pages/homePage.js";
import Login from "./pages/loginPage.js";
import PostSearch from "./pages/postSearchPage.js";
import Register from "./pages/registerPage.js";
import ErrorPage from "./pages/errorPage.js";
import "./style.css";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <>
      <Router>
      <TestNavbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/search" element={<PostSearch />} />
         <Route path="/register" element={<Register />} />
         <Route path="*" element={<ErrorPage />} />
       </Routes>
    </Router>
    </>
  );
}

export default App;
