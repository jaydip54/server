const { CityServices } = require("../services");



const createCity = async (req, res) => {
    try {
        const name = req.body.name;
        if (!name) {
            return res.status(400).json({ error: "City name is required" });
        }
        const cityExists = await CityServices.findOne(name)
        console.log("🚀 ~ createCity ~ cityExists:", cityExists)
        if (cityExists) {
            return res.status(400).json({ error: "City already exists" });
        }
        const city = await CityServices.createCity(req.body);
        res.status(201).json(city);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCities = async (req, res) => {
    try {
        const cities = await CityServices.getCities();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const city = await CityServices.getCityById(req.params.id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        res.json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const name = req.body.name;
        console.log("🚀 ~ updateCity ~ name:", name)
        const id = req.params.id;
        console.log("🚀 ~ updateCity ~ id:", id)
        if (!name) {
            return res.status(400).json({ error: "City name is required" });
        }
        const cityExists = await CityServices.findOne(name)
        // console.log("🚀 ~ createCity ~ cityExists:", cityExists)
        if (cityExists) {
            return res.status(400).json({ error: "City already exists" });
        }
        const city = await CityServices.updateCity(id, name);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        res.status(200).json({
            message: "City updated successfully",
            updatedCity: city,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const city = await CityServices.deleteCity(req.params.id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        res.json({ message: "City deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCity, getCities, getCityById, updateCity, deleteCity };
