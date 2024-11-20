const express = require("express");
const app = express();
const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const cors = require("cors");
const socketIo = require("socket.io");
const User = require("./models/user");
const MineRoute = require("./Routes/mine");
const YoutubeRoute = require("./Routes/youtube");
const RedeemRoute = require("./Routes/redeem");
const OrderRoute = require("./Routes/order");
const AdminRoute = require("./Routes/Admin");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
const corsConfig = {
  origin: process.env.BASE_URL,
  credentials: true,
};

app.use(cors(corsConfig));
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const web_link = "https://telegram-game-three.vercel.app/";
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const server = app.listen(PORT, (req, res) => {
  console.log(`Server Listening at PORT - ${PORT}`);
});

app.use("/images", express.static("Images"));
app.use("/User", userRoute);
app.use("/Mine", MineRoute);
app.use("/Youtube", YoutubeRoute);
app.use("/Redeem", RedeemRoute);
app.use("/Order", OrderRoute);
app.use("/Admin", AdminRoute);

const io = new socketIo.Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  const username = ctx.from.first_name;
  const startCommand = ctx.startPayload;
  let refererName = "";

  // Check if user already exists
  let existingUser = await User.findOne({ teleID: chatId });

  if (!existingUser) {
    // If user does not exist, save new user

    try {
      existingUser = await User.create({
        teleID: chatId,
        name: username,
        friends: [],
        status: true,
      });

      // refer user save if new user not exist
      if (startCommand) {
        const referralID = startCommand;
        const referer = await User.findOne({ teleID: referralID });

        if (referer && referer.teleID !== chatId) {
          refererName = username;
          referer.friends.push({
            teleID: chatId,
            name: refererName,
          });
          await referer.save();
          console.log("user save");
        } else {
          console.log("same user");
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }

  // Send a welcome message to the new user
  let welcomeMessage = `Hi, your name is: ${username}`;
  if (refererName) {
    welcomeMessage += `\nYou were referred by: ${refererName}`;
  }

  ctx.reply(welcomeMessage, {
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

io.on("connection", (socket) => {
  console.log(socket.id);
});

module.exports = app;
