const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        Lhdate: { type: Date, required: true, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("LoginHistory", LoginHistorySchema);
