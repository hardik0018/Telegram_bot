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

const io = new socketIo.Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

module.exports = app;
