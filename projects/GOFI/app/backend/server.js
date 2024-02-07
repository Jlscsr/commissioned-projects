require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./config/database");

const app = express();
const PORT = 3000;

const serverStart = async () => {
    try {
        const response = await connectDB();

        if (response.status === "success") {
            app.use(
                cors({
                    origin: "http://127.0.0.1:5500",
                    credentials: true,
                })
            );

            app.use(bodyParser.json());

            app.use("/api/user", require("./routes/authenticationRoutes"));
            app.use("/api/student/record", require("./routes/studentRoutes"));

            app.listen(PORT, () => {
                console.log(response.message);
                console.log(`Server running on port ${PORT}`);
            });
        }
    } catch (error) {
        console.log(`Internal server error ${error}`, error);
    }
};

serverStart();
