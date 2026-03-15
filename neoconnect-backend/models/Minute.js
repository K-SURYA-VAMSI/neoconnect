const mongoose = require("mongoose");

const minuteSchema = new mongoose.Schema({
 title: {
  type: String,
  required: true,
  trim: true
 },
 fileUrl: {
  type: String,
  required: true
 },
 uploadedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
 }
}, { timestamps: true });

module.exports = mongoose.model("Minute", minuteSchema);
