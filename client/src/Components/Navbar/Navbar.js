import React, { Component } from "react"

class Navbar extends Component {

    render() {
        return (
            <>
            <div id="root"></div>
        <div class="navbar">
          <a class="active" href="#home">Home</a>
          <a href="#products">Products</a>
          <a class="about" href="#about">About</a>
          <a href="#contact">Contact</a>
          <input type="text" placeholder="Find some shit" />
          <a class="account" href="#account">Account</a>
        </div>
        </>
        )
    }
}

export default Navbar;
