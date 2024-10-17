const express = require("express");
const expressFileupload = require("express-fileupload");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Mine = require("../models/mine");
router.use(expressFileupload());

const ImageFolder = path.join(__dirname, "../Images");

router.post("/Add", async (req, res) => {
  const { body } = req;
  const { files } = req;

  if (!files || !body) {
    res.send({ success: 0, message: "Data not Receive" });
  }
  let name = `${Date.now()}.jpg`;
  files.img.mv(path.join(ImageFolder, name));
  await Mine.create({
    ...body,
    lvl: JSON.parse(body.lvl),
    img: name,
  });
  res.send({ success: 1 });
});

router.get("/get", async (req, res) => {
  let get = await Mine.find();

  res.send({ data: get });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;

  let del = await Mine.findByIdAndDelete(id);
  if (fs.existsSync(`./Images/${del.img}`)) {
    fs.unlinkSync(`./Images/${del.img}`);
  }
  res.send({ success: 1 });
});

module.exports = router;
