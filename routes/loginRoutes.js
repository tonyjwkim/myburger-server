const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { login, getUserData } = require("../controllers/loginController");

router.post("/login", authenticate, login);
router.get("/userData", getUserData);

module.exports = router;
