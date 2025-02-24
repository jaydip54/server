const { AreaSchema } = require("../model");


const createArea = async (data) => {
    return await AreaSchema.create(data);
};

const getAreas = async () => {
    return await AreaSchema.find().populate("ctid", "name");
};

const getAreaById = async (id) => {
    return await AreaSchema.findById(id).populate("ctid", "name");
};

const updateArea = async (id, data) => {
    return await AreaSchema.findByIdAndUpdate(id, data, { new: true }).populate("ctid", "name");
};

const deleteArea = async (id) => {
    return await AreaSchema.findByIdAndDelete(id);
};

const findOne = async (pincode) => {
    console.log("🚀 ~ findOne ~ pincode:", pincode)
    return await AreaSchema.findOne({ pincode: pincode });
}

module.exports = { createArea, getAreas, getAreaById, updateArea, deleteArea, findOne };
