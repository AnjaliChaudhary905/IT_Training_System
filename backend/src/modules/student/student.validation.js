import { body, param } from "express-validator";


export const studentIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid student ID"),
];


export const updateStudentValidation = [
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
        .withMessage("Phone cannot be empty"),

    body("avatar")
        .optional()
        .trim(),
];


export const updateStudentByAdminValidation = [
    ...updateStudentValidation,
];


export const updateStudentStatusValidation = [
    body("isActive")
    .exists()
    .withMessage("isActive is required")
    .custom((value) => {
        if (typeof value !== "boolean") {
            throw new Error("isActive must be a boolean");
        }

        return true;
    }),
];