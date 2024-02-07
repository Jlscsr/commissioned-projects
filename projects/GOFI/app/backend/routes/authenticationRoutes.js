const express = require("express");
const router = express.Router();
const ValidateToken = require("../middleware/validateToken");
const {
    RegisterStudent,
    StudentLogin,
} = require("../controller/authenticationController");

router.post("/register", RegisterStudent);
router.post("/login", StudentLogin);

module.exports = router;
