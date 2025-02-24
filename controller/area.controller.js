const { default: mongoose } = require("mongoose");
const { areaService, CityServices } = require("../services");

const createArea = async (req, res) => {
    try {
        const { name, city, pincode } = req.body;

        if (!name) return res.status(400).json({ error: "Area name is required" });
        if (!city) return res.status(400).json({ error: "City is required" });
        if (!pincode) return res.status(400).json({ error: "Pincode is required" });
        if (pincode.length !== 6) {
            return res.status(400).json({ error: "Pincode should be 6 digits" });
        }
        if (!/^[0-9]+$/.test(pincode)) {
            return res.status(400).json({ error: "Pincode should only contain digits" });
        }
        if (!/^[a-zA-Z ]+$/.test(name)) {
            return res.status(400).json({ error: "Area name should only contain alphabets and spaces" });
        }
        if (!mongoose.Types.ObjectId.isValid(city)) {
            return res.status(400).json({ error: "Invalid City ID" });
        }

        const cityExist = await CityServices.getCityById(city);
        if (!cityExist) {
            return res.status(400).json({ error: "City not found" });
        }

        const existArea = await areaService.findOne(pincode);
        if (existArea) {
            return res.status(400).json({ error: "Area with this pincode already exists" });
        }

        const area = await areaService.createArea({
            name,
            ctid: city,
            pincode,
        });

        res.status(201).json({
            message: "Area created successfully",
            area,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAreas = async (req, res) => {
    try {
        const areas = await areaService.getAreas();
        if (!areas) {
            return res.status(404).json({ error: "No areas found" });
        }
        res.status(200).json({
            message: "Areas retrieved successfully",
            areas,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAreaById = async (req, res) => {
    try {
        const areas = await areaService.getAreaById(req.params.id);
        if (!areas) {
            return res.status(404).json({ error: "No areas found" });
        }
        res.status(200).json({
            message: "Areas retrieved successfully",
            areas,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateArea = async (req, res) => {
    try {
        const { name, city, pincode } = req.body;

        if (!name) return res.status(400).json({ error: "Area name is required" });
        if (!city) return res.status(400).json({ error: "City is required" });
        if (!pincode) return res.status(400).json({ error: "Pincode is required" });
        if (pincode.length !== 6) {
            return res.status(400).json({ error: "Pincode should be 6 digits" });
        }
        if (!/^[0-9]+$/.test(pincode)) {
            return res.status(400).json({ error: "Pincode should only contain digits" });
        }
        if (!/^[a-zA-Z ]+$/.test(name)) {
            return res.status(400).json({ error: "Area name should only contain alphabets and spaces" });
        }
        if (!mongoose.Types.ObjectId.isValid(city)) {
            return res.status(400).json({ error: "Invalid City ID" });
        }

        const cityExist = await CityServices.getCityById(city);
        if (!cityExist) {
            return res.status(400).json({ error: "City not found" });
        }
        const existArea = await areaService.findOne(pincode);
        if (existArea && existArea.id !== req.params.id) {
            return res.status(400).json({ error: "Area with this pincode already exists" });
        }

        const area = await areaService.updateArea(req.params.id, req.body);
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }

        res.json({ message: "Area updated successfully", area });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteArea = async (req, res) => {
    try {
        const area = await areaService.deleteArea(req.params.id);
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }

        res.json({ message: "Area deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createArea, getAreas, getAreaById, updateArea, deleteArea };
