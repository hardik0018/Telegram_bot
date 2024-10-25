const express = require("express");
const router = express.Router();
const Redeem = require("../models/redeem");

router.post("/Add", async (req, res) => {
  const { body } = req;

  await Redeem.create({
    ...body,
  });
  res.send({ success: 1 });
});

router.get("/get", async (req, res) => {
  let get = await Redeem.find();

  res.send({ data: get });
});

router.get("/getone/:id", async (req, res) => {
  const { id } = req.params;

  // Fetch the user from the database by Telegram ID
  const find = await Redeem.findById(id);

  if (!find) res.send({ success: 0, message: "User not found" });

  res.send({ success: 1, data: find });
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  if(!id)return res.send({success:0,message:"Data not Receive"})

   await Redeem.findByIdAndUpdate(id, {
    ...req.body,
  });

  res.send({ success:1 });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Redeem.findByIdAndDelete(id);

  res.send({ success: 1 });
});

module.exports = router;
