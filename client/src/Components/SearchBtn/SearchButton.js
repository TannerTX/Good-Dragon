import React from "react";
import "./searchbtn.css"
import { FaSearch } from "react-icons/fa"

function SearchBtn() {
    return(
        <div class="search-box fade-in-image">
        <button class="btn-search"><FaSearch /></button>
        <input type="text" class="input-search" placeholder="Type to Search..."/>
        </div>
    );

}

export default SearchBtn;