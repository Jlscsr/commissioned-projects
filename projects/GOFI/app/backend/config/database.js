const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        // Cnnect to the database
        const connect = await mongoose.connect(
            process.env.DB_CONNECTION_STRING
        );

        // Build a Response Object
        const response = {
            status: "success",
            message: `Successfully connected to the database`,
        };

        return response;
    } catch (error) {
        console.log(`Error Connecting to the database`, error);
        process.exit(1);
    }
};

module.exports = ConnectDB;
