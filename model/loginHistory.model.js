const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }, // ID of the User (Foreign Key)
        Lhdate: { type: Date, required: true, default: Date.now }, // Date and Time of Login
    },
    { timestamps: true }
);

module.exports = mongoose.model("LoginHistory", LoginHistorySchema);
