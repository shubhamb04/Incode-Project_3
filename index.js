const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//set view engine as EJS
app.set('view engine', 'ejs')

//Render the home page
app.get("/", (req, res) => {
  res.render("pages/index")
})

//set public folder as static 
// app.use(express.static('public'))

//users data routes
app.use("/", require("./routes/api/users"))

app.listen(PORT, () => {
  console.log(`Here is the app at http://localhost:${PORT}`);
});
