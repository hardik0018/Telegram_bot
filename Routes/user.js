const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/Add", async (req, res) => {
  const { body } = req;
  let refcode = voucher_codes.generate({
    length: 6,
  });
  if (!body) return res.send({ success: 0, message: "Not Data is get" });
  let insert = await User.create({
    ...body,
    referCode: refcode,
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

router.get("/getUser/:telegramId", async (req, res) => {
  const { telegramId } = req.params;

  try {
    // Fetch the user from the database by Telegram ID
    const user = await User.findOne({ teleID: telegramId });

    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.json({ success: false, message: "Database error" });
  }
});

router.post("/UpdateData", async (req, res) => {
  const { id } = req.body;
  try {
    // Fetch the user from the database by Telegram ID
    await User.findOneAndUpdate(
      { teleID: id },
      {
        ...req.body,
      }
    );

    res.json({ success: false, message: "User not found" });
  } catch (error) {
    return res.json({ success: false, message: "Database error" });
  }
});
module.exports = router;
