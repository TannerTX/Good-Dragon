import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom" 
import './Login.css'
import Axios from "axios"

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")

    const register = async e => {
        e.preventDefault()
        const user = {username, password}
        const response = await Axios.post("http://localhost:3001/register", user).then(
            (response) => {console.log(response)}
        )
        
    }

    

    if (user) {
        return <div>{user.name} is logged in.</div>
    }

    return (
        
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://imgur.com/X5KLtYQ.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    
                </form>
                <button class="cssbuttons-io-button" onClick={register}> Register
                <div class="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>

                <p>
                    By signing-in you agree to the <strong>Good Dragon</strong> Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                
            </div>
        </div>
    );

}

export default Register;