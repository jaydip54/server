const { categoryService } = require("../services");


// Create a new category
const createCategory = async (req, res) => {
    try {
        const { Status, Name } = req.body
        if (!Status || !Name) {
            throw new Error("Entre Require Field");
        }
        const Exist = await categoryService.findbynameOne(Name)
        if (Exist) {
            return res.status(400).json({ success: false, message: "Category already exist" });
        }
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ success: true, message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        if (!categories) {
            throw new Error("Failed Fetch Data");

        }
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching categories", error });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching category", error });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { Status, Name } = req.body
        if (!Status || !Name) {
            throw new Error("Entre Require Field");
        }
        const Exist = await categoryService.findbynameOne(Name)
        if (Exist && Exist._id !== req.params.id) {
            return res.status(400).json({ success: false, message: "Category already exist" });
        }
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Soft delete category
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoryService.deleteCategory(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting category", error });
    }
};


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
