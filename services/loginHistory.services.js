const { LoginHistory } = require("../model");


// Create a new login record
const createLoginHistory = (data) => {
    return LoginHistory.create(data)
};

// Get all login records
const getAllLoginHistory = () => {

    return LoginHistory.find().populate('user');

};

// Get login record by Lhid
const getLoginHistoryById = async (id) => {
    return LoginHistory.findById(id).populate('user')
};

// Get login history for a specific user (Uid)
const getLoginHistoryByUserId = (userId) => {

    return LoginHistory.find({ user: userId }).populate('user');

};

// Delete a login record (permanent delete)
const deleteLoginHistory = (id) => {

    return LoginHistory.findByIdAndDelete(id).populate('user');

};

module.exports = {
    createLoginHistory,
    getAllLoginHistory,
    getLoginHistoryById,
    getLoginHistoryByUserId,
    deleteLoginHistory,
};
