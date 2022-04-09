import React, { Component } from "react"
import "./Navbar.css"
class Navbar extends Component {

 render() {
     return (
        <>
            <div id="root"></div>
               <div class="navbar" id="navbarStyled">
                 <a class="active" href="/">Home</a>
                 <a href="#products">Products</a>
                 <a class="about" href="#about">About</a>
                 <a href="#contact">Contact</a>
                 <input type="text" placeholder="Find some shit" />
                 <a class="account" href="/register">Account</a>
             </div>
        </>
      )
 }
}

export default Navbar;
