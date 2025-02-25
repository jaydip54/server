const { loginHistoryService } = require("../services");



// Get all login records
const getAllLoginHistory = async (req, res) => {
    try {
        const logins = await loginHistoryService.getAllLoginHistory();
        if (!logins) {
            throw new Error('Login history not available')
        }
        res.status(200).json({ success: true, logins });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
        res.status(500).json({ success: false, message: error.message });
    }
};



// Delete a login record
const deleteLoginHistory = async (req, res) => {
    console.log("🚀 ~ deleteLoginHistory ~ req:", req)
    try {
        const deletedLogin = await loginHistoryService.deleteLoginHistory(req.params.id);
        if (!deletedLogin) {
            return res.status(404).json({ success: false, message: "Login record not found" });
        }
        res.status(200).json({ success: true, message: "Login record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get login record by user id

const getLoginHistoryByUserId = async (req, res) => {
    try {
        const userid = req.user._id
        console.log("🚀 ~ getAllLoginHistory ~ userid:", userid)
        const logins = await loginHistoryService.getLoginHistoryByUserId(userid);
        if (!logins) {
            throw new Error('No login history found for this user')
        }
        res.status(200).json({ success: true, logins });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    getAllLoginHistory,
    getLoginHistoryById,
    getLoginHistoryByUserId,
    deleteLoginHistory,
};
