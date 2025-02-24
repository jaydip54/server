const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    ctid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    pincode: {
        type: String,
        required: true,
        maxlength: 6
    }
}, { timestamps: true });

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
