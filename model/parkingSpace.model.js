const mongoose = require("mongoose");

const ParkingSpaceSchema = new mongoose.Schema(
    {
        Name: { type: String, required: true, maxlength: 20 }, // Name of Parking Space
    },
    { timestamps: true }
);

module.exports = mongoose.model("ParkingSpace", ParkingSpaceSchema);
