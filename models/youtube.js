const mongoose = require("mongoose");

const YoutubeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    coin: { type: Number, required: true },
    code: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Youtube", YoutubeSchema);
