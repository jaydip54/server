const express = require("express");
const { feedbackController } = require("../controller");
const router = express.Router();

// Create feedback
router.post("/", feedbackController.createFeedback);

// Get all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

// Get a single feedback by ID
router.get("/:id", feedbackController.getFeedbackById);

// Update a feedback
router.put("/:id", feedbackController.updateFeedback);

// Delete a feedback
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
