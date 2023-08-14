const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authMiddleware");
const { login } = require("../controllers/loginController");

router.post("/login", authenticate, login);

module.exports = router;
