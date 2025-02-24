const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        Emailed: { type: String, required: true, unique: true }, // Email ID of User (Primary Key)
        Status: { type: Number, required: true, enum: [0, 1], default: 1 }, // 1 = Subscribed, 0 = Unsubscribed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
