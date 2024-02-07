const asyncHandler = require("express-async-handler");

const Student = require("../model/studentsModel");
const StudentRecords = require("../model/violationModel");
const FieldsValidator = require("../helpers/FieldsValidator");
const ResponseBuilder = require("../helpers/ResponseBuilder");

const GetStudentsRecords = asyncHandler(async (request, response) => {
    const httpResponse = new ResponseBuilder(request, response);
    const fields = new FieldsValidator(request, response);

    /* To get a specific student */
    if (request.query.hasOwnProperty("id")) {
        const { id } = request.query;

        // Check if the fields in response are accepted
        if (!fields.areResponseKeysAccepted({ id })) {
            response.send(400, "fail", "The provided field name is invalid");
            return;
        }

        // Check if any required fields are empty
        if (!fields.areResponseValuesEmpty(request.query)) {
            response.send(400, "fail", "Some fields have empty values");
            return;
        }

        try {
            const student = await Student.findById(id);

            if (student) {
                const studentRecords = await StudentRecords.find({
                    student_id: student.student_id,
                });

                if (studentRecords) {
                    let studentData = {
                        ...student._doc,
                        violations: studentRecords,
                    };
                    delete studentData.password;

                    httpResponse.send(
                        200,
                        "success",
                        "Student records found",
                        studentData
                    );
                    return;
                }

                httpResponse.send(404, "fail", "Student records not found");
                return;
            } else {
                httpResponse.send(404, "fail", "Student not found");
                return;
            }
        } catch (error) {
            console.log(error);
            httpResponse.send(500, "error", "Internal server error");
        }
    } else {
        // To get all the students record data
        try {
            const students = await StudentRecords.aggregate([
                {
                    $lookup: {
                        from: "students",
                        localField: "student_id",
                        foreignField: "student_id",
                        as: "student",
                    },
                },
                {
                    $unwind: "$student",
                },
                {
                    $project: {
                        _id: 1,
                        student_id: "$student.student_id",
                        first_name: "$student.first_name",
                        last_name: "$student.last_name",
                        contact_number: "$student.contact_number",
                        middle_name: "$student.middle_name",
                        course_section: 1,
                        type_of_violation: 1,
                        remarks: 1,
                        staff_involved: 1,
                        severity_level: 1,
                        counseling_schedule: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ]);

            if (students) {
                httpResponse.send(200, "success", "Students Found", students);
                return;
            }

            httpResponse.send(404, "fail", "No students found");
        } catch (error) {
            console.log(error);
            httpResponse.send(500, "error", "Internal server error");
        }
    }
});

const AddNewStudentRecord = asyncHandler(async (request, response) => {
    const client_fields = request.body;
    const httpResponse = new ResponseBuilder(request, response);
    const fields = new FieldsValidator(request, response);

    // Check if the fields in response are accepted
    if (!fields.areResponseKeysAccepted({ ...client_fields })) {
        httpResponse.send(400, "fail", "The provided field name is invalid");
        return;
    }

    // Check if any required fields are empty
    if (!fields.areResponseValuesEmpty({ ...client_fields })) {
        httpResponse.send(400, "fail", "Some fields have empty values");
        return;
    }

    const {
        student_id,
        course_section,
        type_of_violation,
        remarks,
        staff_involved,
        severity_level,
        counseling_schedule,
    } = request.body;

    try {
        const student = await Student.findOne({ student_id });

        if (!student) {
            httpResponse.send(404, "fail", "Student not found");
            return;
        }

        const studentRecord = await StudentRecords.create({
            student_id,
            course_section,
            type_of_violation,
            remarks,
            staff_involved,
            severity_level,
            counseling_schedule,
        });

        if (studentRecord) {
            httpResponse.send(
                201,
                "success",
                "Student record created successfully",
                studentRecord
            );
        } else {
            httpResponse.send(400, "fail", "Student record creation failed");
        }
    } catch (error) {
        console.log(error);
        httpResponse.send(500, "error", "Internal server error");
    }
});

const DeleteStudentRecord = asyncHandler(async (request, response) => {
    const httpResponse = new ResponseBuilder(request, response);
    const fields = new FieldsValidator(request, response);

    if (!fields.areResponseKeysAccepted({ ...request.query })) {
        httpResponse.send(400, "fail", "The provided field name is invalid");
        return;
    }

    if (!fields.areResponseValuesEmpty({ ...request.query })) {
        httpResponse.send(400, "fail", "Some fields have empty values");
        return;
    }

    const { id } = request.query;

    try {
        const studentRecord = await StudentRecords.findById(id);

        if (!studentRecord) {
            httpResponse.send(404, "fail", "Student record not found");
            return;
        }

        const deletedStudentRecord = await StudentRecords.findByIdAndDelete(id);

        if (deletedStudentRecord) {
            httpResponse.send(
                200,
                "success",
                "Student record deleted successfully",
                deletedStudentRecord
            );
        } else {
            httpResponse.send(400, "fail", "Student record deletion failed");
        }
    } catch (error) {
        console.log(error);
        httpResponse.send(500, "error", "Internal server error");
    }
});

module.exports = {
    GetStudentsRecords,
    AddNewStudentRecord,
    DeleteStudentRecord,
};
