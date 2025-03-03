const express = require("express");
const { VehicleController } = require("../controller");

const router = express.Router();

router.post("/", VehicleController.createVehicle);
router.get("/", VehicleController.getVehicles);
router.get("/:id", VehicleController.getVehicleById);
router.put("/:id", VehicleController.updateVehicle);
router.delete("/:id", VehicleController.deleteVehicle);

module.exports = router;
