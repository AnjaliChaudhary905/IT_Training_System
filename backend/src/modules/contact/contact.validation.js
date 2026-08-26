import { body } from "express-validator";
export const createContactValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("phone")
        .optional()
        .trim()
        .isLength({ min: 7, max: 15 })
        .withMessage("Please provide a valid phone number"),

    body("subject")
        .trim()
        .notEmpty()
        .withMessage("Subject is required"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10 })
        .withMessage("Message must be at least 10 characters long"),
];

export const updateContactStatusValidation = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["NEW", "READ", "REPLIED"])
        .withMessage("Invalid contact status"),
];