const { CitySchema } = require("../model");



const createCity = (data) => {
    return CitySchema.create(data);
};

const findOne = (cityName) => {
    // console.log("🚀 ~ findOne ~ cityName:", cityName)
    return CitySchema.findOne({ name: cityName });
};

const updateCity = (id, data) => {
    return CitySchema.findByIdAndUpdate(id, data, { new: true });
};

const getCities = async () => {
    return await CitySchema.find();
};

const getCityById = async (id) => {
    return await CitySchema.findById(id);
};

const deleteCity = async (id) => {
    return await CitySchema.findByIdAndDelete(id);
};

module.exports = { createCity, getCities, getCityById, deleteCity, findOne, updateCity };
