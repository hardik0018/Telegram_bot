const express = require("express");
const app = express();

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
var cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config();

mongoose.connect(process.env.MONGODB).then(() => console.log("Connected!"));

const web_link = "https://telegram-game-three.vercel.app/";
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

app.use("/User", userRoute);

bot.start((ctx) => {
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web_app", web_app: { url: web_link } }]],
    },
  });
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.launch();

app.listen(4000, () => {
  console.log("server is started");
});

module.exports = app;
