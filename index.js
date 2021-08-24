const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

//Initialise the app
const app = express();

const data = require("./data");

//listen on a port
const PORT = process.env.PORT || 3000;

// console.log(data)

//Init middleware
// app.use(logger);

//create your endpoints/route handlers
app.get("/", (req, res) => {
  res.send("Welcome to our schedule website");
  //sending a file in response
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
});

//gets all users
app.route("/users").get((req, res) => {
  res.send(data.users);
});

//get individual users
app.get("/users/:id", (req, res) => {
  const found = data.users.some(
    (user) => data.users.indexOf(user) === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      data.users.filter(
        (user) => data.users.indexOf(user) === parseInt(req.params.id)
      )
    );
  } else {
    res
      .status(400)
      .json({ msg: `No user found with the id of ${req.params.id}` });
  }
});

//get schedules of individual users
app.get("/users/:id/schedules", (req, res) => {
  const foundUser = data.users.some(
    (user) => data.users.indexOf(user) === parseInt(req.params.id)
  );
  const foundSchedule = data.schedules.some(
    (sch) => sch.user_id === parseInt(req.params.id)
  );

  if (foundUser) {
    if (foundSchedule) {
      res.json(
        data.schedules.filter((sch) => sch.user_id === parseInt(req.params.id))
      );
    } else {
      res
        .status(400)
        .json({ msg: `No schedule exist with the id of ${req.params.id}` });
    }
  } else {
    res
      .status(400)
      .json({ msg: `No user exist with the id of ${req.params.id}` });
  }
});

//get all schedules
app.route("/schedules").get((req, res) => {
  res.send(data.schedules);
});

app.listen(PORT, () => {
  console.log(`Here is the app at http://localhost:${PORT}`);
});
