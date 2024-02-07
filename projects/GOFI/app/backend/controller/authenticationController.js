const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const Student = require("../model/studentsModel");
const FieldsValidator = require("../helpers/FieldsValidator");
const ResponseBuilder = require("../helpers/ResponseBuilder");
const TokenManager = require("../helpers/TokenManager");

const RegisterStudent = asyncHandler(async (request, response) => {
    const client_fields = request.body;
    const fields = new FieldsValidator(request, response);
    const httpResponse = new ResponseBuilder(request, response);

    if (!fields.areKeysInRequest({ ...client_fields })) {
        httpResponse.send(
            400,
            "fail",
            "Required fields are missing in the request"
        );
        return;
    }

    // Check if the fields in response are accepted
    if (!fields.areResponseKeysAccepted(client_fields)) {
        httpResponse.send(400, "fail", "The provided field name is invalid");
        return;
    }

    if (!fields.areResponseValuesEmpty(client_fields)) {
        httpResponse.send(400, "fail", "Some fields have empty values");
        return;
    }

    // Check if harmful chars are in the fields
    if (fields.hasHarmfulChars(client_fields)) {
        httpResponse.send(400, "fail", "Some fields has invalid characters");
        return;
    }

    const studentAlreadyRegistered = await Student.findOne({
        $or: [
            { student_id: client_fields.student_id },
            { email: client_fields.email },
        ],
    });

    if (studentAlreadyRegistered) {
        httpResponse.send(400, "fail", "Student already registered");
        return;
    }

    try {
        const { password } = client_fields;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await Student.create({
            ...client_fields,
            password: hashedPassword,
        });

        if (!newStudent) {
            httpResponse.send(400, "fail", "Failed to register user");
            return;
        }

        httpResponse.send(201, "success", "User successfully registered!");
    } catch (error) {
        console.log(error);
        httpResponse.send(500, "error", "Internal Server Error");
    }
});

const StudentLogin = asyncHandler(async (request, response) => {
    const client_fields = request.body;
    const fields = new FieldsValidator(request, response);
    const httpRespone = new ResponseBuilder(request, response);
    const token = new TokenManager();

    if (!fields.areKeysInRequest({ ...client_fields })) {
        httpRespone.send(
            400,
            "fail",
            "Required fields are missing in the request"
        );
        return;
    }

    if (!fields.areResponseKeysAccepted(client_fields)) {
        httpRespone.send(400, "fail", "The provided field name is invalid");
        return;
    }

    if (!fields.areResponseValuesEmpty(client_fields)) {
        httpRespone.send(400, "fail", "Some fields have empty values");
        return;
    }

    if (fields.hasHarmfulChars(client_fields)) {
        httpRespone.send(400, "fail", "Some fields has invalid characters");
        return;
    }

    try {
        const { email, password } = client_fields;

        const student = await Student.findOne({ email: email });

        if (student) {
            const isPasswordMatched = await bcrypt.compare(
                password,
                student.password
            );

            if (isPasswordMatched) {
                const userData = { ...student._doc };
                delete userData.password;

                const expirationDate = Math.floor(Date.now() / 1000) + 60 * 60;
                const accessToken = token.generate(userData, expirationDate);

                if (accessToken) {
                    httpRespone.send(200, "success", "Login successful", {
                        userData,
                        token: accessToken,
                    });
                    return;
                }

                // If token generation is not success
                httpRespone.send(500, "fail", "Failed to generate token");
                return;
            } else {
                // If password is not match
                httpRespone.send(401, "fail", "Password is not Matched");
                return;
            }
        } else {
            // If the user is not found
            httpRespone.send(401, "fail", "Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
        httpRespone.send(500, "error", "Internal Server Error");
    }
});

module.exports = { RegisterStudent, StudentLogin };
