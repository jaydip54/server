const { emailSubSchema } = require("../model");


// Create a subscription
const subscribeUser = async (email) => {
    try {
        return await emailSubSchema.create({ Emailed: email })
    } catch (error) {
        throw error;
    }
};

// Unsubscribe a user
// const unsubscribeUser = async (email) => {
//     try {
//         const subscription = await emailSubSchema.findOne({ Emailed: email });
//         if (!subscription) {
//             throw new Error("Email not found");
//         }
//         subscription.Status = 0; // Set to unsubscribed
//         return await subscription.save();
//     } catch (error) {
//         throw error;
//     }
// };

// Get all subscriptions
const getAllSubscriptions = async () => {
    try {
        return await emailSubSchema.find()
    } catch (error) {
        throw error;
    }
};

// Get subscription status by email
// const getSubscriptionByEmail = async (email) => {
//     try {
//         return await emailSubSchema.findOne({ Emailed: email });
//     } catch (error) {
//         throw error;
//     }
// };

// Delete a subscription
const deleteSubscription = async (id) => {
    try {
        return await emailSubSchema.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    subscribeUser,
    // unsubscribeUser,
    getAllSubscriptions,
    // getSubscriptionByEmail,
    deleteSubscription,
};
