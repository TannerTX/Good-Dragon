const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const bcrypt = require("bcrypt")
const port = 3001, saltRounds = 10
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())

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

    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password, salt)
    console.log(`\nREGISTER:\n\nUSERNAME: ${username}\nPASSWORD: ${password}`)
    

    if (!username || !password) {
        console.log("INVALID USER OR PASS")
    }
    else {
        db.query(`SELECT username FROM userLoginInfo WHERE username=?`, username, (err, result) => {
            if(err) console.log(err)
            
            else if(result.length){
                console.log("USER ALREADY EXISTS")
            }
            else {db.query('INSERT INTO userLoginInfo (username, isAdmin, password) VALUES (?, ?, ?)', [username, 0, password],
            (err, result) => {
                if(err) console.log(err) 
                else console.log(result)} 
                )}
        })
    }
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
                console.log(`PASSWORD VERIFICATION CHECK: ${bcrypt.compareSync(plainTextPass, result[0].password)}`)
            }
            else console.log("\nUSER NOT FOUND, PLEASE CREATE AN ACCOUNT")
            

        })
    }
    




})




app.listen(port, () => { console.log(`Listening on port ${port}`); })