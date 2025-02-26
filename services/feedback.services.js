const { Feedback } = require("../model");


// Create feedback
const createFeedback = (data) => {
    return Feedback.create(data)
};

// Get all feedbacks
const getAllFeedbacks = async () => {
    try {
        return await Feedback.find().populate('Username')
    } catch (error) {
        throw error;
    }
};

// Get feedback by ID
const getFeedbackById = async (id) => {
    try {
        return await Feedback.findById(id);
    } catch (error) {
        throw error;
    }
};

// Update feedback
const updateFeedback = async (id, data) => {
    try {
        return await Feedback.findByIdAndUpdate(id, data, { new: true })
    } catch (error) {
        throw error;
    }
};

// Delete feedback
const deleteFeedback = async (id) => {
    try {
        return await Feedback.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
