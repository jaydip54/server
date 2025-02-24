const { CategorySchema } = require("../model");



// Create a new category
const createCategory = (data) => {
    return CategorySchema.create(data)
};

// Get all categories (with optional filter for active/inactive)
const getAllCategories = () => {
    return CategorySchema.find();
};

// Get category by ID
const getCategoryById = (id) => {
    return CategorySchema.findById(id)

};

// Update a category
const updateCategory = (id, data) => {

    return CategorySchema.findByIdAndUpdate(id, data, { new: true });

};

const deleteCategory = (id) => {

    return CategorySchema.findByIdAndDelete(id);

};



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
