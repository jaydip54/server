const Package = require("../models/Package");

// Create Package
const createPackage = async (data) => {
  try {
    const newPackage = new Package({
      name: data.name,
      amount: data.amount,
      duration: data.duration,
    });

    return await newPackage.save();
  } catch (error) {
    throw error;
  }
};

// Get all Packages
const getAllPackages = async () => {
  try {
    return await Package.find();
  } catch (error) {
    throw error;
  }
};

// Get Package by ID
const getPackageById = async (id) => {
  try {
    return await Package.findById(id);
  } catch (error) {
    throw error;
  }
};

// Update Package
const updatePackage = async (id, data) => {
  try {
    return await Package.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw error;
  }
};

// Delete Package
const deletePackage = async (id) => {
  try {
    return await Package.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
