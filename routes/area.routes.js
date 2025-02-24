const express = require("express");
const { AreaController } = require("../controller");

const router = express.Router();

router.post("/", AreaController.createArea);
router.get("/", AreaController.getAreas);
router.get("/:id", AreaController.getAreaById);
router.put("/:id", AreaController.updateArea);
router.delete("/:id", AreaController.deleteArea);

module.exports = router;
