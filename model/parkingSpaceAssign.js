const mongoose = require("mongoose");

const ParkingAssignmentSchema = new mongoose.Schema(
    {
        businessPlaceId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessPlace", required: true },
        parkingSpaceId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpace", required: true },
        assignedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ParkingAssignment", ParkingAssignmentSchema);

