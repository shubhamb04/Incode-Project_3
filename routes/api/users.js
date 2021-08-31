const express = require("express");
const router = express.Router();
const data = require("../../data");
const bcrypt = require("bcrypt");
const db = require("../../db/database");

//gets all users
router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users;");
    res.render("pages/users", {
      allUsers: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//get individual users
router.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const found = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    res.render("pages/given_user", {
      givenUser: found,
    });
  } catch (error) {
    console.log(error);
  }

  // const found = data.users.some((user, index) => index === userId);

  if (found) {
    res.render("pages/given_user", {
      givenUser: data.users.filter((user, index) => index === userId),
      userId,
    });
  } else {
    res.render("pages/error", {
      msg: `No user found with the id of ${req.params.id}`,
    });
  }
});

//get schedules of individual users
router.get("/users/:id/schedules", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const foundSchedule = await db.query(
      "SELECT * FROM schedules WHERE user_id = $1",
      [userId]
    );
    res.render("pages/given_schedule", {
      givenSchedule: foundSchedule,
    });
  } catch (error) {
    console.log(error);
  }
});

//get all schedules
router.get("/schedules", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM schedules");
    res.render("pages/schedules", {
      allSchedules: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//route to add new user
router.get("/new-user", (req, res) => {
  res.render("pages/add_user");
});

//Add new user
router.post("/users", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the detai ls" });
    }

    const result = await db.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
      [firstname, lastname, email, hash]
    );

    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
});

//update user
router.put("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please fill all the detai ls" });
  }

  const result = await db.query(
    "UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4",
    [firstname, lastname, email, hash]
  );
});

//route to add schedule
router.get("/new-schedule", (req, res) => {
  res.render("pages/add_schedule");
});

//Add new schedule
router.post("/schedules", async (req, res) => {
  try {
    const { user_id, day, start_at, end_at } = req.body;
  if (!user_id || !day || !start_at || !end_at) {
    return res.render("pages/error", { msg: "Please fill all the details!" });
  }
  
  const result = await db.query("INSERT INTO schedules (user_id, day, start_at, end_at) VALUES($1, $2, $3, $4)",
    [user_id, day, start_at, end_at]);
        
  res.redirect("/schedules");
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
