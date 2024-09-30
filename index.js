const express = require("express");
const axios = require("axios");
const { handler } = require("./controller");

const app = express();
app.use(express.json());

app.post("*", async (req, res) => {
  console.log(req.body);
  res.send(await handler(req));
});

app.get("*", async (req, res) => {
  res.send(await handler(req));
});

app.listen(4000, (err) => {
  console.log("server is Running");
});
