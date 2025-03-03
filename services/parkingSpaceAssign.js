const { ParkingAssignment } = require("../model");


// Assign a parking space to a business place
const assignParkingSpace = async (data) => {
    return await ParkingAssignment.create(data)
};

// Get all assigned parking spaces
const getAllAssignments = async () => {
    return await ParkingAssignment.find().populate(["businessPlaceId", "parkingSpaceId"]);
};

// Get a specific assignment by ID
const getAssignmentById = async (id) => {
    return await ParkingAssignment.findById(id).populate(["businessPlaceId", "parkingSpaceId"]);
};

// Update a parking space assignment
const updateAssignment = async (id, data) => {
    return await ParkingAssignment.findByIdAndUpdate(id, data, { new: true });
};

// Delete a parking space assignment
const deleteAssignment = async (id) => {
    return await ParkingAssignment.findByIdAndDelete(id);
};

module.exports = {
    assignParkingSpace,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
};







