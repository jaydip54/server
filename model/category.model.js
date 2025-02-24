const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        Name: { type: String, required: true, maxlength: 12 }, // Category Name (Max 12 characters)
        Status: { type: Number, required: true, default: 1 }, // 1 = Active, 0 = Deleted/Inactive
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
