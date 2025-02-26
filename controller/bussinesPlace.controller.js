const businessPlaceService = require("../services/businessPlaceService");

class BusinessPlaceController {
  async registerPlace(req, res) {
    try {
      const place = await businessPlaceService.registerPlace(req.body);
      res.status(201).json(place);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPlaces(req, res) {
    try {
      const places = await businessPlaceService.getAllPlaces();
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPlaceById(req, res) {
    try {
      const place = await businessPlaceService.getPlaceById(req.params.id);
      if (!place) return res.status(404).json({ message: "Business Place not found" });
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePlace(req, res) {
    try {
      const updatedPlace = await businessPlaceService.updatePlace(req.params.id, req.body);
      if (!updatedPlace) return res.status(404).json({ message: "Business Place not found" });
      res.status(200).json(updatedPlace);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePlace(req, res) {
    try {
      const deletedPlace = await businessPlaceService.deletePlace(req.params.id);
      if (!deletedPlace) return res.status(404).json({ message: "Business Place not found" });
      res.status(200).json({ message: "Business Place deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BusinessPlaceController();
