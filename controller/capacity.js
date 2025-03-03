const { capacityService } = require("../services");


// Create a new capacity entry
const createCapacity = async (req, res) => {
    try {
        const capacity = await capacityService.createCapacity(req.body);
        res.status(201).json({ data: capacity, message: "sucess" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all capacity records
const getAllCapacities = async (req, res) => {
    try {
        const capacities = await capacityService.getAllCapacities();
        res.status(200).json(
            { data: capacities, message: 'success' }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific capacity record by ID
const getCapacityById = async (req, res) => {
    try {
        const capacity = await capacityService.getCapacityById(req.params.id);
        if (!capacity) return res.status(404).json({ message: "Capacity record not found" });
        res.status(200).json(
            { data: capacity, message: 'success' }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a capacity record
const updateCapacity = async (req, res) => {
    try {
        const updatedCapacity = await capacityService.updateCapacity(req.params.id, req.body);
        if (!updatedCapacity) return res.status(404).json({ message: "Capacity record not found" });
        res.status(200).json({ data: updatedCapacity, message: 'success' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a capacity record
const deleteCapacity = async (req, res) => {
    try {
        const deletedCapacity = await capacityService.deleteCapacity(req.params.id);
        if (!deletedCapacity) return res.status(404).json({ message: "Capacity record not found" });
        res.status(200).json({ message: "Capacity record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCapacity,
    getAllCapacities,
    getCapacityById,
    updateCapacity,
    deleteCapacity,
};
