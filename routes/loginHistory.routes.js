const express = require("express");
const { loginHistoryController } = require("../controller");
const { isLogin } = require("../middleware/auth");
const router = express.Router();


// Get all login records
router.get("/getall", loginHistoryController.getAllLoginHistory);

// Get a login record by Lhid
router.get("/:id", loginHistoryController.getLoginHistoryById);

// Get login history for a specific user (Uid)
router.get("/", loginHistoryController.getLoginHistoryByUserId);

// Delete a login record
router.delete("/:id", loginHistoryController.deleteLoginHistory);

module.exports = router;
