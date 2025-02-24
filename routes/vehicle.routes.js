const express = require("express");
const { CityController } = require("../controller");

const router = express.Router();

router.post("/", VehicleController.createCity);
router.get("/", VehicleController.getCities);
router.get("/:id", VehicleController.getCityById);
router.put("/:id", VehicleController.updateCity);
router.delete("/:id", VehicleController.deleteCity);

module.exports = router;
