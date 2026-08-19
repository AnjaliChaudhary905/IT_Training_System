import { body, param } from "express-validator";

export const createAttendanceValidation = [
    body("studentId")
        .trim()
        .notEmpty()
        .withMessage("Student ID is required")
        .isMongoId()
        .withMessage("Invalid student ID"),

    body("courseId")
        .trim()
        .notEmpty()
        .withMessage("Course ID is required")
        .isMongoId()
        .withMessage("Invalid course ID"),

    body("enrollmentId")
        .trim()
        .notEmpty()
        .withMessage("Enrollment ID is required")
        .isMongoId()
        .withMessage("Invalid enrollment ID"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Invalid attendance date"),

    body("status")
        .optional()
        .isIn([
            "present",
            "absent",
            "late",
        ])
        .withMessage("Invalid attendance status"),

    body("remarks")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Remarks cannot exceed 500 characters"),
];


export const attendanceIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid attendance ID"),
];


export const updateAttendanceValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid attendance ID"),

    body("status")
        .optional()
        .isIn([
            "present",
            "absent",
            "late",
        ])
        .withMessage("Invalid attendance status"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Invalid attendance date"),

    body("remarks")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Remarks cannot exceed 500 characters"),
];