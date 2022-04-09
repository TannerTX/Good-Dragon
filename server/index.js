const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const passHash = require("password-hash")
const port = 3001
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

    const username = req.body.username
    const password = req.body.password
    console.log(`\n\nUSERNAME: ${username}\nPASSWORD: ${passHash.generate(password)}\nVERIFICATION: ${passHash.verify(password, passHash.generate(password))}`)
    

    if (!username || !password) {
        console.log("INVALID USER OR PASS")
    }
    else {
        db.query(`SELECT username FROM userLoginInfo WHERE username=?`, username, (err, result) => {
            if(err) console.log(err)
            
            else if(result[0] != null)
            console.log("USER ALREADY EXISTS")

            else console.log("USER DOES NOT EXIST")
        })

        



    }
})


app.listen(port, () => { console.log(`Listening on port ${port}`); })