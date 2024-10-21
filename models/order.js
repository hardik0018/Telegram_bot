const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: Number, required: true,unique:true },
    teleID: { type: Number, required: true },
    name: { type: String, required: true },
    rupees: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: Number, required: true },
    status: { type: Boolean, required: true },
    code: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
