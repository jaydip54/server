














const express = require("express");
const { capacityController } = require("../controller");
const router = express.Router();

router.post("/", capacityController.createCapacity);
router.get("/", capacityController.getAllCapacities);
router.get("/:id", capacityController.getCapacityById);
router.put("/:id", capacityController.updateCapacity);
router.delete("/:id", capacityController.deleteCapacity);

module.exports = router;
