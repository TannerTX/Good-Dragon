import React, { useState, useEffect } from "react";
import TestNavbar from "./Components/Navbar/Navbar.js"
import Testing from "./pages/testingPage.js"
import Admin from "./pages/adminPage.js"
import Shop from "./pages/shop.js"
import Shop2 from "./pages/shop2.js"
import Home from "./pages/homePage.js";
import Login from "./pages/loginPage.js";
import Register from "./pages/registerPage.js"
import ErrorPage from "./pages/errorPage.js";
import Cart from "./pages/cart2.js"
import "./assets/styles/style.css";
import Axios from "axios"
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {

  
  const [loginStatus, setLoginStatus] = useState("")
  Axios.defaults.withCredentials = true

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then(response => {
        console.log(response.data)

        if(response.data.loggedIn === true){
            setLoginStatus(response.data.user[0])
        }
        
    })
}, [])

  return (
    <>
      <Router>
      <TestNavbar isLoggedIn={loginStatus} isAdmin={loginStatus.isAdmin}/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/testing" element={<Testing />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/shop" element={<Shop2 />} />
         <Route path="/shop2" element={<Shop2 />} />
         <Route path="*" element={<ErrorPage />} />
         
       </Routes>
    </Router>
    </>
  );
}

export default App;
