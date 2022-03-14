const express = require('express')
const app = express();
const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: '3306',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
})


app.get('/', (req, res) => {
    res.send("Heyy World!")

    db.connect(function (err) {
        if (err) 
        console.log(`Error connecting to database!\n${err}`);
        else
        console.log("Connected to the database!")
    })

})


app.listen(3001, () => { console.log('listening on port 3001'); })