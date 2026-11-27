
import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import enrollmentController from "./enrollment.controller.js";

import {
    createEnrollmentValidation,
    enrollmentIdValidation,
    studentEnrollmentValidation,
    courseEnrollmentValidation,
    updateEnrollmentStatusValidation,
} from "./enrollment.validation.js";

const router = express.Router();

// Student creates an enrollment
router.post(
    "/",
    protect,
    authorize("student"),
    createEnrollmentValidation,
    validate,
    enrollmentController.createEnrollment
);

// Student views their own enrollments
router.get(
    "/me",
    protect,
    authorize("student"),
    enrollmentController.getMyEnrollments
);

// Admin views all enrollments
router.get(
    "/",
    protect,
    authorize("admin"),
    enrollmentController.getAllEnrollments
);

// Admin views enrollments of a particular student
router.get(
    "/student/:studentId",
    protect,
    authorize("admin"),
    studentEnrollmentValidation,
    validate,
    enrollmentController.getEnrollmentsByStudent
);

// Admin and instructor view enrollments for a course
router.get(
    "/course/:courseId",
    protect,
    authorize("admin", "instructor"),
    courseEnrollmentValidation,
    validate,
    enrollmentController.getEnrollmentsByCourse
);

// Student and admin view an enrollment by ID
router.get(
    "/:id",
    protect,
    authorize("student", "admin"),
    enrollmentIdValidation,
    validate,
    enrollmentController.getEnrollmentById
);

// Admin and instructor update enrollment status
router.patch(
    "/:id/status",
    protect,
    authorize("admin", "instructor"),
    updateEnrollmentStatusValidation,
    validate,
    enrollmentController.updateEnrollmentStatus
);

// Student cancels their own enrollment
router.patch(
    "/:id/cancel",
    protect,
    authorize("student"),
    enrollmentIdValidation,
    validate,
    enrollmentController.cancelEnrollment
);

export default router;
