const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../db/database");


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
router.post("/schedules", async (req, res) => {
  try {
    const { username, day, start_at, end_at } = req.body;
  if (!username || !day || !start_at || !end_at) {
    return res.render("pages/error", { msg: "Please fill all the details!" });
  }

    const result = await db.query("INSERT INTO schedules (username, day, start_at, end_at) VALUES($1, $2, $3, $4)",
    [username, day, start_at, end_at]);
        
    res.redirect("/schedules");
    
  
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
