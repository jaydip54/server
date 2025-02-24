const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Subscribe a user
router.post("/subscribe", subscriptionController.subscribeUser);

// Unsubscribe a user
router.post("/unsubscribe", subscriptionController.unsubscribeUser);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// Get subscription by email
router.get("/:email", subscriptionController.getSubscriptionByEmail);

// Delete a subscription
router.delete("/:email", subscriptionController.deleteSubscription);

module.exports = router;
