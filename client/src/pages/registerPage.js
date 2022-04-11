import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom" 
import './Login.css'
import Axios from "axios"
import bgVideo from '../assets/videos/dogs.mp4'

function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")

    
    const register = async e => {
        e.preventDefault()
        const user = {username, password}
        const response = await Axios.post("http://localhost:3001/register", user).then(
            response => {console.log(response)})
        }

    const login = async e => {
        e.preventDefault()
        const user = {username, password}
        const response = await Axios.post("http://localhost:3001/login", user).then(response =>{console.log(response)})
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
                <h1>Login</h1>

                <form>
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />     
                </form>


                <button class="cssbuttons-io-button" onClick={login}> Login
                <div class="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>

                
                <button class="cssbuttons-io-button" onClick={register}> Register
                <div class="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>
                

                
            </div>
        </div>
    );

}

export default Register;