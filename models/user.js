const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    teleID: { type: Number, require: true, unique: true },
    name: { type: String, require: true },
    coin: { type: Number, require: false, default: 0 },
    tap: { type: Number, default: 1 },
    PPH: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    img: { type: String },
    Cards: { type: Array, default: [] },
    status: { type: Boolean },
    ban: { type: Object },
    youtube: { type: Array, default: [] },
    checkin: { type: Object },
    friends: [
      {
        teleID: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    followOn: {
      type: Array,
      default: [
        { platForm: "Youtube", status: false, coin: 1000 ,link:""},
        { platForm: "Instagram", status: false, coin: 1000 ,link:""},
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
