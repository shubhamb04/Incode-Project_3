const express = require("express");
const app = express()
const data = require("./data")
const PORT = 3000
console.log(data)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Here is the app at http://localhost:${PORT}`);
})