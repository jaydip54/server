const { UserSchema } = require("../model");


const createUser = async (userData) => {
    return await UserSchema.create(userData);
};

const getUsers = async () => {
    return await UserSchema.find().populate("ctid areaid", "name");
};

const getUserById = async (id) => {
    return await UserSchema.findById(id).populate("ctid areaid", "name");
};

const updateUser = async (id, userData) => {
    return await UserSchema.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

const deleteUser = async (id) => {
    return await UserSchema.findByIdAndDelete(id);
};

const findOne = async (email) => {
    return await UserSchema.findOne({ emailed: email });
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, findOne };
