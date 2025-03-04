const mongoose = require("mongoose");
const express = require("express");
const { body, param, validationResult } = require("express-validator");

const router = express.Router();

// Transaction Schema
const TransactionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true },
        bank: { type: mongoose.Schema.Types.ObjectId, ref: "Bank", required: true },
        amount: { type: Number, required: true },
        transactionDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

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

// Create a new transaction
router.post(
    "/",
    validate([
        body("user").isMongoId().withMessage("Invalid User ID"),
        body("bill").isMongoId().withMessage("Invalid Bill ID"),
        body("bank").isMongoId().withMessage("Invalid Bank ID"),
        body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    ]),
    async (req, res) => {
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Get all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find().populate(["user", "bill", "bank"]);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific transaction by ID
router.get(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Transaction ID")]),
    async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id).populate(["user", "bill", "bank"]);
            if (!transaction) return res.status(404).json({ message: "Transaction not found" });
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Update a transaction
router.put(
    "/:id",
    validate([
        param("id").isMongoId().withMessage("Invalid Transaction ID"),
        body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
    ]),
    async (req, res) => {
        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTransaction) return res.status(404).json({ message: "Transaction not found" });
            res.status(200).json(updatedTransaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Delete a transaction
router.delete(
    "/:id",
    validate([param("id").isMongoId().withMessage("Invalid Transaction ID")]),
    async (req, res) => {
        try {
            const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
            if (!deletedTransaction) return res.status(404).json({ message: "Transaction not found" });
            res.status(200).json({ message: "Transaction deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
