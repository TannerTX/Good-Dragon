import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom" 
import "../assets/styles/Login.css"
import Axios from "axios"
import bgVideo from '../assets/videos/dogs3.mp4'


function Register() {

    let history = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const [loginStatus, setLoginStatus] = useState("")


    const register = async e => {
        e.preventDefault()
        const user = {username, password, firstName, lastName, address, phone, email}
        setFormErrors(validate(user))
        if(Object.values(formErrors).length === 0){
        const response = await Axios.post("https://good-dragon.herokuapp.com/register", user).then(response =>{
            console.log(response); 
            setFormErrors(validate(response))
            if (response.data.success === true)
            history("/login")
        })
        }
    }


    function validate(obj) {
        let errors = {}
        let empty = "cannot be empty!"

        if(obj.data) {   
            errors.registerMessage = obj.data.message 
        }

        else{

        if(!obj.email)
        errors.email = `Email ${empty}`
        else if(obj.email.includes(" ")) errors.email = "Email cannot contain spaces!"

        
        if(!obj.username)
        errors.username = `Username ${empty}`
        else if(obj.username.trim().includes(" ")) errors.username = "Username cannot contain spaces!"
        
        if(!obj.password)
        errors.password = `Password ${empty}`
        else if(obj.password.trim().includes(" ")) errors.password = "Password cannot contain spaces!"

        
        if(!obj.firstName)
        errors.firstName = `First name ${empty}`
        
        
        if(!obj.lastName)
        errors.lastName = `Last name ${empty}`
        
        if(!obj.address)
        errors.address = `Address ${empty}`
        
        if(!obj.phone)
        errors.phone = `Phone number ${empty}`
        else if(obj.phone.includes("-")) obj.phone = obj.phone.split("-").join("")
        else if(obj.phone.includes(" ")) obj.phone = obj.phone.split(" ").join("")

        }
                
        return errors

    } 


    return(

        <div className='login'>

            <Link to='/'>
                <img
                    className="login__logo fade-in-image"
                    src='https://imgur.com/X5KLtYQ.png' 
                />
            </Link>
            <video autoPlay loop muted><source src={bgVideo} type="video/mp4" /></video>


            <div className='login__container fade-in-image'>
                
                <h1>Register</h1>
                <h2><p style={{color: formErrors.registerMessage === "Success!" ? "green" : "red", paddingBottom: "10px", textAlign: "center", fontSize: "15px"}}>{formErrors.registerMessage}</p></h2>
                <form>

                    <h3>Login Information</h3>

                    <h5>Email</h5>
                    <input class = "input" type='text' value={email} onChange={e => setEmail(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.email}</p>

                    <h5>Username</h5>
                    <input class = "input" type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.username}</p>

                    <h5>Password</h5>
                    <input class = "input" type='password' value={password} onChange={e => setPassword(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.password}</p>

                    <h3>Personal Information</h3>

                    <h5>First Name</h5>
                    <input class = "input" type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.firstName}</p>

                    <h5>Last name</h5>
                    <input class = "input" type='text' value={lastName} onChange={e => setLastName(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.lastName}</p>

                    <h5>Address</h5>
                    <input class = "input" type='text' value={address} onChange={e => setAddress(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.address}</p>

                    <h5>Phone Number</h5>
                    <input class = "input" type='text' value={phone} onChange={e => setPhone(e.target.value)} />  
                    <p style={{color: "red", paddingBottom: "10px"}}>{formErrors.phone}</p>

                </form>


                
                <button className="cssbuttons-io-button" onClick={register}> Register
                <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                </div>
                </button>
                

                
            </div>
        </div>


    )



} 
export default Register;