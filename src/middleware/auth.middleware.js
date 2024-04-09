const tokenService = require("../services/token.service");
const ApiError = require("../exceptions/api.error");

class Auth {
    isAuthenticate(req, res, next) {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                return next(ApiError.UnauthorizedError());
            }

            const userData = tokenService.validateAccessToken(accessToken);

            if (!userData) {
                return next(ApiError.UnauthorizedError());
            }

            req.user = userData;
            next();
        } catch (error) {
            return next(ApiError.UnauthorizedError());
        }
    }
}

module.exports = new Auth();
