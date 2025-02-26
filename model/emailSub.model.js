const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        Emailed: { type: String, required: true, unique: true }, // Email ID of User (Primary Key)
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
