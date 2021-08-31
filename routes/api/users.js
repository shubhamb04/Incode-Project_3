const express = require("express");
const router = express.Router();
const data = require("../../data");
const bcrypt = require("bcrypt");
const db = require("../../db/database");

//gets all users
router.get("/users", async (req, res) => {
  const result = await db.any("SELECT * FROM users;");
  // console.log(result);
  res.render("pages/users", {
    allUsers: result
  });
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     users: result
  //   }
  // })
});

//get individual users
router.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const found = data.users.some((user, index) => index === userId);

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
router.get("/users/:id/schedules", (req, res) => {
  const addUserLink = "/new-user";
  const userId = Number(req.params.id);
  const foundUser = data.users.some((user, index) => index === userId);
  const foundSchedule = data.schedules.some((sch) => sch.user_id === userId);

  if (foundUser) {
    if (foundSchedule) {
      res.render("pages/given_schedule", {
        givenSchedule: data.schedules.filter((sch) => sch.user_id === userId),
      });
    } else {
      res.render("pages/error", {
        msg: `No schedule exist with the id of ${req.params.id}`,
      });
    }
  } else {
    res.render("pages/error", {
      msg: `No user exist with the id of ${req.params.id}`,
      addUserLink,
    });
  }
});

//get all schedules
router.get("/schedules", (req, res) => {
  res.render("pages/schedules", {
    allSchedules: data.schedules,
  });
});

//route to add new user
router.get("/new-user", (req, res) => {
  res.render("pages/add_user");
});

//Add new user
router.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please fill all the details" });
  }

  data.users.push({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hash,
  });

  // res.json(data.users[data.users.length - 1]);
  res.redirect("/users");
});

//route to add schedule
router.get("/new-schedule", (req, res) => {
  res.render("pages/add_schedule");
});

//Add new schedule
router.post("/schedules", (req, res) => {
  const newSchedule = {
    user_id: req.body.user_id,
    day: req.body.day,
    start_at: req.body.start_at,
    end_at: req.body.end_at,
  };

  if (
    !newSchedule.user_id ||
    !newSchedule.day ||
    !newSchedule.start_at ||
    !newSchedule.end_at
  ) {
    return res.render("pages/error", { msg: "Please fill all the details!" });
  }

  data.schedules.push(newSchedule);

  res.redirect("/schedules");
});

module.exports = router;
