const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50 }, // Name of the package
    amount: { type: Number, required: true }, // Package amount
    duration: { type: Number, required: true }, // Duration in days
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);
