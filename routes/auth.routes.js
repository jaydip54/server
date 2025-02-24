const express = require("express");
const { isLogin, isRestrict } = require("../middleware/auth");
const { AuthController } = require("../controller");

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/profile", isLogin, isRestrict([0, 1, 2, 3]), AuthController.getProfile);
router.post("/reset-password", isLogin, AuthController.resetPassword);

module.exports = router;
