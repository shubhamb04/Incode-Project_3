const express = require("express");
const router = express.Router();
const data = require("../../data");
const bcrypt = require("bcrypt");
const {
  check,
  expressValidator,
  validationResult,
} = require("express-validator");

//gets all users
router.get("/users", (req, res) => {
  res.render("pages/users", {
    allUsers: data.users,
  });
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
router.post(
  "/users",
  [
    check("firstname", "First Name must be 3 or more characters!")
      .exists()
      .isLength({ min: 3 }),
    check("lastname", "Last Name must be 3 or more characters!")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Please enter valid email address!")
      .exists()
      .isEmail()
      .normalizeEmail(),
    check("password", "Password must be atleast 8 characters")
      .exists()
      .isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { firstname, lastname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array();
      res.render("pages/add_user", {
        errorMsgs,
      });
    }

    data.users.push({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hash,
    });

    res.redirect("/users");
  }
);

//route to add schedule
router.get("/new-schedule", (req, res) => {
  res.render("pages/add_schedule");
});

//Add new schedule
router.post(
  "/schedules",
  [
    check("user_id", "Please enter valid ID!").notEmpty(),
    check("day", "Please select the day!").notEmpty(),
    check("start_at", "Please enter valid start time!").notEmpty(),
    check("end_at", "Please enter valid end time!").notEmpty(),
  ],

  (req, res) => {
    const errors = validationResult(req);
    const newSchedule = {
      user_id: req.body.user_id,
      day: req.body.day,
      start_at: req.body.start_at,
      end_at: req.body.end_at,
    };

    if (!errors.isEmpty()) {
      // return res.status(404).json(errors.array())
      const errorMsgs = errors.array();
      res.render("pages/add_schedule", { errorMsgs });
    }

    data.schedules.push(newSchedule);

    res.redirect("/schedules");
  }
);

module.exports = router;
