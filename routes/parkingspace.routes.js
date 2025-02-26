const express = require("express");
const { parkingSpaceController } = require("../controller");
const router = express.Router();

// Create a new parking space
router.post("/", parkingSpaceController.createParkingSpace);

// Get all parking spaces
router.get("/", parkingSpaceController.getAllParkingSpaces);

// Get a single parking space by ID
router.get("/:id", parkingSpaceController.getParkingSpaceById);

// Update a parking space
router.put("/:id", parkingSpaceController.updateParkingSpace);

// Delete a parking space
router.delete("/:id", parkingSpaceController.deleteParkingSpace);

module.exports = router;
