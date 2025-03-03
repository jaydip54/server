


const express = require("express");
const { parkingAssignmentController } = require("../controller");
const router = express.Router();

router.post("/", parkingAssignmentController.assignParkingSpace);
router.get("/", parkingAssignmentController.getAllAssignments);
router.get("/:id", parkingAssignmentController.getAssignmentById);
router.put("/:id", parkingAssignmentController.updateAssignment);
router.delete("/:id", parkingAssignmentController.deleteAssignment);

module.exports = router;


















