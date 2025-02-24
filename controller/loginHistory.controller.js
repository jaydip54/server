const loginHistoryService = require("../services/loginHistoryService");

// Create a new login record
const createLoginHistory = async (req, res) => {
    try {
        const login = await loginHistoryService.createLoginHistory(req.body);
        res.status(201).json({ success: true, message: "Login record created successfully", login });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating login record", error });
    }
};

// Get all login records
const getAllLoginHistory = async (req, res) => {
    try {
        const logins = await loginHistoryService.getAllLoginHistory();
        res.status(200).json({ success: true, logins });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching login records", error });
    }
};

// Get login record by Lhid
const getLoginHistoryById = async (req, res) => {
    try {
        const login = await loginHistoryService.getLoginHistoryById(req.params.id);
        if (!login) {
            return res.status(404).json({ success: false, message: "Login record not found" });
        }
        res.status(200).json({ success: true, login });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching login record", error });
    }
};

// Get login history for a specific user (Uid)
const getLoginHistoryByUserId = async (req, res) => {
    try {
        const logins = await loginHistoryService.getLoginHistoryByUserId(req.params.uid);
        res.status(200).json({ success: true, logins });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user login history", error });
    }
};

// Delete a login record
const deleteLoginHistory = async (req, res) => {
    try {
        const deletedLogin = await loginHistoryService.deleteLoginHistory(req.params.id);
        if (!deletedLogin) {
            return res.status(404).json({ success: false, message: "Login record not found" });
        }
        res.status(200).json({ success: true, message: "Login record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting login record", error });
    }
};

module.exports = {
    createLoginHistory,
    getAllLoginHistory,
    getLoginHistoryById,
    getLoginHistoryByUserId,
    deleteLoginHistory,
};
