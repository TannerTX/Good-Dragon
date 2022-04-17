import React from "react";
import TestNavbar from "./Components/Navbar/Navbar.js"
import Testing from "./pages/testingPage.js"
import DataTest from "./pages/dataTest.js"
import Home from "./pages/homePage.js";
import PostSearch from "./pages/postSearchPage.js";
import Login from "./pages/loginPage.js";
import Register from "./pages/registerPage.js"
import ErrorPage from "./pages/errorPage.js";
import "./assets/styles/style.css";
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
      <TestNavbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/search" element={<PostSearch />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/testing" element={<Testing />} />
         <Route path="/data" element={<DataTest />} />
         <Route path="*" element={<ErrorPage />} />
       </Routes>
    </Router>
    </>
  );
}

export default App;
