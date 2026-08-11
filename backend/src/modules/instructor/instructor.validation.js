import { body, param } from "express-validator";

export const updateInstructorValidation = [
    body("firstName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage(
            "First name must be between 2 and 50 characters"
        ),

    body("lastName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage(
            "Last name must be between 2 and 50 characters"
        ),

    body("phone")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Phone number cannot be empty"),

    body("avatar")
        .optional()
        .trim()
        .isURL()
        .withMessage("Avatar must be a valid URL"),
];

export const instructorIdValidation = [
    param("id")
        .notEmpty()
        .withMessage("Instructor ID is required")
        .isMongoId()
        .withMessage("Invalid instructor ID"),
];

export const updateInstructorByAdminValidation = [
    ...instructorIdValidation,

    body("firstName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage(
            "First name must be between 2 and 50 characters"
        ),

    body("lastName")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage(
            "Last name must be between 2 and 50 characters"
        ),

    body("phone")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Phone number cannot be empty"),

    body("avatar")
        .optional()
        .trim()
        .isURL()
        .withMessage("Avatar must be a valid URL"),
];
export const updateInstructorStatusValidation = [
    ...instructorIdValidation,

    body("isActive")
        .notEmpty()
        .withMessage("isActive is required")
        .isBoolean()
        .withMessage("isActive must be a boolean"),
];