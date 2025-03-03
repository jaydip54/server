const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// ============================
// Mongoose Schema & Model
// ============================
const BookParkingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        businessRegisterPlace: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessPlace", required: true },
        // parkingSpace: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpace", required: true },
        vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
        bookingDate: { type: Date, default: Date.now, required: true },
        placeNo: { type: String, required: true },
        amt: { type: Number, required: true, min: 0 },
        arrivalDate: { type: Date, required: true },
        leaveDate: { type: Date, required: true },
        finalPayAmt: { type: Number, required: true, min: 0 },
        paymentMode: { type: String, enum: ["Cash", "Card", "UPI", "Bank Transfer"], required: true },
        status: { type: String, enum: ["Booked", "Cancelled", "Completed"], default: "Booked" },
        statusPark: { type: String, enum: ["Occupied", "Vacant"], default: "Vacant" },
    },
    { timestamps: true }
);

const BookParking = mongoose.model("BookParking", BookParkingSchema);

// ============================
// Service Layer
// ============================
const bookParkingService = {
    async createBookParking(data) {
        return await BookParking.create(data);
    },
    async getAllBookParkings() {
        return await BookParking.find().populate(["user", "businessRegisterPlace", "parkingSpace", "vehicle"]);
    },
    async getBookParkingById(id) {
        return await BookParking.findById(id).populate(["user", "businessRegisterPlace", "parkingSpace", "vehicle"]);
    },
    async updateBookParking(id, data) {
        return await BookParking.findByIdAndUpdate(id, data, { new: true }).populate([
            "user",
            "businessRegisterPlace",
            "parkingSpace",
            "vehicle",
        ]);
    },
    async deleteBookParking(id) {
        return await BookParking.findByIdAndDelete(id);
    },
};

// ============================
// Controller Layer
// ============================
const bookParkingController = {
    async createBookParking(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const bookParking = await bookParkingService.createBookParking(req.body);
            res.status(201).json(bookParking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllBookParkings(req, res) {
        try {
            const bookParkings = await bookParkingService.getAllBookParkings();
            res.status(200).json(bookParkings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBookParkingById(req, res) {
        try {
            const bookParking = await bookParkingService.getBookParkingById(req.params.id);
            if (!bookParking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(bookParking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBookParking(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const updatedBookParking = await bookParkingService.updateBookParking(req.params.id, req.body);
            if (!updatedBookParking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(updatedBookParking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBookParking(req, res) {
        try {
            const deletedBookParking = await bookParkingService.deleteBookParking(req.params.id);
            if (!deletedBookParking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

// ============================
// Routes
// ============================
router.post(
    "/",
    [
        check("user").isMongoId().withMessage("Valid User ID is required"),
        check("businessRegisterPlace").isMongoId().withMessage("Valid Business Register Place ID is required"),
        check("parkingSpace").isMongoId().withMessage("Valid Parking Space ID is required"),
        check("vehicle").isMongoId().withMessage("Valid Vehicle ID is required"),
        check("placeNo").notEmpty().withMessage("Place number is required"),
        check("amt").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
        check("arrivalDate").isISO8601().withMessage("Valid arrival date is required"),
        check("leaveDate").isISO8601().withMessage("Valid leave date is required"),
        check("finalPayAmt").isFloat({ min: 0 }).withMessage("Final payment amount must be a positive number"),
        check("paymentMode").isIn(["Cash", "Card", "UPI", "Bank Transfer"]).withMessage("Invalid payment mode"),
        check("status").optional().isIn(["Booked", "Cancelled", "Completed"]).withMessage("Invalid status"),
        check("statusPark").optional().isIn(["Occupied", "Vacant"]).withMessage("Invalid parking status"),
    ],
    bookParkingController.createBookParking
);

router.get("/", bookParkingController.getAllBookParkings);
router.get("/:id", bookParkingController.getBookParkingById);

router.put(
    "/:id",
    [
        check("placeNo").optional().notEmpty().withMessage("Place number is required"),
        check("amt").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
        check("arrivalDate").optional().isISO8601().withMessage("Valid arrival date is required"),
        check("leaveDate").optional().isISO8601().withMessage("Valid leave date is required"),
        check("finalPayAmt").optional().isFloat({ min: 0 }).withMessage("Final payment amount must be a positive number"),
        check("paymentMode").optional().isIn(["Cash", "Card", "UPI", "Bank Transfer"]).withMessage("Invalid payment mode"),
        check("status").optional().isIn(["Booked", "Cancelled", "Completed"]).withMessage("Invalid status"),
        check("statusPark").optional().isIn(["Occupied", "Vacant"]).withMessage("Invalid parking status"),
    ],
    bookParkingController.updateBookParking
);

router.delete("/:id", bookParkingController.deleteBookParking);

module.exports = router;
