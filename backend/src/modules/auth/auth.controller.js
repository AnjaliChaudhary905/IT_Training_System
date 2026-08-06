import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/apiResponse.js";
import authService from "./auth.service.js";

const loginUser = asyncHandler(async (req, res) => {
    const data = await authService.loginUser(req.body);

    return successResponse(
        res,
        data,
        "Login successful"
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    await authService.logoutUser();

    return successResponse(
        res,
        null,
        "Logout successful"
    );
});

const getMe = asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user.id);

    return successResponse(
        res,
        user,
        "User profile fetched successfully"
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email);

    return successResponse(
        res,
        null,
        "Password reset email sent successfully"
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    await authService.resetPassword(
        req.params.token,
        req.body.password
    );

    return successResponse(
        res,
        null,
        "Password reset successfully"
    );
});

const authController = {
    loginUser,
    logoutUser,
    getMe,
    forgotPassword,
    resetPassword,
};

export default authController;