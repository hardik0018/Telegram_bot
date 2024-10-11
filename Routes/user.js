const express = require("express");
const User = require("../models/user");
const TeleUser = require("../models/tele_users");
const router = express.Router();

router.post("/Add", async (req, res) => {
  const { body } = req;
  if (!body) return res.send({ success: 0, message: "Not Data is get" });
  let insert = await User.create({
    ...body,
  });

  if (!insert) return res.send({ success: 0, message: "Not Create User" });
  //   console.log(req.body, req);
  res.send({ success: 1, message: "User is Created" });
});

router.get("/getUser/:telegramId", async (req, res) => {
  const { telegramId } = req.params;

  try {
    // Fetch the user from the database by Telegram ID
    const user = await TeleUser.findOne({ teleID: telegramId });

    if (user) {
      res.json({ success: true, name: user.name });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Database error" });
  }
});

module.exports = router;
