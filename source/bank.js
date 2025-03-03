const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// ============================
// MONGOOSE MODEL
// ============================
const BankSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    bankName: { type: String, required: true, trim: true },
    branchName: { type: String, required: true, trim: true },
    ifscCode: { type: String, required: true, trim: true, uppercase: true },
    accountNo: { type: String, required: true, unique: true, trim: true },
});

const Bank = mongoose.model("Bank", BankSchema);

// ============================
// VALIDATION RULES
// ============================
const validateBank = [
    check("userId").isMongoId().withMessage("Invalid User ID"),
    check("cityId").isMongoId().withMessage("Invalid City ID"),
    check("bankName").notEmpty().withMessage("Bank Name is required"),
    check("branchName").notEmpty().withMessage("Branch Name is required"),
    check("ifscCode")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        .withMessage("Invalid IFSC Code format"),
    check("accountNo")
        .isLength({ min: 8, max: 20 })
        .withMessage("Account Number should be between 8-20 characters"),
];

// ============================
// SERVICE LAYER
// ============================
const bankService = {
    async createBank(data) {
        return await Bank.create(data);
    },
    async getAllBanks() {
        return await Bank.find().populate("cityId userId");
    },
    async getBankById(id) {
        return await Bank.findById(id).populate("cityId userId");
    },
    async updateBank(id, data) {
        return await Bank.findByIdAndUpdate(id, data, { new: true }).populate("cityId userId");
    },
    async deleteBank(id) {
        return await Bank.findByIdAndDelete(id).populate("cityId userId");
    },
};


// ============================
// CONTROLLER
// ============================
const bankController = {
    async createBank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const bank = await bankService.createBank(req.body);
            res.status(201).json(bank);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllBanks(req, res) {
        try {
            const banks = await bankService.getAllBanks();
            res.status(200).json(banks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBankById(req, res) {
        try {
            const bank = await bankService.getBankById(req.params.id);
            if (!bank) {
                return res.status(404).json({ message: "Bank not found" });
            }
            res.status(200).json(bank);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateBank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const updatedBank = await bankService.updateBank(req.params.id, req.body);
            if (!updatedBank) {
                return res.status(404).json({ message: "Bank not found" });
            }
            res.status(200).json(updatedBank);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBank(req, res) {
        try {
            const deletedBank = await bankService.deleteBank(req.params.id);
            if (!deletedBank) {
                return res.status(404).json({ message: "Bank not found" });
            }
            res.status(200).json({ message: "Bank deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

// ============================
// ROUTES
// ============================
router.post("/", validateBank, bankController.createBank);
router.get("/", bankController.getAllBanks);
router.get("/:id", bankController.getBankById);
router.put("/:id", validateBank, bankController.updateBank);
router.delete("/:id", bankController.deleteBank);

module.exports = router;
