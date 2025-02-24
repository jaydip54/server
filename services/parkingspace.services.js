const ParkingSpace = require("../models/ParkingSpace");

// Create a new parking space
const createParkingSpace = async (data) => {
  try {
    const lastRecord = await ParkingSpace.findOne().sort({ Pspaceid: -1 });
    const nextId = lastRecord ? lastRecord.Pspaceid + 1 : 1;

    const newSpace = new ParkingSpace({ Pspaceid: nextId, Name: data.Name });
    return await newSpace.save();
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
    return await ParkingSpace.findOne({ Pspaceid: id });
  } catch (error) {
    throw error;
  }
};

// Update parking space
const updateParkingSpace = async (id, data) => {
  try {
    return await ParkingSpace.findOneAndUpdate({ Pspaceid: id }, data, { new: true });
  } catch (error) {
    throw error;
  }
};

// Delete parking space
const deleteParkingSpace = async (id) => {
  try {
    return await ParkingSpace.findOneAndDelete({ Pspaceid: id });
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
