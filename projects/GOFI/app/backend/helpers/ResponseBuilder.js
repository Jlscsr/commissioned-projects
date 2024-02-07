class ResponseBuilder {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    build(status = "success", message, data) {
        const response = {};
        const responseData = data;
        if (data.length === 0) {
            response.status = status;
            response.message = message;
        }

        response.status = status;
        response.message = message;
        response.data = responseData;

        return response;
    }

    send(statusCode = 200, status = "success", message, data = []) {
        const response = this.build(status, message, data);
        this.res.status(statusCode).json(response);
    }
}

module.exports = ResponseBuilder;
