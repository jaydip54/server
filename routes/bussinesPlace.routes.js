const express = require("express");
const router = express.Router();
const businessPlaceController = require("../controllers/businessPlaceController");

router.post("/", businessPlaceController.registerPlace);
router.get("/", businessPlaceController.getAllPlaces);
router.get("/:id", businessPlaceController.getPlaceById);
router.put("/:id", businessPlaceController.updatePlace);
router.delete("/:id", businessPlaceController.deletePlace);

module.exports = router;
