const { VehicleSchema } = require("../model");



const create = (data) => {
    return VehicleSchema.create(data);
};

const findOne = (cityName) => {
    // console.log("🚀 ~ findOne ~ cityName:", cityName)
    return VehicleSchema.findOne({ name: cityName });
};

const update = (id, data) => {
    return VehicleSchema.findByIdAndUpdate(id, data, { new: true });
};

const get = async () => {
    return await VehicleSchema.find();
};

const getById = async (id) => {
    return await VehicleSchema.findById(id);
};

const deleteVehicle = async (id) => {
    return await VehicleSchema.findByIdAndDelete(id);
};

module.exports = {
    create,
    findOne,
    update,
    deleteVehicle,
    getById,
    get
}
