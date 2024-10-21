const express = require("express");
const User = require("../models/user");
const order = require("../models/order");

const router = express.Router();

router.post("/Add", async (req, res) => {
  const { body } = req;
  if (!body.teleID && !body.name)
    return res.send({ success: 0, message: "Name & teleID required" });

  let insert = await User.create({
    ...body,
  });

  if (!insert) return res.send({ success: 0, message: "Not Create User" });
  console.log(req.body, req);
  res.send({ success: 1, message: "User is Created" });
});

router.get("/get", async (req, res) => {
  let all = await User.find();
  res.json({ data: all });
});

router.post("/Test", async (req, res) => {
  const { body } = req;

  res.send({ ...body });
});

router.get("/getUser/:telegramId", async (req, res) => {
  const { telegramId } = req.params;

  try {
    // Fetch the user from the database by Telegram ID
    const user = await User.findOne({ teleID: telegramId });

    if (!user) return res.send({ success: 0, message: "User not found" });

    res.send({ success: 1, data: user });
  } catch (error) {
    res.send({ success: false, message: "Database error" });
  }
});

router.post("/UpdateData", async (req, res) => {
  const { id } = req.body;
  try {
    // Fetch the user from the database by Telegram ID
    const update = await User.findOneAndUpdate(
      { teleID: id },
      {
        ...req.body,
      }
    );

    if (!update)
      return res.send({
        success: false,
        message: "User not found & not update",
      });

    res.send({ success: true, data: update });
  } catch (error) {
    return res.json({ success: false, message: "Database error" });
  }
});
router.post("/Ban", async (req, res) => {
  const { banReason, id } = req.body;

  // Fetch the user from the database by Telegram ID
  const update = await User.findOneAndUpdate(
    { teleID: id },
    {
      ban: { reason: banReason, date: Date.now() },
      status: false,
    }
  );

  if (!update)
    return res.send({ success: 0, message: "User not found & not update" });

  res.send({ success: 1 });
});
router.get("/RemoveBan/:teleId", async (req, res) => {
  const { teleId } = req.params;

  // Fetch the user from the database by Telegram ID
  const update = await User.findOneAndUpdate(
    { teleID: teleId },
    {
      status: true,
      $unset: { ban: 1 },
    }
  );

  if (!update)
    return res.send({ success: 0, message: "User not found & not update" });

  res.send({ success: 1 });
});

router.get("/reward/:teleId", async (req, res) => {
  const { teleId } = req.params;

  // Fetch the user from the database by Telegram ID
  const get = await order.find(
    { teleID: teleId },
  );

  res.send({ data: get });
});

module.exports = router;
