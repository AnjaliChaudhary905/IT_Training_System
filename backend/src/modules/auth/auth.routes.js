import { Router } from "express";

import authController from "./auth.controller.js";

import protect from "../../middleware/auth.middleware.js";

import {
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
} from "./auth.validation.js";

import validate from "../../middleware/validate.middleware.js";

const router = Router();

router.post(
    "/login",
    loginValidation,
    validate,
    authController.loginUser
);

router.post(
    "/logout",
    protect,
    authController.logoutUser
);

router.get(
    "/me",
    protect,
    authController.getMe
);

router.post(
    "/forgot-password",
    forgotPasswordValidation,
    validate,
    authController.forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPasswordValidation,
    validate,
    authController.resetPassword
);

export default router;