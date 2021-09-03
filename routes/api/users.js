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
    const result = await db.any("SELECT * FROM schedules");
    res.render("pages/schedules", {
      allSchedules: result,
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

      const result = await db.none(
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
