//bringing in express
const express = require("express");

//bringing in path module
const path = require("path")

//Initialise the app
const app = express()

const data = require("./data")

//listen on a port
const PORT = process.env.PORT || 3000;

// console.log(data)

//create your endpoints/route handlers
app.get("/", (req, res) => {
    //sending a response
    res.send('Welcome to our schedule website')

    //sending a file in response
    // res.sendFile(path.join(__DirName, 'public', 'index.html'))
})

//gets all users
app.get('/users', (req, res) => {
    res.json(data.users)
})


app.listen(PORT, () => {
    console.log(`Here is the app at http://localhost:${PORT}`);
})