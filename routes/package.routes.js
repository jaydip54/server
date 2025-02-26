const express = require("express");
const { packageController } = require("../controller");
const router = express.Router();

router.post("/", packageController.createPackage);
router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;
