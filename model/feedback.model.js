const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        Username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, // Name of User
        Msg: { type: String, required: true, maxlength: 100 }, // Feedback Message
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
