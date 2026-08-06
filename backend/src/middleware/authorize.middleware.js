import { errorResponse } from "../utils/apiResponse.js";

const authorize = (...roles) => {
    return (req, res, next) => {

        // Check if user exists
        if (!req.user) {
            return errorResponse(
                res,
                "Authentication required",
                401
            );
        }

        // Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            return errorResponse(
                res,
                "You are not authorized to perform this action",
                403
            );
        }

        next();
    };
};

export default authorize;