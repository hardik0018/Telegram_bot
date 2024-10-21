const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.post("/Add", async (req, res) => {
  const { body } = req;
  const time = new Date();
  const date = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
  await Order.create({
    ...body,
    time: Date.now(),
    date: date,
    status: false,
  });
  res.send({ success: 1 });
});

router.get("/get", async (req, res) => {
  let get = await Order.find();

  res.send({ data: get });
});

router.get("/getone/:id", async (req, res) => {
  const { id } = req.params;

  // Fetch the user from the database by Telegram ID
  const find = await Order.find({ orderId: id });

  if (!find) res.json({ success: 0, message: "Order Not Found" });

  res.json({ success: 1, data: find });
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.send({ success: 0, message: "Data not Receive" });

  await Order.findOneAndUpdate(
    { orderId: id },
    {
      code: req.body.code,
      status: true,
    }
  );

  res.send({ success: 1 });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Order.findByIdAndDelete(id);

  res.send({ success: 1 });
});

module.exports = router;
