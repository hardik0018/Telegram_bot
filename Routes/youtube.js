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

router.get("/user/get", async (req, res) => {
  let get = await Youtube.find({},{
    title:1,
    desc:2,
    link: 3,
    coin: 4,
    status: 5,
  });

  res.send({ data: get });
});

router.get("/CodeCheck", async (req, res) => {
  const { id, code } = req.query;

  let find = await Youtube.find({ _id: id, code: code });

  if (!find.length) return res.send({ success: 0 });
  res.send({ success: 1 });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Youtube.findByIdAndDelete(id);

  res.send({ success: 1 });
});

module.exports = router;
