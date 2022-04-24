import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import "./searchbtn.css"
import Axios from "axios"
import { FaSearch } from "react-icons/fa"

function SearchBtn() {

    const navigate = useNavigate()

    const [searchVal, setSearchVal] = useState("")

    const executeSearch = async e => {
        navigate("/shop2", {state: {search: searchVal}})
    }


    return(
        <div class="search-box fade-in-image">
<<<<<<< HEAD
         <button class="btn-search"><FaSearch /></button>
         <input type="text" class="input-search" placeholder="Type to Search..."/>
=======
        <button class="btn-search" onClick={executeSearch}><FaSearch /></button>
        <input type="text" class="input-search" onChange={(e) => setSearchVal(e.target.value)} placeholder="Type to Search..."/>
>>>>>>> 42f5a31a97a7a53a218f6b12be3fef9ecc3ef2d1
        </div>
    );
}



export default SearchBtn;