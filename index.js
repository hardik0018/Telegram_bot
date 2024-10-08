const express = require("express");
const app = express();

const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const TeleUser = require("./models/tele_users");
const cors = require("cors");
const User = require("./models/user");
app.use(express.json());
app.use(cors());
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const web_link = "https://telegram-game-three.vercel.app/";
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
// const bot = new Telegraf("7603677002:AAGSYmGLIhR2qo0y9AEAX7vbxe-luyjL0Ww");

app.use("/User", userRoute);

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  const username = ctx.from.username;

  // Check if user already exists
  const existingUser = await User.findOne({ teleID: chatId });

  if (!existingUser) {
    // If user does not exist, save new user
    try {
      await User.create({
        teleID: chatId,
        name: username,
      });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  ctx.reply(`Hi, your name is : ${username}`, {
    reply_markup: {
      keyboard: [
        [{ text: "web_app", web_app: { url: `${web_link}?tele=${chatId}` } }],
      ],
      resize_keyboard: true,
    },
  });
});
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot
  .launch()
  .then(() => {
    console.log("Bot is running");
  })
  .catch((err) => {
    console.error("Failed to start bot:", err);
  });

app.listen(4000, () => {
  console.log("server is started");
});

module.exports = app;
