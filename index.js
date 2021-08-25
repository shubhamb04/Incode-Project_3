const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//create your endpoints/route handlers
app.get("/", (req, res) => {
  res.send("Welcome to our schedule website");
});

//users data routes
app.use("/", require("./routes/api/users"))

app.listen(PORT, () => {
  console.log(`Here is the app at http://localhost:${PORT}`);
});
