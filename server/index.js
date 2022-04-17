const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const bcrypt = require("bcrypt")
const port = 3001, saltRounds = 10
require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const session = require("express-session")

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "userID",
    secret: "userSecret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 2,
    },
})
)

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'GoodDragonDB'
})

db.connect()


app.post("/register", (req, res) => {

    const salt = bcrypt.genSaltSync(saltRounds)

    const email = req.body.email.trim()
    const username = req.body.username.toLowerCase().trim()
    const password = bcrypt.hashSync(req.body.password, salt)
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const address = req.body.address.trim()
    const phoneNum = req.body.phone.trim()

    console.log(`\nREGISTER:\n\nUSERNAME: ${username}\nPASSWORD: ${password}`)
    
    db.query(`SELECT username FROM userLoginInfo WHERE username=?`, username, (err, result) => {
        if(err) console.log(err)
        
        else if(result.length){
            res.send({success: false, message: "Username already exists!"})
            console.log("USER ALREADY EXISTS")
        }
        else {
        db.query('INSERT INTO userLoginInfo (username, isAdmin, password, firstName, lastName, address, email, phoneNum) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, 0, password, firstName, lastName, address, email, phoneNum],
        (err, result) => {
            if(err) console.log(err) 
            else{console.log(result); res.send({success: true, message: "Success!"})}} 
            )}
    })
    
})

app.get("/login", (req, res) => {

    if(req.session.user) 
        res.send({loggedIn: true, user: req.session.user})
    else
    res.send({loggedIn: false})
    
})

app.post("/login", (req, res) => {

    const salt = bcrypt.genSaltSync(saltRounds)

    const username = req.body.username
    const plainTextPass = req.body.password
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    console.log(`\nLOGIN:\n\nUSERNAME: ${username}\nPASSWORD: ${plainTextPass}\nHASHED PASSWORD: ${hashedPassword}`)

    if (!username || !plainTextPass) {
        console.log("INVALID USER OR PASS")
    }
    else {
        db.query(`SELECT * FROM userLoginInfo WHERE username=?`, username, (err, result) => {
            if(err) console.log(err)
            
            else if (result.length) {
                console.log("\nUSER FOUND, CHECKING PASSWORD")
                let passCheck = bcrypt.compareSync(plainTextPass, result[0].password)
                console.log(`PASSWORD VERIFICATION CHECK: ${passCheck}`)

                if(passCheck) {
                    req.session.user = result
                    console.log(`SESSION INFORMATION: ${req.session.user}`)
                    res.send({success: true})
                }
                else res.send({failure: true})
            }
            else {
                console.log("\nUSER NOT FOUND, PLEASE CREATE AN ACCOUNT")
                res.send({failure: true})
            }
            

        })
    }
    
})

app.post("/getData", (req, res) => {

    db.query("SELECT * FROM itemsForSale", (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})




app.listen(port, () => { console.log(`Listening on port ${port}`); })