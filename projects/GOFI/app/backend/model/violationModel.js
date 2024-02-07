const mongoose = require("mongoose");

const StudentRecordsSchema = mongoose.Schema(
    {
        student_id: {
            type: String,
            required: [true, "Student ID field is required"],
        },
        course_section: {
            type: String,
            required: [true, "Course Section field is required"],
        },
        type_of_violation: {
            type: String,
            required: [true, "Violation field is required"],
        },
        remarks: {
            type: String,
            required: [true, "Remarks field is required"],
        },
        staff_involved: {
            type: String,
            required: [true, "Staff Involved field is required"],
        },
        severity_level: {
            type: String,
            required: [true, "Severity Level field is required"],
        },
        counseling_schedule: {
            type: String,
            required: [true, "Counseling field is required"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("studentRecords", StudentRecordsSchema);
