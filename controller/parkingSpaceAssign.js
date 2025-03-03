const { parkingAssignmentService } = require("../services");





// Assign a parking space to a business place
const assignParkingSpace = async (req, res) => {
    try {
        const assignment = await parkingAssignmentService.assignParkingSpace(req.body);
        res.status(201).json({ data: assignment, message: 'success' });
    } catch (error) {
        res.status(400).json({ meassage: error.message });
    }
};

// Get all assigned parking spaces
const getAllAssignments = async (req, res) => {
    try {
        const assignments = await parkingAssignmentService.getAllAssignments();
        res.status(200).json({ data: assignments, message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific assignment by ID
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await parkingAssignmentService.getAssignmentById(req.params.id);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });
        res.status(200).json({ data: assignment, message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a parking space assignment
const updateAssignment = async (req, res) => {
    try {
        const updatedAssignment = await parkingAssignmentService.updateAssignment(req.params.id, req.body);
        if (!updatedAssignment) return res.status(404).json({ message: "Assignment not found" });
        res.status(200).json({ data: updatedAssignment, message: "success" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a parking space assignment
const deleteAssignment = async (req, res) => {
    try {
        const deletedAssignment = await parkingAssignmentService.deleteAssignment(req.params.id);
        if (!deletedAssignment) return res.status(404).json({ message: "Assignment not found" });
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    assignParkingSpace,
    getAllAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
};


