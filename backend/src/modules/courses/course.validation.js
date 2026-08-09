import { body } from "express-validator";

export const createCourseValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Course title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Course title must be between 3 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Course description is required")
        .isLength({ min: 10 })
        .withMessage("Course description must be at least 10 characters long"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Course category is required"),

    body("level")
        .optional()
        .isIn(["Beginner", "Intermediate", "Advanced"])
        .withMessage("Invalid course level"),

    body("duration")
        .trim()
        .notEmpty()
        .withMessage("Course duration is required"),

    body("fee")
        .notEmpty()
        .withMessage("Course fee is required")
        .isFloat({ min: 0 })
        .withMessage("Course fee must be a positive number"),

    body("syllabus")
        .isArray({ min: 1 })
        .withMessage("Syllabus must contain at least one topic"),

    body("syllabus.*")
        .trim()
        .notEmpty()
        .withMessage("Syllabus topic cannot be empty"),

    body("prerequisites")
        .optional()
        .isArray()
        .withMessage("Prerequisites must be an array"),

    body("prerequisites.*")
        .trim()
        .notEmpty()
        .withMessage("Prerequisite cannot be empty"),

    body("enrollmentDeadline")
        .notEmpty()
        .withMessage("Enrollment deadline is required")
        .isISO8601()
        .withMessage("Enrollment deadline must be a valid date"),

];

export const updateCourseValidation = [
    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Course title must be between 3 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage("Course description must be at least 10 characters long"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Course category cannot be empty"),

    body("level")
        .optional()
        .isIn(["Beginner", "Intermediate", "Advanced"])
        .withMessage("Invalid course level"),

    body("duration")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Course duration cannot be empty"),

    body("fee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Course fee must be a positive number"),

    body("syllabus")
        .optional()
        .isArray()
        .withMessage("Syllabus must be an array"),

    body("syllabus.*")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Syllabus topic cannot be empty"),

    body("prerequisites")
        .optional()
        .isArray()
        .withMessage("Prerequisites must be an array"),

    body("prerequisites.*")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Prerequisite cannot be empty"),

    body("enrollmentDeadline")
        .optional()
        .isISO8601()
        .withMessage("Enrollment deadline must be a valid date"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean"),
];