const packageService = require("../services/packageService");

// Create Package
const createPackage = async (req, res) => {
  try {
    const newPackage = await packageService.createPackage(req.body);
    res.status(201).json({ success: true, data: newPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages();
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Package by ID
const getPackageById = async (req, res) => {
  try {
    const packageData = await packageService.getPackageById(req.params.id);
    if (!packageData) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, data: packageData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Package
const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await packageService.updatePackage(req.params.id, req.body);
    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, data: updatedPackage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Package
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await packageService.deletePackage(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
