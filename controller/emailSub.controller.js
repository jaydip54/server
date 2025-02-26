const { subscriptionService } = require("../services");


// Subscribe a user
const subscribeUser = async (req, res) => {
    try {
        const subscription = await subscriptionService.subscribeUser(req.body.email);
        res.status(200).json({ success: true, message: "User subscribed successfully", subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// // Unsubscribe a user
// const unsubscribeUser = async (req, res) => {
//     try {
//         const subscription = await subscriptionService.unsubscribeUser(req.body.Emailed);
//         res.status(200).json({ success: true, message: "User unsubscribed successfully", subscription });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error unsubscribing user", error: error.message });
//     }
// };

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await subscriptionService.getAllSubscriptions();
        res.status(200).json({ success: true, subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get subscription by email
// const getSubscriptionByEmail = async (req, res) => {
//     try {
//         const subscription = await subscriptionService.getSubscriptionByEmail(req.params.email);
//         if (!subscription) {
//             return res.status(404).json({ success: false, message: "Subscription not found" });
//         }
//         res.status(200).json({ success: true, subscription });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching subscription", error: error.message });
//     }
// };

// Delete subscription
const deleteSubscription = async (req, res) => {
    try {
        const deletedSubscription = await subscriptionService.deleteSubscription(req.params.id);
        if (!deletedSubscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }
        res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting subscription", error: error.message });
    }
};

module.exports = {
    subscribeUser,
    // unsubscribeUser,
    getAllSubscriptions,
    // getSubscriptionByEmail,
    deleteSubscription,
};
