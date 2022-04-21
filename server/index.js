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
    const username = req.body.username.trim()
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

app.post("/logout", (req, res) => {
    req.session.destroy()
    console.log("COOKIE GONE")
})

app.post("/getUserCart", (req, res) => {

    const user = req.body.user
    
    db.query("SELECT * FROM itemsForSale JOIN customerCart ON itemsForSale.itemID=customerCart.itemID WHERE customerCart.username=?", user.username.trim().toLowerCase(), (err, result) => {

        if(err) console.log(err)

        if(result) res.send(result)
    })

    
})

app.post("/addToCart", (req, res) => {

    // WE NEED 2 QUERIES; CART AND INVENTORY
    const item = req.body.item
    const user = req.body.user
    const amount = req.body.amt
    console.log(`AMOUNT: ${amount}`)

    db.query("UPDATE itemsForSale SET availableQuantity=? WHERE itemName=?", [item.availableQuantity - amount, item.itemName], (err, result) => {
        if(err) console.log(err)

        if(result) console.log("Updated Table.")
    })

    db.query("SELECT * FROM customerCart WHERE username=? AND itemID=?", [user.username, item.itemID], (err, result) => {
        if(err) console.log(err)

        if(result.length) { // IF THIS ITEM ALREADY EXISTS IN THE CART
            
            db.query("UPDATE customerCart SET quantity=? WHERE username=? AND itemID=?", [result[0].quantity + amount, user.username, item.itemID], (err, r) => {
                if(err) console.log(err)

                if(r.length) console.log(`Updated ${item.itemName}'s quantity in ${user.username}'s Cart`)
            })

        }
        else if(!result.length) { // IF ITEM ISN'T IN THE CART


            db.query("INSERT INTO customerCart (username, itemID, quantity) VALUES (?, ?, ?)", [user.username, item.itemID, amount], (err, r) => {
                if(err) console.log(err)

                if(r.length) console.log(`Added ${item.itemName} to ${user.username}'s Cart`)
            })

        }

        

    })

    
})

app.post("/changePassword", (req, res) => {

    const salt = bcrypt.genSaltSync(saltRounds)

    const username = req.body.username.toLowerCase()
    const oldPassPlain = req.body.oldPass.trim()
    const newPassPlain =  req.body.newPass.trim()

    db.query("SELECT * FROM userLoginInfo WHERE username=?", username, (err, result) => {
        
        if(err) console.log(err)

        else if(result.length) {

            let passCheck = bcrypt.compareSync(oldPassPlain, result[0].password)
            console.log(`PASS CHECK: ${passCheck}`)
            if(passCheck) {

            db.query("UPDATE userLoginInfo SET password=? WHERE username=?", [bcrypt.hashSync(newPassPlain, salt), username], (err, result) => {

                if(err) console.log(err)

                else if(result) {
                    res.send({message: "Success!"})
                    req.session.destroy()
                }
                
                else {
                    console.log("WRONG SHIT BUDDY")
                    res.send({message: "Invalid Password!"}) 
                    }
            })
        }
        else res.send({message: "Invalid Password!"})

            

    }
    else {console.log("WE HIT AN ERROR BUD"); console.log(result)}

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

    const sortMethod = req.body.sortMethod
    console.log(`QUERY: ${sortMethod}`)

    if(sortMethod === undefined) 
    db.query("SELECT * FROM itemsForSale", (err, result) => {
        if(err) console.log(err)
        else res.send(result)
      })

    else db.query(`SELECT * FROM itemsForSale ${sortMethod}`, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
    

    

})

app.post("/test", (req, res) => {

    db.query("SELECT * FROM customerCart WHERE username=? AND itemID=?", ["admin", 5], (err, result) => {
        if(err) console.log(err)
        else if (result.length) {
            console.log("RESULT: ")
            console.log(result.length)
            console.log(`IS EMPTY? ${result === undefined}`)
        }
    })
})



app.listen(port, () => { console.log(`Listening on port ${port}`); })