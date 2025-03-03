const mongoose = require("mongoose");

const CapacitySchema = new mongoose.Schema(
    {
        registerPlaceId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessPlace", required: true },
        parkingPlaceId: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpace", required: true },
        vehicleModelId: { type: mongoose.Schema.Types.ObjectId, ref: "VehicleModel", required: true },
        capacity: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Capacity", CapacitySchema);
