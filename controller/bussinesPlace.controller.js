const { check, validationResult } = require("express-validator");
const { businessPlaceService } = require("../services");
const businessPlaceModel = require("../model/businessPlace.model");

// Validation rules for creating/updating a business place
const validateBusinessPlace = [
  check("user").isMongoId().withMessage("Invalid user ID"),
  check("city").optional().isMongoId().withMessage("Invalid city ID"),
  check("areaId").isMongoId().withMessage("Area ID is required"),
  check("categoryId").isMongoId().withMessage("Category ID is required"),
  check("packageId").isMongoId().withMessage("Package ID is required"),
  check("placeName").notEmpty().withMessage("Place name is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("placeEmailId").isEmail().withMessage("Valid email is required"),
  check("contact").isString().notEmpty().withMessage("Contact number is required"),
  check("location").notEmpty().withMessage("Location is required"),
];

// Register a business place
const registerPlace = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const place = await businessPlaceService.registerPlace(req.body);
    res.status(201).json({
      message: "Business place registered successfully",
      data: place
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//login a business place 
const getAllLoginUserPlaces = async (req, res) => {
  try {
    const user = req.user._id
    const places = await businessPlaceModel.find({ user: user })
    res.status(201).json({
      message: "Business place get successfully",
      data: places
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all business places
const getAllPlaces = async (req, res) => {
  try {
    const places = await businessPlaceService.getAllPlaces();
    res.status(201).json({
      message: "Business place get successfully",
      data: places
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a business place by ID
const getPlaceById = async (req, res) => {
  try {
    const place = await businessPlaceService.getPlaceById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Business Place not found" });
    }
    res.status(201).json({
      message: "Business place get successfully",
      data: place
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a business place
const updatePlace = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedPlace = await businessPlaceService.updatePlace(req.params.id, req.body);
    if (!updatedPlace) {
      return res.status(404).json({ message: "Business Place not found" });
    }
    res.status(201).json({
      message: "Business place get successfully",
      data: updatePlace
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a business place
const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await businessPlaceService.deletePlace(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: "Business Place not found" });
    }
    res.status(200).json({ message: "Business Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export functions
module.exports = {
  registerPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  validateBusinessPlace,
  getAllLoginUserPlaces
};
