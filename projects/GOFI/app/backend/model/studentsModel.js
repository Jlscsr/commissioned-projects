const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
    {
        student_id: {
            type: String,
            required: [true, "Student ID field is required"],
            unique: [true, "Student ID already registered"],
        },
        first_name: {
            type: String,
            required: [true, "First name field is required"],
            unique: [true, "First name already registered"],
        },
        password: {
            type: String,
            required: [true, "Password field is required"],
        },
        email: {
            type: String,
            required: [true, "Email field is required"],
            unique: [true, "Email already registered"],
        },
        last_name: {
            type: String,
            required: [true, "Last name field is required"],
            unique: [true, "Last name already registered"],
        },
        middle_name: {
            type: String,
            required: [true, "Middle name Field is required"],
        },
        contact_number: {
            type: String,
            required: [true, "Contact number field is required"],
            unique: [true, "Contact number already registered"],
        },
        role: {
            type: String,
            required: [true, "Role field is required"],
            default: "student",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("student", StudentSchema);
