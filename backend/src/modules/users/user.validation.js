import { body } from "express-validator";
import { ROLES } from "../../constants/roles.js";


export const createUserValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("first name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("firstName must be between 2 and 50 characters"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Last name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

    body("role")
        .optional()
        .isIn(Object.values(ROLES))
        .withMessage("Invalid role"),
];