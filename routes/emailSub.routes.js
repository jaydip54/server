const express = require("express");
const { subscriptionController } = require("../controller");
const router = express.Router();

// Subscribe a user
router.post("/subscribe", subscriptionController.subscribeUser);

// Unsubscribe a user
// router.post("/unsubscribe", subscriptionController.unsubscribeUser);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// Get subscription by email
// router.get("/:email", subscriptionController.getSubscriptionByEmail);

// Delete a subscription
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
