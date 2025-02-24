const { VehicleServices } = require("../services");

const createVehicle = async (req, res) => {
    try {
        const name = req.body.name;
        if (!name) {
            return res.status(400).json({ error: "Vehicle name is required" });
        }
        const vehicleExists = await VehicleServices.findOne(name);
        console.log("🚀 ~ createVehicle ~ vehicleExists:", vehicleExists);
        if (vehicleExists) {
            return res.status(400).json({ error: "Vehicle already exists" });
        }
        const vehicle = await VehicleServices.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleServices.getVehicles();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await VehicleServices.getVehicleById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const name = req.body.name;
        console.log("🚀 ~ updateVehicle ~ name:", name);
        const id = req.params.id;
        console.log("🚀 ~ updateVehicle ~ id:", id);
        if (!name) {
            return res.status(400).json({ error: "Vehicle name is required" });
        }
        const vehicleExists = await VehicleServices.findOne(name);
        if (vehicleExists) {
            return res.status(400).json({ error: "Vehicle already exists" });
        }
        const vehicle = await VehicleServices.updateVehicle(id, name);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.status(200).json({
            message: "Vehicle updated successfully",
            updatedVehicle: vehicle,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleServices.deleteVehicle(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }
        res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };
