const { ParkingSpace } = require("../model");


// Create a new parking space
const createParkingSpace = async (data) => {
  try {
    return await ParkingSpace.create(data);
  } catch (error) {
    throw error;
  }
};

// Get all parking spaces
const getAllParkingSpaces = async () => {
  try {
    return await ParkingSpace.find();
  } catch (error) {
    throw error;
  }
};

// Get parking space by ID
const getParkingSpaceById = async (id) => {
  try {
    return await ParkingSpace.findById(id);
  } catch (error) {
    throw error;
  }
};

// Update parking space
const updateParkingSpace = async (id, data) => {
  try {
    return await ParkingSpace.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

// Delete parking space
const deleteParkingSpace = async (id) => {
  try {
    return await ParkingSpace.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createParkingSpace,
  getAllParkingSpaces,
  getParkingSpaceById,
  updateParkingSpace,
  deleteParkingSpace,
};
