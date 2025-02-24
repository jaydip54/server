const express = require("express");
const router = express.Router();
const loginHistoryController = require("../controllers/loginHistoryController");

// Create a new login record
router.post("/", loginHistoryController.createLoginHistory);

// Get all login records
router.get("/", loginHistoryController.getAllLoginHistory);

// Get a login record by Lhid
router.get("/:id", loginHistoryController.getLoginHistoryById);

// Get login history for a specific user (Uid)
router.get("/user/:uid", loginHistoryController.getLoginHistoryByUserId);

// Delete a login record
router.delete("/:id", loginHistoryController.deleteLoginHistory);

module.exports = router;
