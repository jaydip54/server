const express = require("express");
const mongoose = require("mongoose");
const { body, param, validationResult } = require("express-validator");




// Bill Schema
const BillSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        businessRegisterPlace: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessPlace", required: true },
        vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
        finalPayment: { type: Number, required: true, min: 0 },
        billDate: { type: Date, default: Date.now, required: true },
        paymentMode: { type: String, enum: ["Cash", "Card", "UPI", "Bank Transfer"], required: true },
    },
    { timestamps: true }
);

const Bill = mongoose.model("Bill", BillSchema);

// Middleware for validation errors
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    };
};

// Service Layer (Business Logic)
const billService = {
    createBill: async (data) => {
        return await Bill.create(data);
    },

    getAllBills: async () => {
        return await Bill.find().populate(["user", "businessRegisterPlace", "vehicle"]);
    },

    getBillById: async (id) => {
        return await Bill.findById(id).populate(["user", "businessRegisterPlace", "vehicle"]);
    },

    updateBill: async (id, data) => {
        return await Bill.findByIdAndUpdate(id, data, { new: true });
    },

    deleteBill: async (id) => {
        return await Bill.findByIdAndDelete(id);
    },
};

// Controller Layer (Handling Requests)
const billController = {
    createBill: async (req, res) => {
        try {
            const bill = await billService.createBill(req.body);
            res.status(201).json(bill);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllBills: async (req, res) => {
        try {
            const bills = await billService.getAllBills();
            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getBillById: async (req, res) => {
        try {
            const bill = await billService.getBillById(req.params.id);
            if (!bill) return res.status(404).json({ message: "Bill not found" });
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateBill: async (req, res) => {
        try {
            const updatedBill = await billService.updateBill(req.params.id, req.body);
            if (!updatedBill) return res.status(404).json({ message: "Bill not found" });
            res.status(200).json(updatedBill);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteBill: async (req, res) => {
        try {
            const deletedBill = await billService.deleteBill(req.params.id);
            if (!deletedBill) return res.status(404).json({ message: "Bill not found" });
            res.status(200).json({ message: "Bill deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

// Routes
const router = express.Router();

router.post(
    "/",
    validate([
        body("user").isMongoId().withMessage("Invalid User ID"),
        body("businessRegisterPlace").isMongoId().withMessage("Invalid Business Place ID"),
        body("vehicle").isMongoId().withMessage("Invalid Vehicle ID"),
        body("finalPayment").isFloat({ min: 0 }).withMessage("Final Payment must be a positive number"),
        body("paymentMode").isIn(["Cash", "Card", "UPI", "Bank Transfer"]).withMessage("Invalid Payment Mode"),
    ]),
    billController.createBill
);

router.get("/", billController.getAllBills);

router.get(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Bill ID")]),
    billController.getBillById
);

router.put(
    "/:id",
    validate([
        param("id").isMongoId().withMessage("Invalid Bill ID"),
        body("finalPayment").optional().isFloat({ min: 0 }).withMessage("Final Payment must be a positive number"),
        body("paymentMode").optional().isIn(["Cash", "Card", "UPI", "Bank Transfer"]).withMessage("Invalid Payment Mode"),
    ]),
    billController.updateBill
);

router.delete(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Bill ID")]),
    billController.deleteBill
);




module.exports = router