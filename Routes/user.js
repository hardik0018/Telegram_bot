const express = require("express");
const User = require("../models/user");
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

module.exports = router;
