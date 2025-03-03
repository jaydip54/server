const express = require("express");
const { businessPlaceController } = require("../controller");
const router = express.Router();

router.post(
    "/",
    businessPlaceController.validateBusinessPlace,
    businessPlaceController.registerPlace
);

router.get("/", businessPlaceController.getAllPlaces);

router.get("/:id", businessPlaceController.getPlaceById);

router.put(
    "/:id",
    businessPlaceController.validateBusinessPlace,
    businessPlaceController.updatePlace
);

router.delete("/:id", businessPlaceController.deletePlace);

module.exports = router;
