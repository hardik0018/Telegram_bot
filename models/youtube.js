const mongoose = require("mongoose");

const YoutubeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Youtube", YoutubeSchema);
