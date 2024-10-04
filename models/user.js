const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true, unique: true },
    name: { type: String, require: true },
    coin: { type: Number, require: true },
    tap: { type: Number },
    PPH: { type: Number },
    level: { type: Number },
    img: { type: String },
    redeem: { type: Array },
    status: { type: Boolean },
    ban: { type: Object },
    friends: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
