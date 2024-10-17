const mongoose = require("mongoose");

const MineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    lvl: { type: Array, required: true },
    category:{type:String,required:true},
    condition: { type: Object }, //Upgrade other card after update this to make condition
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mine_Cards", MineSchema);
