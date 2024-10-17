const mongoose = require("mongoose");

const RedeemSchema = new mongoose.Schema(
  {
    Coin: { type: Number, required: true },
    Ruppes: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Redeem", RedeemSchema);
