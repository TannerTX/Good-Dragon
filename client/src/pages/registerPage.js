import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom" 
import './Login.css'
import Axios from "axios"
import bgVideo from '../assets/videos/dogs.mp4'

function Register() {

    Axios.defaults.withCredentials = true

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [loginStatus, setLoginStatus] = useState("")

    const register = async e => {
        e.preventDefault()
        
        const user = {username, password}
        setFormErrors(validate(user))

        if(Object.values(formErrors).length === 0){
        const response = await Axios.post("http://localhost:3001/register", user).then(response =>{console.log(response)})
        }

        }

    const login = async e => {
        e.preventDefault()

        const user = {username, password}
        setFormErrors(validate(user))
        
        if(Object.values(formErrors).length === 0){
        const response = await Axios.post("http://localhost:3001/login", user).then(response =>{
            console.log(response);
            setFormErrors(validate(response))

            if(response.data.success)
            window.location.reload(false)
         })
        }

        }

    const validate = (obj) => {
        const notifs = {}
        
        if (obj.data) {
            
            if(obj.data.success)
            notifs.overall = "Success!"

            else if(obj.data.failure)
            notifs.overall = "Invalid Username/Password"
        }

        else if(!obj.data) {
        
        if(!obj.username)
        notifs.username = "Username must not be empty!"

        if(!obj.password)
        notifs.password = "Password must not be empty!"

        }
        return notifs
    }


    useEffect(() => {
        Axios.get("http://localhost:3001/register").then(response => {
            console.log(response.data)

            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0])
            }
            
        })
    }, [])



    return (
        <>

        {loginStatus ? 
        <div class="centered">

        <div class="profileCard">
            <div class="profileCardContent">
                <img src="https://cdn.vox-cdn.com/thumbor/u1xA8jhp6gZKCzkGwx_igXGSJ5A=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22388656/Marvel_Tales_Doctor_Strange_Vol_1_1_Virgin_Variant.jpeg"/>
                
                <h4>{loginStatus.isAdmin ? "Admin" : "User"}</h4>
                <h4 style={{paddingTop: "30px"}}>Username</h4>
                <h5>Admin</h5>


            </div>
        </div>

        <div class="profileInfo">HIII</div>
        </div>
         :

        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://imgur.com/X5KLtYQ.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Login</h1>
                <h2><p style={{color: formErrors.overall === "Success!" ? "green" : "red", paddingBottom: "10px", textAlign: "center", fontSize: "15px"}}>{formErrors.overall}</p></h2>
                <form>

                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.username}</p>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.password}</p>

                </form>


                <button className="cssbuttons-io-button" onClick={login}> Login
                <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>

                
                <button className="cssbuttons-io-button" onClick={register}> Register
                <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>
                

                
            </div>
        </div>
        }
    
        </>    
    );

}

export default Register;