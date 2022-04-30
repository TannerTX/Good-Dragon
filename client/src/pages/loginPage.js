import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom" 
import '../assets/styles/Login.css'
import '../assets/styles/fancyLogout.css'
import bgVideo from '../assets/videos/dogs2.mp4'
import Axios from "axios"

function Login() {

    Axios.defaults.withCredentials = true

    const history = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")

    const [formErrors, setFormErrors] = useState({})
    const [loginStatus, setLoginStatus] = useState("")

    let phone = loginStatus.phoneNum

    const register = async e => {
        e.preventDefault()
        history("/register")
        }

    const login = async e => {
        e.preventDefault()

        const user = {username, password}
        setFormErrors(validate(user))
        
        if(Object.values(formErrors).length === 0){
            await Axios.post("http://localhost:3001/login", user).then(response =>{
            console.log(response);
            setFormErrors(validate(response))

            if(response.data.success)
            window.location.reload(false)
         })
        }

        }

    const changePassword = async e => {

        e.preventDefault()
        const username = loginStatus.username
        const user = {username, oldPass, newPass}
        setFormErrors(validateNewPassword(user))

        if(Object.values(formErrors).length === 0){
            await Axios.post("http://localhost:3001/changePassword", user).then(response =>{
            console.log(response);
            setFormErrors(validateNewPassword(response))

            console.log("FORM ERRORS")
            console.log(formErrors)

            if(response.data.message === "Success!")
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

    const validateNewPassword = (obj) => {
        const errors = {}

        if(obj.data) {

            errors.message = obj.data.message

        }
        else{

        if(!obj.oldPass || !obj.newPass)
        errors.passError = "Fields cannot be empty!"
        
        if(obj.oldPass.trim().includes(" ") || obj.newPass.trim().includes(" "))
        errors.passError = "Password(s) cannot contain spaces!"

        }

        return errors
    }

    const logout = async e => {
        Axios.post("http://localhost:3001/logout").then(response => {
            console.log(response)
            })
        window.location.reload(false)
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then(response => {
            console.log(response.data)

            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0])
                console.log(loginStatus)
            }
            
        })
    }, [])



    return (
        <>
        {loginStatus ?
        
        <div className="cardsContainer fade-in-image">
        <video autoPlay loop muted><source src={bgVideo} type="video/mp4" /></video>
        <div className="profileCard">
            <div className="profileCardContent">
                <img alt="" src="https://cdn.vox-cdn.com/thumbor/u1xA8jhp6gZKCzkGwx_igXGSJ5A=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22388656/Marvel_Tales_Doctor_Strange_Vol_1_1_Virgin_Variant.jpeg"/>
                
                <h5>{loginStatus.isAdmin ? "Admin" : "User"}</h5>

                <h4>Username</h4>
                <h5>{loginStatus.username}</h5>

                <h4>Name</h4>
                <h5>{loginStatus.firstName && loginStatus.lastName ? `${loginStatus.firstName} ${loginStatus.lastName}` : "NULL"}</h5>

                <h4>Contact Information</h4>
                <h5>{loginStatus.email || "NULL"}</h5> 
                <h5>{loginStatus.phoneNum ? `${phone.substring(0,3)}-${phone.substring(3,6)}-${phone.substring(6,10)}` : "NULL"}</h5>
                
                <h4>Address</h4>
                <h5>{loginStatus.address || "NULL"}</h5> 

            </div>
            
            

        </div>

        <div style={{paddingTop: "50px"}}>
        <button className="logoutbutton" onClick={logout}>Logout</button>
        </div>

        <div className="profileInfo">
            <h4>Change Password</h4>

            <form>

            <input type='password' placeholder="Password" value={oldPass} onChange={e => setOldPass(e.target.value)} />    
            <p style={{color: "red", paddingBottom: "10px"}}></p> 

            <input type='password' placeholder="New Password" value={newPass} onChange={e => setNewPass(e.target.value)} />
            <p style={{color: formErrors.message === "Success!" ? "green" : "red", paddingBottom: "10px", paddingTop: "5px"}}>{formErrors.passError || formErrors.message}</p> 

            </form>

            <button className="cssbuttons-io-button" onClick={changePassword}> Submit
                <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>
        </div>


        </div>
         :

        <div className='login fade-in-image'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://imgur.com/X5KLtYQ.png' 
                    alt=""
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

export default Login;