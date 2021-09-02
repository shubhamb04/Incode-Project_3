const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../db/database");
const {
  check,
  expressValidator,
  validationResult,
} = require("express-validator");

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

//route to add schedule
router.get("/new-schedule", (req, res) => {
  res.render("pages/add_schedule");
});

//Add new schedule
router.post(
  "/schedules",
  [
    check("username", "Please enter valid username!")
      .exists()
      .isLength({ min: 3 }),
    check("day", "Please select the day!").notEmpty(),
    check("start_at", "Please enter valid start time!").notEmpty(),
    check("end_at", "Please enter valid end time!").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      const { username, day, start_at, end_at } = req.body;
      if (!errors.isEmpty()) {
        const errMsgs = errors.array();
        res.render("pages/add_schedule", { errMsgs });
      }

      const result = await db.query(
        "INSERT INTO schedules (username, day, start_at, end_at) VALUES($1, $2, $3, $4)",
        [username, day, start_at, end_at]
      );

      res.redirect("/schedules");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
