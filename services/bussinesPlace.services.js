const { BusinessPlace } = require("../model");

const registerPlace = async (placeData) => {
  return await BusinessPlace.create(placeData);
};

const getAllPlaces = async () => {
  return await BusinessPlace.find().populate([
    "user",
    "city",
    "areaId",
    "categoryId",
    "packageId",
  ]);
};

const getPlaceById = async (placeId) => {
  return await BusinessPlace.findById(placeId).populate([
    "user",
    "city",
    "areaId",
    "categoryId",
    "packageId",
  ]);
};

const updatePlace = async (placeId, placeData) => {
  return await BusinessPlace.findByIdAndUpdate(placeId, placeData, { new: true }).populate([
    "user",
    "city",
    "areaId",
    "categoryId",
    "packageId",
  ]);
};

const deletePlace = async (placeId) => {
  return await BusinessPlace.findByIdAndDelete(placeId);
};

module.exports = {
  registerPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
