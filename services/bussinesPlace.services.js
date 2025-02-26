const BusinessPlace = require("../models/BusinessPlace");

class BusinessPlaceService {
  async registerPlace(placeData) {
    return await BusinessPlace.create(placeData);
  }

  async getAllPlaces() {
    return await BusinessPlace.find()
      .populate(["user", "city", "areaId", "categoryId", "packageId"]);
  }

  async getPlaceById(placeId) {
    return await BusinessPlace.findById(placeId)
      .populate(["user", "city", "areaId", "categoryId", "packageId"]);
  }

  async updatePlace(placeId, placeData) {
    return await BusinessPlace.findByIdAndUpdate(placeId, placeData, { new: true });
  }

  async deletePlace(placeId) {
    return await BusinessPlace.findByIdAndDelete(placeId);
  }
}

module.exports = new BusinessPlaceService();
