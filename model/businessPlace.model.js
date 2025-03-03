const mongoose = require("mongoose");

const BusinessPlaceSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        city: { type: mongoose.Schema.Types.ObjectId, ref: "City", },
        areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
        placeName: { type: String, required: true },
        address: { type: String, required: true },
        placeEmailId: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        contact: { type: String, required: true, unique: true },
        over: { type: Boolean, default: false },
        activeStatus: { type: Boolean, default: true }, 
        activeDate: { type: Date, default: Date.now },
        deactiveDate: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BusinessPlace", BusinessPlaceSchema);
