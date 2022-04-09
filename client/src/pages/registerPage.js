import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom" 
import './Login.css'
import Axios from "axios"

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const register = () => {
        Axios.post("http://localhost:3000/register", {
        user: username,
        pass: password
        })
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
                    <h5>E-mail</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    
                </form>
                <button onClick={register} className='login__registerButton'>Create Account</button>
                <p>
                    By signing-in you agree to the <strong>Good Dragon</strong> Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                
            </div>
        </div>
    );

}

export default Register;