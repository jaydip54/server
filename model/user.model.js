const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ctid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    areaid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    contact: {
        type: String,
    },
    emailed: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    pwd: {
        type: String,
        required: true,
        minlength: 6
    },
    sq: {
        type: String,
        required: true,
        maxlength: 50
    },
    sa: {
        type: String,
        required: true,
        maxlength: 30
    },
    type: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3] // Example: 0 = User, 1 = Admin , 2 = place owner , 3 = visitor
    },
    logindate: {
        type: Date,
        default: Date.now
    },
    propic: {
        type: String,
        maxlength: 50
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
