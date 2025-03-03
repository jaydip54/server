const { Capacity } = require("../model");

// Create a new capacity entry
const createCapacity = async (data) => {
    return await Capacity.create(data);
};

// Get all capacity records
const getAllCapacities = async () => {
    return await Capacity.find().populate(["registerPlaceId", "parkingPlaceId", "vehicleModelId"]);
};

// Get a specific capacity record by ID
const getCapacityById = async (id) => {
    return await Capacity.findById(id).populate(["registerPlaceId", "parkingPlaceId", "vehicleModelId"]);
};

// Update a capacity record
const updateCapacity = async (id, data) => {
    return await Capacity.findByIdAndUpdate(id, data, { new: true });
};

// Delete a capacity record
const deleteCapacity = async (id) => {
    return await Capacity.findByIdAndDelete(id);
};

module.exports = {
    createCapacity,
    getAllCapacities,
    getCapacityById,
    updateCapacity,
    deleteCapacity,
};
