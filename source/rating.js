const express = require("express");
const mongoose = require("mongoose");
const { body, param, validationResult } = require("express-validator");

const router = express.Router();

// Rating Schema
const RatingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        businessPlace: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessPlace", required: true },
        rate: { type: Number, min: 1, max: 5, required: true },
    },
    { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

// Middleware for validation errors
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    };
};

// Routes

// Create a new rating
router.post(
    "/",
    validate([
        body("user").isMongoId().withMessage("Invalid User ID"),
        body("businessPlace").isMongoId().withMessage("Invalid Business Place ID"),
        body("rate").isInt({ min: 1, max: 5 }).withMessage("Rate must be between 1 and 5"),
    ]),
    async (req, res) => {
        try {
            const rating = await Rating.create(req.body);
            res.status(201).json(rating);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Get all ratings
router.get("/", async (req, res) => {
    try {
        const ratings = await Rating.find().populate(["user", "businessPlace"]);
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific rating by ID
router.get(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Rating ID")]),
    async (req, res) => {
        try {
            const rating = await Rating.findById(req.params.id).populate(["user", "businessPlace"]);
            if (!rating) return res.status(404).json({ message: "Rating not found" });
            res.status(200).json(rating);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Update a rating
router.put(
    "/:id",
    validate([
        param("id").isMongoId().withMessage("Invalid Rating ID"),
        body("rate").optional().isInt({ min: 1, max: 5 }).withMessage("Rate must be between 1 and 5"),
    ]),
    async (req, res) => {
        try {
            const updatedRating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedRating) return res.status(404).json({ message: "Rating not found" });
            res.status(200).json(updatedRating);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Delete a rating
router.delete(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Rating ID")]),
    async (req, res) => {
        try {
            const deletedRating = await Rating.findByIdAndDelete(req.params.id);
            if (!deletedRating) return res.status(404).json({ message: "Rating not found" });
            res.status(200).json({ message: "Rating deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
