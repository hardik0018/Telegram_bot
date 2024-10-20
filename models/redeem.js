const mongoose = require("mongoose");

const RedeemSchema = new mongoose.Schema(
  {
    coin: { type: Number, required: true },
    rupees: { type: Number, required: true },
    qty: { type: Number, required: true },
    condition: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Redeem", RedeemSchema);
