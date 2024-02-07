const express = require("express");
const router = express.Router();
const ValidateToken = require("../middleware/validateToken");

const {
    GetStudentsRecords,
    AddNewStudentRecord,
    DeleteStudentRecord,
} = require("../controller/studentController.js");

router.use(ValidateToken);
router.delete("/remove", DeleteStudentRecord);
router.get("/:id?", GetStudentsRecords);
router.get("/", GetStudentsRecords);
router.post("/add", AddNewStudentRecord);

module.exports = router;
