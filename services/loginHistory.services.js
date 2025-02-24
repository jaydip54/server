const LoginHistory = require("../models/LoginHistory");

// Create a new login record
const createLoginHistory = async (data) => {
    try {
        const lastLogin = await LoginHistory.findOne().sort({ Lhid: -1 });
        const newLhid = lastLogin ? lastLogin.Lhid + 1 : 1;

        const newLogin = new LoginHistory({
            Uid: data.Uid,
            Lhid: newLhid,
            Lhdate: data.Lhdate || new Date(),
        });

        return await newLogin.save();
    } catch (error) {
        throw error;
    }
};

// Get all login records
const getAllLoginHistory = async () => {
    try {
        return await LoginHistory.find();
    } catch (error) {
        throw error;
    }
};

// Get login record by Lhid
const getLoginHistoryById = async (id) => {
    try {
        return await LoginHistory.findOne({ Lhid: id });
    } catch (error) {
        throw error;
    }
};

// Get login history for a specific user (Uid)
const getLoginHistoryByUserId = async (userId) => {
    try {
        return await LoginHistory.find({ Uid: userId }).sort({ Lhdate: -1 });
    } catch (error) {
        throw error;
    }
};

// Delete a login record (permanent delete)
const deleteLoginHistory = async (id) => {
    try {
        return await LoginHistory.findOneAndDelete({ Lhid: id });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createLoginHistory,
    getAllLoginHistory,
    getLoginHistoryById,
    getLoginHistoryByUserId,
    deleteLoginHistory,
};
