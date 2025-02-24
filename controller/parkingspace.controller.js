const parkingSpaceService = require("../services/parkingSpaceService");

// Create a new parking space
const createParkingSpace = async (req, res) => {
  try {
    const parkingSpace = await parkingSpaceService.createParkingSpace(req.body);
    res.status(201).json({ success: true, message: "Parking space created", parkingSpace });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating parking space", error: error.message });
  }
};

// Get all parking spaces
const getAllParkingSpaces = async (req, res) => {
  try {
    const parkingSpaces = await parkingSpaceService.getAllParkingSpaces();
    res.status(200).json({ success: true, parkingSpaces });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching parking spaces", error: error.message });
  }
};

// Get a single parking space by ID
const getParkingSpaceById = async (req, res) => {
  try {
    const parkingSpace = await parkingSpaceService.getParkingSpaceById(req.params.id);
    if (!parkingSpace) {
      return res.status(404).json({ success: false, message: "Parking space not found" });
    }
    res.status(200).json({ success: true, parkingSpace });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching parking space", error: error.message });
  }
};

// Update parking space
const updateParkingSpace = async (req, res) => {
  try {
    const updatedParkingSpace = await parkingSpaceService.updateParkingSpace(req.params.id, req.body);
    if (!updatedParkingSpace) {
      return res.status(404).json({ success: false, message: "Parking space not found" });
    }
    res.status(200).json({ success: true, message: "Parking space updated", updatedParkingSpace });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating parking space", error: error.message });
  }
};

// Delete parking space
const deleteParkingSpace = async (req, res) => {
  try {
    const deletedParkingSpace = await parkingSpaceService.deleteParkingSpace(req.params.id);
    if (!deletedParkingSpace) {
      return res.status(404).json({ success: false, message: "Parking space not found" });
    }
    res.status(200).json({ success: true, message: "Parking space deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting parking space", error: error.message });
  }
};

module.exports = {
  createParkingSpace,
  getAllParkingSpaces,
  getParkingSpaceById,
  updateParkingSpace,
  deleteParkingSpace,
};
