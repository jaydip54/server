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
        const vehicle = await VehicleServices.create(req.body);
        res.status(201).json({
            message: "vehicle created sucess",
            data: vehicle
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleServices.get();
        res.status(200).json({
            data: vehicles,
            message: "get sucess"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await VehicleServices.getById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json({
            data: vehicle,
            message: "get sucess"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        if (vehicleExists && vehicleExists._id !== id) {
            return res.status(400).json({ message: "Vehicle already exists" });
        }
        const vehicle = await VehicleServices.update(id, name);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json({
            message: "Vehicle updated successfully",
            data: vehicle,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };
