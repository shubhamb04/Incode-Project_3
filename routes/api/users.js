const express = require("express");
const router = express.Router();
const data = require("../../data");
const bcrypt = require("bcrypt")

//gets all users
router.get("/users", (req, res) => {
  res.send(data.users);
});

//get individual users
router.get("/users/:id", (req, res) => {
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
router.get("/users/:id/schedules", (req, res) => {
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
router.get("/schedules", (req, res) => {
  res.send(data.schedules);
});

//Add new user
router.post("/users", async (req, res) => {
   
    const { firstname, lastname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({msg: "Please fill all the details"})
    }

    data.users.push({firstname: firstname, lastname: lastname, email: email, password: hash});

    res.json(data.users[data.users.length-1])
})

//Add new schedule
router.post("/schedules", (req, res) => {
    const newSchedule = {
        user_id: req.body.user_id,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at
    }

    if (!newSchedule.user_id || !newSchedule.day || !newSchedule.start_at || !newSchedule.end_at) {
        return res.status(400).json({msg: "Please fill all the details"})
    }

    data.schedules.push(newSchedule);

    res.json(data.schedules)
})

module.exports = router;