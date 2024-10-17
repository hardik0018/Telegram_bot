const express = require("express");
const router = express.Router();
const Youtube = require("../models/youtube");

router.post("/Add", async (req, res) => {
  const { body } = req;

  await Youtube.create({
    ...body,
  });
  res.send({ success: 1 });
});

router.get("/get", async (req, res) => {
  let get = await Youtube.find();

  res.send({ data: get });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;

  await Youtube.findByIdAndDelete(id);

  res.send({ success: 1 });
});

module.exports = router;
