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

    body("specialization")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage(
            "Specialization cannot exceed 100 characters"
        ),

    body("experience")
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            "Experience must be a non-negative number"
        ),

    body("qualification")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage(
            "Qualification cannot exceed 150 characters"
        ),

    body("bio")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Bio cannot exceed 1000 characters"
        ),

    body("expertise")
        .optional()
        .custom((value) => {
            let expertise;

            try {
                expertise =
                    typeof value === "string"
                        ? JSON.parse(value)
                        : value;
            } catch (error) {
                throw new Error(
                    "Expertise must be a valid JSON array"
                );
            }

            if (!Array.isArray(expertise)) {
                throw new Error(
                    "Expertise must be an array"
                );
            }

            if (
                expertise.some(
                    (item) =>
                        typeof item !== "string" ||
                        !item.trim()
                )
            ) {
                throw new Error(
                    "Expertise items cannot be empty"
                );
            }

            return true;
        }),
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

    body("specialization")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage(
            "Specialization cannot exceed 100 characters"
        ),

    body("experience")
        .optional()
        .isInt({ min: 0 })
        .withMessage(
            "Experience must be a non-negative number"
        ),

    body("qualification")
        .optional()
        .trim()
        .isLength({ max: 150 })
        .withMessage(
            "Qualification cannot exceed 150 characters"
        ),

    body("bio")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage(
            "Bio cannot exceed 1000 characters"
        ),

    body("expertise")
        .optional()
        .custom((value) => {
            let expertise;

            try {
                expertise =
                    typeof value === "string"
                        ? JSON.parse(value)
                        : value;
            } catch (error) {
                throw new Error(
                    "Expertise must be a valid JSON array"
                );
            }

            if (!Array.isArray(expertise)) {
                throw new Error(
                    "Expertise must be an array"
                );
            }

            if (
                expertise.some(
                    (item) =>
                        typeof item !== "string" ||
                        !item.trim()
                )
            ) {
                throw new Error(
                    "Expertise items cannot be empty"
                );
            }

            return true;
        }),
];
export const updateInstructorStatusValidation = [
    ...instructorIdValidation,

    body("isActive")
        .notEmpty()
        .withMessage("isActive is required")
        .isBoolean()
        .withMessage("isActive must be a boolean"),
];