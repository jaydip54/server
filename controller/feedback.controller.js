const { feedbackService } = require("../services");


// Create feedback
const createFeedback = async (req, res) => {
    try {
        const user = req.user._id
        const feedback = await feedbackService.createFeedback({ Msg: req.body.Msg, Username: user });
        res.status(201).json({ success: true, message: "Feedback submitted", feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting feedback", error: error.message });
    }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedbacks();
        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching feedbacks", error: error.message });
    }
};

// Get a single feedback by ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await feedbackService.getFeedbackById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching feedback", error: error.message });
    }
};

// Update feedback
const updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await feedbackService.updateFeedback(req.params.id, req.body);
        if (!updatedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, message: "Feedback updated", updatedFeedback });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating feedback", error: error.message });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const deletedFeedback = await feedbackService.deleteFeedback(req.params.id);
        if (!deletedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }
        res.status(200).json({ success: true, message: "Feedback deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting feedback", error: error.message });
    }
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
