class TokenManager {
    constructor() {
        this.secretKey = process.env.ACCESS_TOKEN_SECRET;
        this.jwt = require("jsonwebtoken");
    }

    generate(data, expiresIn = "") {
        if (typeof data === "object") {
            const exp = expiresIn || "1hr";

            const token = this.jwt.sign({ data }, this.secretKey, {
                expiresIn: exp,
            });

            if (token) {
                return token;
            }

            return false;
        }
    }

    verify(token) {
        let response = null;

        if (token) {
            try {
                const decoded = this.jwt.verify(token, this.secretKey);

                if (decoded) {
                    response = {
                        status: "success",
                        data: decoded.data,
                    };
                }

                return response;
            } catch (error) {
                response = {
                    status: "fail",
                    message: "User is not authorized",
                };
            }

            return;
        }

        response = {
            status: "fail",
            message: "Missing Token",
        };

        return response;
    }
}

module.exports = TokenManager;
