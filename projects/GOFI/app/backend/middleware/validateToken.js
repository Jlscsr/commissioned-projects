const asyncHandler = require("express-async-handler");

const ResponseBuilder = require("../helpers/ResponseBuilder");
const TokenManager = require("../helpers/TokenManager");

const validateToken = asyncHandler(async (req, res, next) => {
    const response = new ResponseBuilder(req, res);
    const token = new TokenManager();
    let receivedToken = null;

    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        receivedToken = authHeader.split(" ")[1];

        let tokenVerification = token.verify(receivedToken);

        // Checks if the token verification is fail
        if (tokenVerification.status === "fail") {
            response.send(
                401,
                tokenVerification.status,
                tokenVerification.message
            );
            return;
        }

        // If verification of token is success proceed to protected route
        req.user = tokenVerification.data;
        next();
        return;
    }

    // If token is not found
    response.send(401, "fail", "Missing Token, Invalid, or Expired");
});

module.exports = validateToken;
