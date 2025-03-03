const express = require("express");
const mongoose = require("mongoose");
const { body, param, validationResult } = require("express-validator");

const router = express.Router();

// Cancel Booking Schema
const CancelBookingSchema = new mongoose.Schema(
    {
        booking: { type: mongoose.Schema.Types.ObjectId, ref: "BookParking", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        cancelDate: { type: Date, default: Date.now, required: true },
        reason: { type: String, required: true },
        refundAmount: { type: Number, default: 0 },
        status: { type: String, enum: ["Pending", "Refunded", "Rejected"], default: "Pending" },
    },
    { timestamps: true }
);

const CancelBooking = mongoose.model("CancelBooking", CancelBookingSchema);

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

// Create a new cancellation request
router.post(
    "/",
    validate([
        body("booking").isMongoId().withMessage("Invalid Booking ID"),
        body("user").isMongoId().withMessage("Invalid User ID"),
        body("reason").isString().notEmpty().withMessage("Reason is required"),
        body("refundAmount").optional().isFloat({ min: 0 }).withMessage("Refund amount must be a positive number"),
        body("status").optional().isIn(["Pending", "Refunded", "Rejected"]).withMessage("Invalid status"),
    ]),
    async (req, res) => {
        try {
            const cancelBooking = await CancelBooking.create(req.body);
            res.status(201).json(cancelBooking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Get all cancellation requests
router.get("/", async (req, res) => {
    try {
        const cancelBookings = await CancelBooking.find().populate(["booking", "user"]);
        res.status(200).json(cancelBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific cancellation request by ID
router.get(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Cancellation Request ID")]),
    async (req, res) => {
        try {
            const cancelBooking = await CancelBooking.findById(req.params.id).populate(["booking", "user"]);
            if (!cancelBooking) return res.status(404).json({ message: "Cancellation request not found" });
            res.status(200).json(cancelBooking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Update a cancellation request status
router.put(
    "/:id",
    validate([
        param("id").isMongoId().withMessage("Invalid Cancellation Request ID"),
        body("refundAmount").optional().isFloat({ min: 0 }).withMessage("Refund amount must be a positive number"),
        body("status").optional().isIn(["Pending", "Refunded", "Rejected"]).withMessage("Invalid status"),
    ]),
    async (req, res) => {
        try {
            const updatedCancelBooking = await CancelBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCancelBooking) return res.status(404).json({ message: "Cancellation request not found" });
            res.status(200).json(updatedCancelBooking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Delete a cancellation request
router.delete(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Cancellation Request ID")]),
    async (req, res) => {
        try {
            const deletedCancelBooking = await CancelBooking.findByIdAndDelete(req.params.id);
            if (!deletedCancelBooking) return res.status(404).json({ message: "Cancellation request not found" });
            res.status(200).json({ message: "Cancellation request deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
