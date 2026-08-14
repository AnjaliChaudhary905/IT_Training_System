import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import enrollmentController from "./enrollment.controller.js";

import {
    createEnrollmentValidation,
    enrollmentIdValidation,
    updateEnrollmentStatusValidation,
} from "./enrollment.validation.js";


const router = express.Router();

router.post(
    "/",
    protect,
    authorize("student"),
    createEnrollmentValidation,
    validate,
    enrollmentController.createEnrollment
);

router.get(
    "/me",
    protect,
    authorize("student"),
    enrollmentController.getMyEnrollments
);

router.get(
    "/",
    protect,
    authorize("admin"),
    enrollmentController.getAllEnrollments
);

router.get(
    "/:id",
    protect,
    authorize("student", "admin"),
    enrollmentIdValidation,
    validate,
    enrollmentController.getEnrollmentById
);

router.patch(
    "/:id/status",
    protect,
    authorize("admin"),
    updateEnrollmentStatusValidation,
    validate,
    enrollmentController.updateEnrollmentStatus
);

router.patch(
    "/:id/cancel",
    protect,
    authorize("student"),
    enrollmentIdValidation,
    validate,
    enrollmentController.cancelEnrollment
);


export default router;