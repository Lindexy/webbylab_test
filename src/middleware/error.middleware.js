const ApiError = require("../exceptions/api.error");

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message, // errors: err.errors
        });
    }
    return res.status(500).json({
        status: 0,
        error: {
            fields: {},
            code: "SERVER_ERROR",
        },
    });
};
