const express = require("express");
const { CategoryController } = require("../controller");
const router = express.Router();

// Create a new category
router.post("/", CategoryController.createCategory);

// Get all categories (optional: filter by status)
router.get("/", CategoryController.getAllCategories);

// Get a category by ID
router.get("/:id", CategoryController.getCategoryById);

// Update a category
router.put("/:id", CategoryController.updateCategory);

// Soft delete a category (change Status to 0)
router.delete("/:id", CategoryController.deleteCategory);


module.exports = router;
