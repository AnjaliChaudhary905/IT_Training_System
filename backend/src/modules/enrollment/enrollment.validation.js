import { body, param } from "express-validator";


export const createEnrollmentValidation = [
    body("courseId")
        .trim()
        .notEmpty()
        .withMessage("Course ID is required")
        .isMongoId()
        .withMessage("Invalid course ID"),
];


export const enrollmentIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid enrollment ID"),
];


export const updateEnrollmentStatusValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid enrollment ID"),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn([
            "approved",
            "rejected",
            "cancelled",
            "completed",
        ])
        .withMessage("Invalid enrollment status"),
];